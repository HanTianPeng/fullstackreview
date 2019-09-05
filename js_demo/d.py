# -*- coding: utf8 -*-

"""
 . 计算当前用户还处于生效状态的产品列表（包括会员），其中对于网校、点读等还要考虑会员开通的情况
 .
 . 清理环境语句
 .  TRUNCATE TABLE jct6_stat_user_valid_product;
 .  DELETE FROM jct6_config WHERE `group` ='auto_save_config' AND `key` IN ('analyse_user_valid_product.stat_user_order_log')
 .  DELETE FROM jct6_config WHERE `group` ='auto_save_config' AND `key` IN ('analyse_user_valid_product.stat_user_member_log')
 .  DELETE FROM jct6_config WHERE `group` ='auto_save_config' AND `key` IN ('analyse_user_valid_product.stat_user_member_open_service_log')
 .
 . 20190819 v1.0
 .  简单原则，只把当前还在生效期的产品作为用户的合法产品
 .  忽略没有有效期的产品（如实物课本等）
"""

import os, sys, types, datetime, re, traceback,time
from json import json
from collections import defaultdict
import jct.utility
import jct.db.utility
import jct.djangoex.utility
import jct.prolog as prolog
from jct.prolog import deflog as log

sql_product_sql = \
            u"""SELECT '微课伴学' AS scope , lanmu AS serial_name , a.id AS lesson_id , a.name , a.product_id , b.product_name AS product_name
                  FROM jct4_milesson a , jct4_products b
                 WHERE lanmu NOT IN ('影子题库' , '记语文' , '口算大闯关' , '天天背单词' , '美国私塾' , '电子试卷' , '评测题库')
                   AND product_id IS NOT NULL
                   AND a.product_id = b.id
                   AND scope IN ('微课伴学' , '课内' , '素质课')
                 UNION
                SELECT '课外' AS scope , lanmu AS serial_name , a.id AS lesson_id , a.name , a.product_id , b.product_name AS product_name
                  FROM jct4_milesson a , jct4_products b
                 WHERE product_id IS NOT NULL
                   AND a.product_id = b.id
                   AND scope = '课外'
                 UNION
                SELECT '网校专题课' AS scope , c.serial_name , a.id AS lesson_id , a.name , b.product_id , d.product_name
                  FROM jct4_milesson a LEFT JOIN jct5_serial_lesson c ON a.id = c.milesson_id , jct5_milesson_product_union b , jct4_products d
                 WHERE a.scope = '网校'
                   AND a.id = b.milesson_id
                   AND b.product_id = d.id
                   AND d.product_name NOT LIKE '%%测试%%'
                   AND c.serial_name IN ('大猫英语分级阅读','小学奥数','小学数学核心思维','小学英语写作','小学英语环球语法','新朗文小学英语','语文阅读理解','语文高分作文' , '中文分级课外阅读')
                 UNION
                SELECT '网校同步课' AS scope , c.serial_name , a.id AS lesson_id , a.name , b.product_id , d.product_name
                  FROM jct4_milesson a LEFT JOIN jct5_serial_lesson c ON a.id = c.milesson_id , jct5_milesson_product_union b , jct4_products d
                 WHERE a.scope = '网校'
                   AND a.id = b.milesson_id
                   AND b.product_id = d.id
                   AND d.product_name NOT LIKE '%%测试%%'
                   AND (c.serial_name LIKE '%%期末复习%%' OR c.serial_name LIKE '%%期中复习%%' OR c.serial_name LIKE '%%同步预习%%' OR c.serial_name LIKE '%%同步培优%%')
                 UNION
                SELECT '网校特训营' AS scope , c.serial_name , a.id AS lesson_id , a.name , b.product_id , d.product_name
                  FROM jct4_milesson a LEFT JOIN jct5_serial_lesson c ON a.id = c.milesson_id , jct5_milesson_product_union b , jct4_products d
                 WHERE a.scope = '网校'
                   AND a.id = b.milesson_id
                   AND b.product_id = d.id
                   AND d.product_name NOT LIKE '%%测试%%'
                   AND c.serial_name LIKE '%%特训营%%'
                 UNION
                SELECT '网校试听课' AS scope , NULL AS serial_name , a.id AS lesson_id , a.name , b.product_id , d.product_name
                  FROM jct4_milesson a , jct5_milesson_product_union b , jct4_products d
                 WHERE a.scope = '网校'
                   AND a.id = b.milesson_id
                   AND b.product_id = d.id
                   AND NAME LIKE '%%试听课%%'
                 UNION
                SELECT '网校配套教材' AS scope , c.serial_name , a.id AS lesson_id , a.name , a.matching_product_id AS product_id , d.product_name
                  FROM jct4_milesson a LEFT JOIN jct5_serial_lesson c ON a.id = c.milesson_id , jct4_products d
                 WHERE a.matching_product_id = d.id
                   AND d.product_name NOT LIKE '%%测试%%'
                   AND a.name NOT LIKE '%%崂山版%%'
                   AND a.name NOT LIKE '%%校园版%%'
                   AND a.scope = '网校'
                 UNION
                 SELECT * FROM (
                SELECT '课本点读' AS scope , a.publisher AS serial_name , a.id AS lesson_id , a.book_subtitle AS NAME , b.product_id , c.product_name
                  FROM jct2_book a , jct4_book_service b , jct4_products c
                 WHERE a.id = b.book_id
                   AND b.product_id = c.id
                   AND a.category = '课本'
              ORDER BY a.publisher , a.book_subtitle , a.term , a.grade) a
                 UNION
                 SELECT * FROM (
                SELECT '课本点读套餐' AS scope , a.publisher AS serial_name , a.id AS lesson_id , a.book_subtitle AS NAME , d.product_id , e.product_name
                  FROM jct2_book a , jct4_book_service b , jct4_products c , jct4_product_combo d , jct4_products e
                 WHERE a.id = b.book_id
                   AND b.product_id = c.id
                   AND a.category = '课本'
                   AND c.id = d.sub_product_id
                   AND d.product_id = e.id
              ORDER BY a.publisher , a.book_subtitle , a.term , a.grade) a
                 UNION
                 SELECT * FROM (
                SELECT '非课本点读' AS scope , a.publisher AS serial_name , a.id AS lesson_id , a.book_subtitle AS NAME , b.product_id , c.product_name
                  FROM jct2_book a , jct4_book_service b , jct4_products c
                 WHERE a.id = b.book_id
                   AND b.product_id = c.id
                   AND a.category != '课本'
              ORDER BY a.publisher , a.book_subtitle , a.term , a.grade) a
                 UNION
                SELECT '电子商品' AS scope , NULL AS serial_name , NULL AS lesson_id , NULL AS NAME , id AS product_id , product_name
                  FROM jct4_products
                 WHERE product_name IN ('增强版道具包' , '超级版道具包' , '英语同步口语评测专家模式')
                    OR product_type = '电子商品'
                 UNION
                SELECT '实物商品' AS scope , NULL AS serial_name , NULL AS lesson_id , NULL AS NAME , id AS product_id , product_name
                  FROM jct4_products
                 WHERE product_type = '实物商品'
                   -- AND product_name IN ('面试能力筑基训练卡牌' , '超级飞侠英文故事（实体图书）')
                 UNION
                SELECT '游戏合作' AS scope , NULL AS serial_name , NULL AS lesson_id , NULL AS NAME , b.id AS product_id , product_name
                  FROM jct5_gamesdk_product a , jct4_products b
                 WHERE product_id IS NOT NULL
                   AND a.product_id = b.id
                 UNION
                SELECT '纳米盒会员' AS scope , NULL AS serial_name , NULL AS lesson_id , NULL AS NAME , a.id AS product_id , a.member_name AS product_name
                  FROM jct5_member_product a
                 WHERE product_type IS NULL
                 UNION
                SELECT '测试产品' AS scope , NULL AS serial_name , NULL AS lesson_id , NULL AS NAME , id AS product_id , product_name
                  FROM jct4_products
                 WHERE product_name LIKE '%%测试%%'
                    OR product_name LIKE '%%内部%%'
                    OR product_name LIKE '%%咪咕%%'
                    OR product_name LIKE '%%崂山版%%'
                    OR product_name LIKE '%%校园版%%'
                 UNION
                SELECT '已经废弃' AS scope , lanmu AS serial_name , a.id AS lesson_id , a.name , a.product_id , b.product_name AS product_name
                  FROM jct4_milesson a , jct4_products b
                 WHERE product_id IS NOT NULL
                   AND a.product_id = b.id
                   AND lanmu = '美国私塾'
                 """

