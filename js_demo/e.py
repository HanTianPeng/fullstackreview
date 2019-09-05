# -*- coding: utf8 -*-

"""
 . 
"""

import os,sys,types,logging,re,time,datetime,traceback
import glob,hashlib,json_py26,urllib,random
from json import json
import json_py26
import jct.dtlib as dtlib
from django.http import HttpResponse, HttpResponseRedirect
from django.db import connection , connections , transaction
from collections import defaultdict
import jct.utility
import jct.utility2
import jct.db.utility
import jct.namibox.easyui
import settings
import gpub


@gpub.wglobal()
def demo_product_select(request , response , render):
    """演示产品的选择树
    """

    return gpub.render_to_response('research/templates/demo_product_select.html' , response , render)

from namibox.operation.running_analyse.analyse_user_product.analyse_user_valid_product import sql_product_sql , update_user_valid_product

def products_info_in_system():
    """查询整个系统的产品信息，并返回产品、产品ID到产品信息的字典表、产品ID到业务ID的字典表"""

    if not hasattr(products_info_in_system, '__data_products__'):
        conn_db_rds = connections['default']

        dict_product_id_2_service_id  = {}
        dict_product_id_2_service_obj = {}

        list_products = jct.db.utility.dbquery(conn_db_rds.cursor(), sql_product_sql)
        for product in list_products:
            if product['scope'] in (u'纳米盒会员' ,):
                dict_product_id_2_service_id[u'M%s' % product['product_id']] = u'M%s' % product['product_id']
                dict_product_id_2_service_obj[u'M%s' % product['product_id']] = product
                continue

            elif product['scope'] in (u'微课伴学' , u'课外' , u'网校专题课' , u'网校同步课' , u'网校特训营'):
                dict_product_id_2_service_id[u'%s' % product['product_id']] = u'L%s' % product['lesson_id']

            elif product['scope'] in (u'课本点读' , u'非课本点读'):
                dict_product_id_2_service_id[u'%s' % product['product_id']] = u'B%s' % product['lesson_id']

            dict_product_id_2_service_obj[u'%s' % product['product_id']] = product

        products_info_in_system.__data_products__ = list_products , dict_product_id_2_service_obj , dict_product_id_2_service_id

    return products_info_in_system.__data_products__

@gpub.wglobal()
def verify_user_ajax(request , response , render):
    """验证用户的产品订购
    """

    conn_db_rds = connections['default']

    user_data  = update_user_valid_product(request.GET['username'] , is_produce_memeo = True)
    result = u'该用户当前没有有效订购！'

    if user_data:
        result = u'用户有效订购ID：' + ','.join(unicode(x) for x in user_data['list_product']) + '<br>'
        result += u'用户订购记录：<br>' + '<br>'.join(u'&nbsp;&nbsp;&nbsp;&nbsp;%s' % x for x in user_data['memo']) + '<br>'
        result += u'校验结果：<br>'

        # 数据与规则：
        #  1. 用户名下订购的都是产品ID（唯以特殊就是会员产品ID是M[product_id]直接就是业务ID了）,目前是定时或增量计算在jct6_stat_user_valid_product中！
        #     【建议】直接写入到用户表中方便每次系统查询！
        #  2. 产品清单里查出来的有业务ID（如课本ID、课程ID等）和产品ID的匹配关系，SQL较为复杂！
        #     【建议】一次性查询（一定时间后失效）缓存到2级缓存里！
        #  3. 匹配规则里面是混合额的，有产品ID、业务ID，有方便的操作设置方式！
        #     【建议】随核心资源配置缓存在内存的三级缓存中使用！
        #
        # 目标：
        #  确认用户名下的产品ID（或对应的业务ID）是不是在匹配规则里（要么就是直接在产品列表，要么还要追溯到业务层）
        #
        # 逻辑：
        #   1. 首先直接匹配用户产品ID是否在匹配规则里有指定
        #   2. 然后用户产品转化到业务ID再次匹配规则
        list_products , dict_product_id_2_service_obj , dict_product_id_2_service_id = products_info_in_system()

        list_rule_product_id = request.GET.get('products' , '').split(',')  # redis用户记录
        #L830;L851;M1;M2
        for user_product_id in user_data['list_product']:  # 数据库用户记录
            if user_product_id in list_rule_product_id:
                result += u'&nbsp;&nbsp;&nbsp;&nbsp;产品ID=%s（%s）匹配规则<br>' % (user_product_id , dict_product_id_2_service_obj[user_product_id]['product_name'])
                continue

            # 尝试匹配业务ID
            if user_product_id in dict_product_id_2_service_id:
                service_id = dict_product_id_2_service_id[user_product_id]
                if service_id in list_rule_product_id:
                    result += u'&nbsp;&nbsp;&nbsp;&nbsp;产品ID=%s（%s）匹配规则中的业务ID=%s<br>' % (user_product_id , dict_product_id_2_service_obj[user_product_id]['product_name'] , service_id)
                    continue

    return gpub.response_json_with_code_and_info_utf8(request , response , 'SUCC' , result = result)