# 全局类，保存全局变量，支持命令行参数
class g(object):
    r_parser_args = [  # (   '-r', '--reset-cid', 'store_true', 'b_reset_cid', False, u'重置'  ),
    ]


if __name__ == '__main__':
    # 初始化日志模块
    prolog.init_logging()

    # 处理命令行
    jct.utility.process_command_line(g, support_watchdog=False, support_env=True, run_mode=None)
    # 读取命令行参数：g.r_cmd_opt.b_reset_cid
    # 读取命令行非选项参数：g.r_cmd_args

    log.info(u'纳米盒用户订购产品分析工具 v1.0')
    log.info(u'上海进馨网络科技有限公司 版权所有')
    print

    # 如果需要连接数据库，一般来说可以使用tina3工程中的数据库连接，因此需要引入tina3的setting,py，并指定运行环境
    sys.path.insert(0, os.path.join(sys.NAMIBOX, 'wnms'))
    os.environ.setdefault("NAMIBOX_RUNNING_ENVIRON", 'nms_surface')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

    import settings
    settings.DEBUG = False
    settings.LOGGING['disable_existing_loggers'] = False
    settings.LOGGING['loggers']['django.db.backends']['level'] = 'ERROR'

from django.db import connection, connections, transaction
from namibox.operation.income_state.config_frame import auto_save_config

def information_of_product(product_id , is_member_product = False):
    """查询指定产品ID的信息"""

    if not hasattr(information_of_product , '__data_products__'):
        conn_rds = connections['default']
        list_product = jct.db.utility.mysql_execute(conn_rds , sql_product_sql)

        information_of_product.__data_products__ = jct.utility.to_dict(
            [product for product in list_product if product.scope != u'纳米盒会员'] , 'product_id')

        information_of_product.__data_member__ = jct.utility.to_dict(
            [product for product in list_product if product.scope == u'纳米盒会员'] , 'product_id')

    if not is_member_product:
        if product_id not in information_of_product.__data_products__:
            raise jct.utility.MyException(u'【错误】无法明确产品ID = %s的信息！' % product_id)

        return information_of_product.__data_products__[product_id]
    else:
        if product_id not in information_of_product.__data_member__:
            raise jct.utility.MyException(u'【错误】无法明确会员产品ID = %s的信息！' % product_id)

        return information_of_product.__data_member__[product_id]


def process_user_subscribe_data(list_data , auto_last_id = 0, is_write_db = True , is_produce_memeo = False , is_rebuild = False):
    """处理用户的产品订购数据
    . is_write_db : 是否写入数据库
    . is_produce_memeo : 是否产生memo信息，信息量较大，容易产生性能问题
    . is_rebuild : 增量追加信息，还是全量覆盖，这个主要是当刷新某个用户的时候，就是全量覆盖
    """

    dt_now = datetime.datetime.now()

    # 统计用户有效产品信息（ID列表和备注信息）
    dict_user_valid_product = defaultdict(lambda : defaultdict(types.ListType))

    for data in list_data:
        auto_last_id = max(auto_last_id , data.id)
        info_product = information_of_product(data.product_id , is_member_product = data.ptype == u'M')

        if info_product.scope in (u'已经废弃' , u'测试产品' , u'游戏合作' , u'网校配套教材' , u'网校配套教材' , u'网校试听课'):
            continue

        if info_product.scope == u'课本点读' and u'跟读' in info_product.product_name:
            continue

        if info_product.scope == u'课本点读' and info_product.serial_name == u'外研版' \
                and filter(lambda x : x in info_product.product_name , (u'练口语' , u'看动画' , u'扮角色' , u'测语音' , u'听磁带')):
            continue

        if data.end_time and data.end_time > dt_now:
            info_user = dict_user_valid_product[data.user_id]
            info_user['list_product'].append(u'%s%s' % (data.ptype , data.product_id))
            if is_produce_memeo:
                info_user['memo'].append(u'%s订购产品%s（%s-%s）,到%s过期' %
                    (data.pay_time , data.product_id , info_product.scope , info_product.product_name , data.end_time))

    # 使用MySQL的DUPLICATE KEY UPDATE能力写入统计数据库
    if dict_user_valid_product and is_write_db:
        conn_db_local = connections['localhost']
        cursor_local  = conn_db_local.cursor()

        if is_rebuild:
            sql_template = u"""INSERT INTO jct6_stat_user_valid_product (user_id , list_product , memo)
                                    VALUES %s
                   ON DUPLICATE KEY UPDATE
                                           list_product = VALUES(list_product) ,
                                           memo = VALUES(memo)"""
        else:
            sql_template = u"""INSERT INTO jct6_stat_user_valid_product (user_id , list_product , memo)
                                    VALUES %s
                   ON DUPLICATE KEY UPDATE
                                           list_product = CONCAT(list_product , '|' , VALUES(list_product)) ,
                                           memo = CONCAT(memo , '\n' , VALUES(memo))"""


        sql_product_stat = u','.join(u"""(%s , '%s' , '%s')"""
                                    % ( user_id ,
                                        u'|'.join(_stat['list_product']) ,
                                        u'\n'.join(_stat['memo']) ,
                                      )
                                     for user_id , _stat in dict_user_valid_product.items())

        cursor_local.execute(sql_template % sql_product_stat)

    return auto_last_id , dict_user_valid_product