@gpub.wglobal()
def select_product_ajax(request , response , render):
    """请求产品树的AJAX请求，从JS的select_product_by_tree过来
    """

    # 获取用户打开产品选择对话框时的初始选择
    list_user_selected = request.GET.get('products' , '').split(',')

    conn_db_rds = connections['default']
    list_products = jct.db.utility.dbquery(conn_db_rds.cursor(), sql_product_sql)

    # 清除一部分无用的数据
    list_products_new = []
    for product in list_products:
        if product['scope'] in (u'已经废弃' , u'测试产品' , u'游戏合作' , u'网校配套教材' , u'网校配套教材' , u'网校试听课'):
            continue
        if product['scope'] == u'课本点读' and filter(lambda x : x in product['product_name'] , (u'跟读' , u'磁带')):
            continue
        if product['scope'] == u'课本点读' and product['serial_name'] == u'外研版' \
                and filter(lambda x : x in product['product_name'] , (u'点读' , u'练口语' , u'看动画' , u'扮角色' , u'测语音' , u'听磁带')):
            continue
        list_products_new.append(product)

    product_group = []

    # 首先处理网校专题课和网校同步课业务标签的数据
    # 在这里首先关闭顶层系列课程的选择能力
    # 之后自动收起产品层（除非产品层有被选择）
    # 更改课程名称和产品名称，携带各自的ID，方便查询
    # 设置product_id，以便在被选择后，据此获得用户的选择
    # 其中以L开头表示课程ID，以M开头表示会员ID，以B开头的表示BOOK
    for group in (u'网校专题课' , u'网校同步课' , u'网校特训营'):
        group_products = [product for product in list_products_new if product['scope'] == group]

        tree_data, _ = jct.namibox.easyui.build_tree_from_list_by_fields(
            jct.utility.convert_data_type_for_json(group_products),
            'text', u'serial_name', u'name', u'product_name')

        for series in tree_data:
            # 系列课程不允许选择
            series['checkable'] = False

            for milesson in series['children']:
                # 产品层次默认收起，一般选内容产品就可以了
                milesson['state'] = 'closed'

                # milesson这一层的product_id取课程的ID
                milesson['lesson_id'] = milesson['children'][0]['lesson_id']
                milesson['text'] = u'%(text)s-%(lesson_id)s' % milesson
                milesson['product_id'] = u'L%(lesson_id)s' % milesson

                # 处理初始选中状态
                if milesson['product_id'] in list_user_selected:
                    milesson['checked'] = True

                for product in milesson['children']:
                    product['text'] = u'%(text)s-%(product_id)s' % product

                    # 处理初始选中状态，并关闭上层的收缩开关
                    if unicode(product['product_id']) in list_user_selected:
                        product['checked'] = True
                        if 'state' in milesson:
                            del milesson['state']

        product_group.append({  'name'  :   group ,
                                'data'  :   tree_data
                             })

    # 处理点读的标签页面，逻辑和网校基本接近
    for group in (u'课本点读' ,):
        group_products = [product for product in list_products_new if product['scope'] == group]

        tree_data, _ = jct.namibox.easyui.build_tree_from_list_by_fields(
            jct.utility.convert_data_type_for_json(group_products),
            'text', u'serial_name', u'name', u'product_name')

        for series in tree_data:
            # 出版社不允许选择
            series['checkable'] = False

            for milesson in series['children']:
                # 子版本不允许选择
                milesson['checkable'] = False

                # milesson这一层的product_id取课程的ID
                # milesson['lesson_id'] = milesson['children'][0]['lesson_id']
                # milesson['text'] = u'%(text)s-%(lesson_id)s' % milesson
                # milesson['product_id'] = u'L%(lesson_id)s' % milesson

                for product in milesson['children']:
                    product['text'] = u'%(text)s-%(lesson_id)s' % product
                    product['product_id'] = u'B%(lesson_id)s' % product

                    # 处理初始选中状态
                    if unicode(product['product_id']) in list_user_selected:
                        product['checked'] = True

        product_group.append({  'name'  :   group ,
                                'data'  :   tree_data
                             })

    # 处理会员的标签页面
    for group in (u'纳米盒会员' ,):
        group_products = [product for product in list_products_new if product['scope'] == group]

        tree_data, _ = jct.namibox.easyui.build_tree_from_list_by_fields(
            jct.utility.convert_data_type_for_json(group_products),
            'text', u'scope', u'product_name')

        for series in tree_data:
            # 第一层不允许选择
            series['checkable'] = False

            for milesson in series['children']:
                milesson['text'] = u'%(text)s-%(product_id)s' % milesson
                milesson['product_id'] = u'M%(product_id)s' % milesson

                # 处理初始选中状态
                if unicode(milesson['product_id']) in list_user_selected:
                    milesson['checked'] = True

        product_group.append({  'name'  :   group ,
                                'data'  :   tree_data
                             })

    return gpub.response_json_with_code_and_info_utf8(request , response , 'SUCC' , product_group = product_group)