@auto_save_config()
def stat_user_order_log(auto_last_id = None , auto_last_data = [] , **kwargs):
    """统计用户订购的信息"""

    ts_now = time.time()
    assert isinstance(auto_last_id , types.IntType)

     # ID=3400000大约2017年8月左右
    conn_db_rds = connections['default']

    sql_execute = u"""SELECT '' as ptype , a.id , a.user_id , b.product_id , b.start_time , b.end_time , a.pay_time
                        FROM jct4_orders a, jct4_order_details b
                       WHERE a.id = b.order_id
                         AND a.is_parent IS NULL
                         AND a.status = '交易完成'
                         AND a.pay_status = '支付成功'
                         AND a.id > %s
                    ORDER BY a.id
                       LIMIT 10000""" % max(3000000 , auto_last_id)

    list_data = jct.db.utility.mysql_execute(conn_db_rds , sql_execute)
    auto_last_id , _ = process_user_subscribe_data(list_data , auto_last_id)

    if list_data:
        log.info(u'[进度] %.2f秒完成 %d 条数据分析，最后记录的时间是 %s - %s' %
                    (time.time() - ts_now , len(list_data) , list_data[-1].pay_time , auto_last_id))

    return {    'auto_last_id'  :   auto_last_id ,
                'process_new'   :   len(list_data) ,
           }

@auto_save_config()
def stat_user_member_log(auto_last_id = None , auto_last_data = [] , **kwargs):
    """统计用户会员信息"""

    ts_now = time.time()
    assert isinstance(auto_last_id , types.IntType)

    conn_db_rds = connections['default']
    sql_execute = u"""SELECT 'M' AS ptype , a.id , a.user_id , b.id AS product_id , a.start_time , a.end_time , a.create_time as pay_time
                        FROM jct5_user_member a , jct5_member_product b
                       WHERE a.service_type = b.member_type
                         AND b.product_type IS NULL
                         AND is_active = 1
                         AND a.id > %s
                    ORDER BY a.id
                       LIMIT 1000""" % auto_last_id

    list_data = jct.db.utility.mysql_execute(conn_db_rds , sql_execute)
    auto_last_id , _ = process_user_subscribe_data(list_data , auto_last_id)

    if list_data:
        log.info(u'[进度] %.2f秒完成 %d 条数据分析，最后记录的时间是 %s - %s' %
                    (time.time() - ts_now , len(list_data) , list_data[-1].pay_time , auto_last_id))

    return {    'auto_last_id'  :   auto_last_id ,
                'process_new'   :   len(list_data) ,
           }

@auto_save_config()
def stat_user_member_open_service_log(auto_last_id = None , auto_last_data = [] , **kwargs):
    """统计用户会员开通业务"""

    ts_now = time.time()
    assert isinstance(auto_last_id , types.IntType)

    conn_db_rds = connections['default']
    sql_execute = u"""SELECT '' AS ptype , a.id , a.user_id , a.product_id , a.start_time , a.end_time , a.opening_time AS pay_time
                        FROM jct5_member_order_gift_detail a
                       WHERE a.status = '已开通'
                         AND a.id > %s
                    ORDER BY a.id
                       LIMIT 1000""" % auto_last_id

    list_data = jct.db.utility.mysql_execute(conn_db_rds , sql_execute)
    auto_last_id , _ = process_user_subscribe_data(list_data , auto_last_id)

    if list_data:
        log.info(u'[进度] %.2f秒完成 %d 条数据分析，最后记录的时间是 %s - %s' %
                    (time.time() - ts_now , len(list_data) , list_data[-1].pay_time , auto_last_id))

    return {    'auto_last_id'  :   auto_last_id ,
                'process_new'   :   len(list_data) ,
           }

@transaction.commit_on_success(using = 'localhost')
def update_user_valid_product(username_or_id , is_write_db = True , is_produce_memeo = False):
    """更新指定用户ID或者号码的有效产品"""

    conn_db_rds = connections['default']
    sql_execute = u"""SELECT '' AS ptype , a.id , a.user_id , b.product_id , b.start_time , b.end_time , a.pay_time
                        FROM jct4_orders a, jct4_order_details b , auth_user c
                       WHERE a.id = b.order_id
                         AND a.is_parent IS NULL
                         AND a.status = '交易完成'
                         AND a.pay_status = '支付成功'
                         AND a.user_id = c.id
                         AND (c.id = %s OR c.username = '%s')
                       UNION
                      SELECT 'M' AS ptype , a.id , a.user_id , b.id AS product_id , a.start_time , a.end_time , a.create_time AS pay_time
                        FROM jct5_user_member a , jct5_member_product b , auth_user c
                       WHERE a.service_type = b.member_type
                         AND b.product_type IS NULL
                         AND a.is_active = 1
                         AND a.user_id = c.id
                         AND (c.id = %s OR c.username = '%s')
                       UNION
                      SELECT '' AS ptype , a.id , a.user_id , a.product_id , a.start_time , a.end_time , a.opening_time AS pay_time
                        FROM jct5_member_order_gift_detail a , auth_user c
                       WHERE a.user_id = c.id
                         AND a.status = '已开通'
                         AND (c.id = %s OR c.username = '%s')
      """ % (username_or_id , username_or_id , username_or_id , username_or_id , username_or_id , username_or_id)

    list_data = jct.db.utility.mysql_execute(conn_db_rds , sql_execute)
    _ , user_data  = process_user_subscribe_data(list_data , is_write_db = is_write_db, is_produce_memeo = is_produce_memeo , is_rebuild = True)

    return user_data.values()[0] if user_data else None

def process_one_action_until_end(function_call):

    while True:
        try:
            ret_val = function_call()
            if not ret_val.get('process_new'):
                break

        except jct.utility.MyException,e:
            log.info(u'【异常】%s' % e.message)
            raise e

        except Exception,e:
            log.info(traceback.format_exc())

            if e.__class__.__name__ == 'OperationalError' and isinstance(e.args , types.TupleType) and len(e.args) > 1 and e.args[0] == 2005:
                log.info(u'【异常】数据库连接异常，休息10秒再看！')
            elif e.__class__.__name__ == 'OperationalError' and isinstance(e.args , types.TupleType) and len(e.args) > 1 and e.args[0] == 2003:
                log.info(u'【异常】无法连接数据库，休息10秒再看！')
            elif e.__class__.__name__ == 'OperationalError' and isinstance(e.args , types.TupleType) and len(e.args) > 1 and e.args[0] == 2013:
                log.info(u'【异常】数据库过程中断链，休息10秒再看！')
            elif e.__class__.__name__ == 'OperationalError' and isinstance(e.args , types.TupleType) and len(e.args) > 1 and e.args[0] == 2006:
                log.info(u'【异常】数据库Gone Away，休息10秒再看！')
            elif e.__class__.__name__ == 'DatabaseError' and isinstance(e.args , types.TupleType) and len(e.args) > 1 and e.args[0] == 2013:
                log.info(u'【异常】数据库连接丢失，休息10秒再看！')
            else:
                raise e

        finally:
            time.sleep(10)

if __name__ == '__main__':
    update_user_valid_product(11621 , is_produce_memeo = True)

if __name__ == '__main2__':

    log.info(u'处理所有的订购记录')
    # process_one_action_until_end(stat_user_order_log)

    log.info(u'处理所有的会员订购记录')
    # process_one_action_until_end(stat_user_member_log)

    log.info(u'处理所有的会员开通业务的记录')
    process_one_action_until_end(stat_user_member_open_service_log)
