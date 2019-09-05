# -*- coding: utf8 -*-

"""
 . APP应用
"""

from share.filter_public import smart_decode,smart_cache ,http2https
import os,sys,types,logging,re,time,datetime,traceback
import glob,configobj,urllib,urlparse,random,urllib2,hashlib
from json import json
import json as ord_json
from auth.share import integral_increase
from xml.dom import minidom
from django.db import connections , transaction,IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.utils.http import urlquote
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.contrib.auth.models import User
import jct.dtlib as dtlib
import jct.utility
import logging
from wordpress.models import *
from django.conf import settings
import gpub
import cms.views
from auth.models import *
from auth.users import config_user_dev , config_user_session
from auth.redpack import obtain_redpack
from diary.models import *
from domain_wx.util import is_namibox_vip_emissary
from appnative.appbase import send_msg_init_classzone
from app.util import send_triggle_msg,send_regtoken_msg
from filter import getAllDatas, serialize_client_grade
import simplejson
from app.models import Jct6UuidAndriod,Jct6UuidIos
from appnative.models import Jct5UserGradeInfo
from jct.namibox import stringtools
from appnative.appbase import get_user_publisher

@gpub.wglobal()
def foot(request , platform , response , render):
    """APP主页面下方的foot区域
    @platform:  手机平台ios或android
    """

    # 输出正式生产环境的foot包，默认是调试环境的
    render['formula']        = request.REQUEST.get('formula' , '')
    render['prohibitstat']   = True
    render['without_script'] = True
    return gpub.render_to_response('app/templates/foot_v1.0.5.html' , response , render)

@gpub.wglobal()
def welcome(request , platform , response , render):
    """APP欢迎页面
    """

    render['prohibitstat'] = True
    return gpub.render_to_response('app/templates/welcome.html' , response , render)

@gpub.wglobal()
def about(request , response , render):
    """关于页面
    """
    return HttpResponseRedirect('/v/push/d/jct3content/004643')
    #return gpub.render_to_response('app/templates/about.html' , response , render)

@gpub.wglobal()
def protocol(request , response , render):
    """用户协议
    """
    return gpub.render_to_response('app/templates/protocol.html' , response , render)


@gpub.wglobal()
def protocol_v2(request , response , render):
    """用户协议
    """
    return gpub.render_to_response('app/templates/protocol_v2.html' , response , render)

@gpub.wglobal()
def responsible(request , response , render):
    """免责声明
    """
    return HttpResponseRedirect('/v/push/d/jct3content/002182')
    # return gpub.render_to_response('app/responsible.html' , response , render)

@gpub.wglobal()
def weixin(request , response , render):
    """邀请用户关注微信
    """
    return gpub.render_to_response('app/templates/weixin.html' , response , render)

@gpub.wglobal()
def downloadapp(request , response , render):
    """下载APP的请求，根据请求的来源自动判断：
    . iPad/iPhone/iPod等转向AppStore地址
    . 安卓在微信模式下，显示下载页面（提示用户用本地浏览器打开）
    . 安卓在非微信模式下，转向应用宝地址
    """

    # APP模式下，只需要显示下载页面（且页面中是不带下载链接的，只有二维码）
    if render['browser'] == 'app':
        return gpub.render_to_response('app/templates/download.html' , response , render)

    # 微信模式下（1）iOS且是从mp.namibox.com中refer的直接跳转到AppStore（2）Android则打开下载页面（提示用户在浏览器打开）
    if render['browser'] == 'weixin':
        #if render['platform'] in ('ipad' , 'iphone' , 'ipod') and 'mp.weixin.qq.com' in request.META.get('HTTP_REFERER' , ''):
        #    return HttpResponseRedirect('https://itunes.apple.com/us/app/na-mi-he/id913503440')

        return gpub.render_to_response('app/templates/download.html' , response , render)

    # 其他模式下根据平台的不同进行跳转
    if render['platform'] == 'android':
        return HttpResponseRedirect('http://a.app.qq.com/o/simple.jsp?pkgname=com.jinxin.namibox')
    elif render['platform'] in ('ipad' , 'iphone' , 'ipod'):
        return HttpResponseRedirect('https://itunes.apple.com/us/app/na-mi-he/id913503440')
    else:
        return gpub.render_to_response('app/templates/download.html' , response , render)

def sysconfig_v1_static_page(request , response , render , post_data):
    """处理sysconfig中V1版本的静态下载页面"""

    now_time    = datetime.datetime.now()

    # 只有在正式服务器下，才取$/namibox/static/zipage/formula目录下的配置文件
    # 正式服务器下，ZIP包下载取r.namibox.com的CDN域名；开发模式下可以取被访问的服务器主机名
    zipsubdir = 'formula' if settings.RUN_LOCATION == 'ECS' or request.REQUEST.get('formula' , '') else 'develop'
    zipdomain = 'http://ra.namibox.com' if settings.RUN_LOCATION == 'ECS' or request.REQUEST.get('formula' , '') else render['cdn']
    config = gpub.cc[os.path.join(gpub.BASEDIR_S , 'zipage' , zipsubdir , 'config.ini')]

    STD_FOOT_URL    = 'http://' + request.META['HTTP_HOST'] + '/app/foot?app=1&forcelocal=true&ver=%s&%s=1'    % ( config['VERSION']['foot'] , zipsubdir )
    STD_WELCOME_URL = 'http://' + request.META['HTTP_HOST'] + '/app/welcome?app=1&forcelocal=true&ver=%s&%s=1' % ( config['VERSION']['welcome'] , zipsubdir )

    STD_FOOT_ZIP    = zipdomain + '/tina/static/zipage/%s/foot/%s/foot.zip'       % ( zipsubdir , config['VERSION']['foot'] )
    STD_WELCOME_ZIP = zipdomain + '/tina/static/zipage/%s/welcome/%s/welcome.zip' % ( zipsubdir , config['VERSION']['welcome'] )

    STD_APP_SCHOOL_IOS_ZIP     = zipdomain + '/tina/static/zipage/%s/appschool_ios/%s/appschool_ios.zip' % ( zipsubdir , config['VERSION']['appschool'] )
    STD_APP_SCHOOL_ANDROID_ZIP = zipdomain + '/tina/static/zipage/%s/appschool_android/%s/appschool_android.zip' % ( zipsubdir , config['VERSION']['appschool'] )

    if settings.RUN_LOCATION == 'ECS':
        return {    'foot_url'              :   STD_FOOT_URL ,
                    'foot_zip'              :   STD_FOOT_ZIP ,
                    'welcome_url'           :   STD_WELCOME_URL ,
                    'welcome_zip'           :   STD_WELCOME_ZIP ,
                    'main_url'              :   '',
                    'main_zip'              :   '',
                    'appschool_ios_zip'     :   STD_APP_SCHOOL_IOS_ZIP  ,
                    'appschool_android_zip' :   STD_APP_SCHOOL_ANDROID_ZIP  ,
                }
    else:
        return  {   'foot_url'              :   STD_FOOT_URL    + '&ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-2] ,
                    'foot_zip'              :   STD_FOOT_ZIP    + '?ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-2] ,
                    'welcome_url'           :   STD_WELCOME_URL + '&ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-8] ,
                    'welcome_zip'           :   STD_WELCOME_ZIP + '?ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-8] ,
                    'main_url'              :   '',
                    'main_zip'              :   '',
                    'appschool_ios_zip'     :   STD_APP_SCHOOL_IOS_ZIP     + '?ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-2] ,
                    'appschool_android_zip' :   STD_APP_SCHOOL_ANDROID_ZIP + '?ts=%s' % now_time.strftime('%Y%m%d%H%M%S')[:-2] ,
                }

def sysconfig_v2_safe_check(request , response , render , post_data):
    """处理sysconfig中V1版本的静态下载页面"""

    #读取安全检测信息
    # check_cfg = gpub.cc[os.path.join(gpub.BASEDIR_S , 'zipage'  , 'check.ini')]
    domain_list = []
    html_list   = []
    static_list = []

    # 3.0开始关闭自动安全信息监测能力
    # for section in check_cfg:
    #     if section == 'SYSTEM':
    #         continue
    #     if check_cfg[section].get('domain','') :
    #         domain_list.append({'domain':check_cfg[section]['domain'],'ip':check_cfg[section].get('ip','')})
    #     if check_cfg[section].get('HTML','') and check_cfg[section]['HTML'].get('url','') and check_cfg[section]['HTML'].get('md5',''):
    #         if type(check_cfg[section]['HTML']['url']) is types.UnicodeType:
    #             html_list.append({'url':check_cfg[section]['HTML']['url'],'md5':check_cfg[section]['HTML']['md5']})
    #         else:
    #             for i in range(len(check_cfg[section]['HTML']['url'])):
    #                 html_list.append({'url':check_cfg[section]['HTML']['url'][i],'md5':check_cfg[section]['HTML']['md5'][i]})
    #
    #     if check_cfg[section].get('STATIC','') and check_cfg[section]['STATIC'].get('url','') and check_cfg[section]['STATIC'].get('md5',''):
    #         if type(check_cfg[section]['STATIC']['url']) is types.UnicodeType:
    #             static_list.append({'url':check_cfg[section]['STATIC']['url'],'md5':check_cfg[section]['STATIC']['md5']})
    #         else:
    #             for j in range(len(check_cfg[section]['STATIC']['url'])):
    #                 static_list.append({'url':check_cfg[section]['STATIC']['url'][j],'md5':check_cfg[section]['STATIC']['md5'][j]})

    safety_check = {    'domain_ck'     :   domain_list,
                        'html_ck'       :   html_list,
                        'static_ck'     :   static_list
                    }
    check_open   = False

    # 3.0开始关闭自动安全信息监测能力
    # try:
    #     if check_cfg.get('SYSTEM',None) and check_cfg['SYSTEM'].get('check_open','')=='True'  :
    #
    #         if  check_cfg['SYSTEM'].get('check_area',''):
    #             user_ip = request.META.get('REMOTE_ADDR' , None)
    #
    #             area = gpub.query_ip_geocoder_info(user_ip , is_producer = True)
    #             #area    = gpub.redis_ipcache.hget('ip_cache',user_ip) if user_ip else None
    #             if area  and   area[2] in check_cfg['SYSTEM'].get('check_area',''):
    #                 check_open = True
    #         else:
    #             check_open = True
    # except:
    #     gpub.log_error.debug(traceback.format_exc())

    return {    'safety_check'          :   safety_check,
                'check_open'            :   check_open
           }

def sysconfig_v2_local_cache(request , response , render , post_data):
    """v2以后支持本地静态域名资源缓存"""

    zipdomain = 'http://ra.namibox.com' if settings.RUN_LOCATION == 'ECS' or request.REQUEST.get('formula' , '') else render['cdn']

    # 处理APP本地缓存页面
    force_domain_list = []

    cache_add , cache_del , cache_mod = [] , [] , []
    config_cache    = gpub.cc[os.path.join(gpub.BASEDIR_S , 'applocal/cache/config.ini')]
    req_arg_cache   = post_data.get('app_cache' , {})

    for k , v in config_cache['VERSION'].items():
        zip_domain_cache = os.path.join(gpub.BASEDIR_S , 'applocal/cache' , k , v , k + '.zip')
        if not os.path.exists(zip_domain_cache):
            continue

        if k not in req_arg_cache:
            cache_add.append({  'domain'    :   k ,
                                'version'   :   v ,
                                'url'       :   zipdomain + '/tina/static/applocal/cache/%s/%s/%s.zip' % (k , v , k) ,
                                'force'     :   k in force_domain_list
                             })
        else:
            if req_arg_cache[k] != v:
                cache_mod.append({  'domain'    :   k ,
                                    'version'   :   v ,
                                    'url'       :   zipdomain + '/tina/static/applocal/cache/%s/%s/%s.zip' % (k , v , k) ,
                                    'force'     :   k in force_domain_list
                                 })
            del req_arg_cache[k]

    for k in req_arg_cache:
        cache_del.append({  'domain'    :   k    })

    return {    'app_cache' :   {   'app_new'       :   cache_add ,
                                    'app_update'    :   cache_mod ,
                                    'app_delete'    :   cache_del
                                }
           }

def sysconfig_v2_local_page(request , response , render , post_data):
    """v2以后支持本地静态离线页面缓存"""

    zipdomain = 'http://ra.namibox.com' if settings.RUN_LOCATION == 'ECS' or request.REQUEST.get('formula' , '') else render['cdn']

    force_page_list   = [ 'appme','appschool' , 'appouter' , 'appworld' , 'appuc' ,'book']

    # 处理APP本地页面的静态缓存
    page_add , page_del , page_mod = [] , [] , []
    config_page  = gpub.cc[os.path.join(gpub.BASEDIR_S , 'applocal/page/config.ini')]

    # 对于盒子家族内部支持独立的页面升级调试
    if 'user_login' in render and render['user_root_base']:
        config_page_namibox  = gpub.cc[os.path.join(gpub.BASEDIR_S , 'applocal/page/config_namibox.ini')]
        if config_page_namibox:
            config_page = config_page_namibox

    req_arg_page = post_data.get('app_page' , { })

    for k , v in config_page.items():
        if not k.startswith('PAGE_'):
            continue

        k , v = v['NAME'] , v['VERSION']
        # 根据平台选择过滤掉不合适的模板（如安卓需要忽略掉_ios后缀的模板页面，苹果需要过滤掉_android后缀的模板页面）
        if render['appos'] == 'android' and k.endswith('_ios'):
            continue
        if render['appos'] == 'ios' and k.endswith('_android'):
            continue

        zip_domain_page = os.path.join(gpub.BASEDIR_S , 'applocal/page' , k , v , k + '.zip')
        if not os.path.exists(zip_domain_page):
            continue

        if k not in req_arg_page:
            page_add.append( {  'page'      :   k ,
                                'version'   :   v ,
                                'url'       :   zipdomain + '/tina/static/applocal/page/%s/%s/%s.zip' % (k , v , k) ,
                                'force'     :   k in force_page_list
                             })
        else:
            if req_arg_page[k] != v:
                page_mod.append( {  'page'      :   k ,
                                    'version'   :   v ,
                                    'url'       :   zipdomain + '/tina/static/applocal/page/%s/%s/%s.zip' % (k , v , k) ,
                                    'force'     :   k in force_page_list
                                 })
            del req_arg_page[k]

    for k in req_arg_page:
        page_del.append({   'page'      :   k ,
                            'force'     :   k in force_page_list
                        })

    # 对于盒子家族内部支持独立的页面升级调试
    # if 'user_login' in render and render['user_root_base']:
    #     config_page_namibox  = gpub.cc[os.path.join(gpub.BASEDIR_S , 'applocal/page/config_namibox.ini')]
    #     if config_page_namibox:
    #         for page_list in [page_add , page_mod]:
    #             for page in page_list:
    #                 key_page = 'PAGE_' + page['page']
    #                 if key_page in config_page_namibox and page['version'] != config_page_namibox[key_page]['VERSION']:
    #
    #                     k , v = page['page'] , config_page_namibox[key_page]['VERSION']
    #                     zip_domain_page = os.path.join(gpub.BASEDIR_S , 'applocal/page' , k , v , k + '.zip')
    #                     if not os.path.exists(zip_domain_page):
    #                         continue
    #
    #                     page['version'] = v
    #                     page['url'] = zipdomain + '/tina/static/applocal/page/%s/%s/%s.zip' % (k , v , k)

    # 4.0版本以前静态页面停止更新，但支持book页面更新
    if render['appver'] < 40000:
        return {'app_page': {'app_new': [],
                             'app_update': filter(lambda x:x['page'] in ('book','fanshow') , page_mod),
                             'app_delete': filter(lambda x:x['page'] in ('articlesearch',) , page_del)
                             },
                }

    return {    'app_page'  :   {   'app_new'       :   page_add ,
                                    'app_update'    :   page_mod ,
                                    'app_delete'    :   page_del
                                },
           }

def sysconfig_v3_check_update(request , response , render , post_data):
    """v3之后将支持APP升级"""

    version_update_infor    = {     'has_update'    :   False,
                                    'log'           :   '',
                                    'force_update'  :   False,
                                    'size'          :   '0',
                                    'version'       :   '',
                                    'url'           :   '',
                                    "md5"           :   None,
                                    "diff_size"     :   '0',
                                    "diff_url"      :   None,
                                    "silent"        :   False
                                }

    try:
        # 客户端升级相关操作
        channel         = post_data.get('channel' , 'ios')
        version         = post_data.get('version' , '')

        # 新增客户端版本更新检查  渠道信息，仅android传递  ios作为ios的默认渠道
        # 版本号，android为小版本号，如“900”，IOS为正常版本号，如“3.0”
        version_key = u'%s_%s' % (render['appos'], channel)

        # version_key（系统_渠道_省_市） eg: android_Huawei_shanghai
        # version_value 值为  版本号|显示版本号|大小|强制升级|日志|URL
        version_value           = None
        if request.user.is_authenticated() and render['user_root_base']:
            # 内部账号，优先查询测试环境，其次查询正式环境
            version_value       = gpub.redis2.hget('app_update_test', version_key)

        if not version_value:
            version_value       = gpub.redis2.hget('app_update_formal', version_key)

        if version_value:
            # 版本号|显示版本号|大小|强制升级|日志|URL
            ver_num, ver_show, ver_size, force_update, ver_log, ver_url = version_value.split('|')
            if version and float(version) < float(ver_num):
                # 版本号小于当前版本号，应该下载
                version_update_infor['has_update']      = True
                version_update_infor['size']            = ver_size
                version_update_infor['force_update']    = False if force_update == '0' else True
                version_update_infor['log']             = ver_log
                version_update_infor['url']             = ver_url
                version_update_infor['version']         = ver_show

                #  版本号小于50000，强制升级；大于等于50000并且有新包，照常处理
                if render['appos'] in ('android', 'ios') and render['appver'] < 50000:
                    version_update_infor['force_update'] = True


        # 检测差分包，如果有更新，则才会有差分包
        if channel == 'android':
            diff_key            = u'%s_%s' % (channel, version)
            diff_value          = gpub.redis2.hget('app_differpackage', diff_key)
            if diff_value and version_update_infor['has_update']:
                vnum, hhash, hsize, silence, hurl       = diff_value.split('|')
                version_update_infor["md5"]             = hhash
                version_update_infor["diff_url"]        = hurl
                version_update_infor["diff_size"]       = hsize
                version_update_infor["silent"]          = silence == u'是'
    except:
        gpub.log_error.debug(traceback.format_exc())

    return { 'update_info' : version_update_infor }

def sysconfig_v3_advertise(request , response , render , post_data):
    """v3之后将支持启动页广告的配置能力"""
    advertise_default, advertise_custom, advertise_general_yes, advertise_advertise_no = [], [], [], []
    try:
        # 广告监控相关参数
        mac1            = post_data.get('mac' , '')
        imei            = post_data.get('imei' , '')
        idfa            = post_data.get('idfa' , '')
        androidid       = post_data.get('androidid' , '')

        androidid_md5   = ''
        if imei:
            imei            = imei.ljust(32 , '0')
        if androidid:
            androidid_md5   = androidid.ljust(32 , '0')
        mac             = ''
        if mac1:
            mac1        = mac1.upper()
            mac         = mac1.replace(':', '')

        # 添加广告页 img 广告图片;  url 广告软文链接;  start_time 广告在一天中的起始生效时间; end_time 结束生效时间，范围同上;
        # background_time App后台展示广告时间间隔，单位是分钟，默认5分钟; countdown_time 广告展示时间，单位秒，默认3秒;
        # expire_time 广告过期时间，如“20160801”

        # http://g.cn.miaozhen.com/x/k=2026839&p=71fAK&dx=0&rt=2& （秒针）
        monitor_url     = 'ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&mo=__OS__&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&nn=__APP__&m6=__MAC1__&m6a=__MAC__'
        monitor_param   = {
            '__IP__'        : request.META.get('REMOTE_ADDR' , ''),
            '__IESID__'     : '',
            '__LOC__'       : '',
            '__ADPLATFORM__': '',
            '__OS__'        : {'android': '0', 'ios': '1'}.get(render['appos'], ''),
            '__OPENUDID__'  : '',
            '__DUID__'      : '',
            '__ANDROIDID1__': androidid,
            '__IMEI__'      : imei,
            '__ANDROIDID__' : androidid_md5,
            '__AAID__'      : '',

            '__IDFA__'      : idfa,
            '__APP__'       : 'namibox',
            '__MAC__'       : mac,
            '__MAC1__'      : mac1
        }
        for k, v in monitor_param.items():
            if v:
                monitor_url = monitor_url.replace(k, v)

        screen_width        = post_data.get('screen_width', 900)
        screen_height       = post_data.get('screen_height', 1600)
        province            = post_data.get('province')
        city                = post_data.get('city')


        width_height_rate   = screen_height/float(screen_width)
        province_all        = [province, None]
        province_city       = [province, city]
        if request.user.is_authenticated() and render['user_root_base']:
            advertises = list(gpub.query_advertises_action())
        else:
            advertises = gpub.smart_switch_ssl_data(list(gpub.advertises_cc['ADVERTISE'].get('advertises')), render)

        # 新装机用户7天内展示专属广告位
        uuid = render.get("UUID", "")
        publisher_list = []
        if advertises:
            publisher_list = get_user_publisher( province, city)

        user_grade = serialize_client_grade(post_data.get('grade'))
        if not request.user.is_authenticated():
            gpub.log_error.error('---user-grade-%s' % (user_grade))
            user_tag_obj = get_user_tag(0, user_grade)
        else:
            user_grade = user_grade or request.user.get_profile().grade
            gpub.log_error.error('---user-grade-%s' % (user_grade))
            user_tag_obj = get_user_tag(request.user.id, user_grade)

        gpub.log_error.error('-----user_tag-----money=%s----user_id=%s---products=%s'%(user_tag_obj.money_sum or 0, request.user.id, user_tag_obj.list_product))

        gpub.log_error.error('----%s'%([item.id for item in advertises]))
        for advertise in advertises:
            if not advertise.is_default or advertise.is_default == u'否':  # 非默认广告
                # 不在当前时间段，过滤掉
                if not (advertise.begintime <= datetime.datetime.now() <= advertise.expiretime):
                    continue
                group_rule_dict = {}
                if advertise.group_rule:
                    group_rule_dict = simplejson.loads(advertise.group_rule)
                # 地区校验规则
                valid_area_status = check_advertise_area(advertise, province_all, province_city)
                gpub.log_error.error('-----valid_area_status=%s-----group_rule_dict=%s' % (valid_area_status, group_rule_dict))
                if not request.user.is_authenticated():
                    # has_auth = check_in_rule(0, group_rule_dict, user_grade)
                    has_auth = check_in_rule_new(0, group_rule_dict, user_tag_obj, valid_area_status,publisher_list)
                else:
                    # 使用标签的新定向推送
                    # has_auth = check_in_rule(int(request.user.id), group_rule_dict, user_grade)

                    has_auth = check_in_rule_new(int(request.user.id), group_rule_dict, user_tag_obj, valid_area_status, publisher_list)
                if not has_auth:
                    continue

            # 监控统计url
            exposure_url    = u'%s&%s' % (advertise.exposure_url, monitor_url)
            if advertise.monitor_type == u'纳米盒':
                # 纳米盒监控曝光
                exposure_url = u'%s/api/app/advertise_stat?id=%d&%s' % (render['site'], advertise.id, monitor_url)

            # 点击事件跳转url
            adv_url = advertise.click_url or ''
            click_url_args = urlparse.parse_qs(urlparse.urlsplit(adv_url).query)
            _app_template_str = ''
            if click_url_args.get('_app_template'):
                _app_template_str = '&_app_template=%s' % click_url_args.get('_app_template')[0]

            advertise_url = u'%s/api/app/advertise_stat?id=%d&%s&adv_url=%s%s' % \
                            (render['site'], advertise.id, monitor_url, urllib.quote(smart_decode(adv_url).encode('utf8')), _app_template_str)
            advertise_obj   = {
                'id'                : advertise.id,
                'url'               : advertise_url,
                'start_time'        : advertise.start_hour,
                'end_time'          : advertise.end_hour,
                'background_time'   : 15,
                'countdown_time'    : advertise.countdown_time,
                'monitor_url'       : exposure_url,
                'expire_time'       : advertise.expiretime.strftime('%Y%m%d%H%M%S'),
            }

            ###############################新装机用户#######################
            new_user = False
            if uuid and gpub.redis_uuid.exists('uuid_7:%s' % uuid):
                new_user = True

            if new_user:
                if advertise.id in [618, 632]:
                    pass
                else:
                    continue
            else:
                if advertise.id in [618, 632]:
                    continue

            ###############################第三方米赋广告#######################
            # 第三方广告固定ID 米赋广告
            if advertise.id == 462:
                if render['appver'] >= 50400 or not render['appver']:
                    advertise_obj['fromthirdpart'] = 'mifu'
                else:
                    continue

            # 视频类型广告
            if advertise.type and advertise.type == 'video' and (render['appver'] >= 40300 or not render['appver']):
                video_url            = sorted([('video_small', 16/9.0),  ('video_normal', 3/2.0),  ('video_large', 4/3.0),  ('video_huge', 2/1.0)], key = lambda x: abs(x[1] - width_height_rate))
                real_video_url = None
                # 如果有以上4个尺寸中有一个尺寸的没有上传。则取尺寸最近的那一张
                for one in video_url:
                    real_video_url = getattr(advertise, one[0])
                    if real_video_url:
                        break

                advertise_obj['video_url'] = real_video_url
                advertise_obj['type'] = 'video'

            # 图片类型广告
            else:
                show_url               = sorted([('show_small', 16/9.0),  ('show_normal', 3/2.0),  ('show_large', 4/3.0), ('show_huge', 2/1.0)], key = lambda x: abs(x[1] - width_height_rate))
                real_show_url = None
                # 如果有以上4个尺寸中有一个尺寸的没有上传。则取尺寸最近的那一张
                for one in show_url:
                    real_show_url = getattr(advertise, one[0])
                    if real_show_url:
                        break

                img_url                = real_show_url
                if img_url:
                    advertise_obj['img']  = img_url
                    advertise_obj['type'] = 'img'
                else:
                    continue


            if advertise.is_default and advertise.is_default == u'是': # 默认广告
                advertise_default.append(advertise_obj)
            elif advertise.special_province_city: # 如果设置了制定地区的广告
                advertise_custom.append(advertise_obj)
            elif advertise.support_general == u'是': # 通用广告
                advertise_general_yes.append(advertise_obj)
            else: # 非通用广告及其他
                advertise_advertise_no.append(advertise_obj)
        gpub.log_error.error('==advertise_custom====>%s'%([item['id'] for item in advertise_custom]))
        gpub.log_error.error('==advertise_general_yes====>%s' % ([item['id'] for item in advertise_general_yes]))
        gpub.log_error.error('==advertise_advertise_no====>%s' % ([item['id'] for item in advertise_advertise_no]))
        # 当该地区有定制广告（advertise_custom）的时候，需要把advertise_custom + advertise_general_yes一起混淆
        # 当该地区没有定制广告（advertise_custom）的时候，需要把advertise_general_yes + advertise_general_no一起混淆
        if advertise_custom:
            advertise_custom.extend(advertise_general_yes)
        else:
            advertise_custom.extend(advertise_general_yes)
            advertise_custom.extend(advertise_advertise_no)

        # 没有取到特定的广告，就取通用广告
        if not advertise_custom:
            advertise_custom = advertise_default
        random.shuffle(advertise_custom)
    except:
        gpub.log_error.debug(traceback.format_exc())

    gpub.log_error.error('==last====>%s' % ([item['id'] for item in advertise_custom]))
    return {'ads': advertise_custom}


def sysconfig_v3_special_control(request , response , render , post_data):
    """V3版本的一些特殊控制"""
    data_ret = {}
    # 读取sdk_conf.ini的NOT_OPEN_BOOK信息，判断sdk下载的课本是否经过book页面，默认都是经过
    data_ret['not_go_book'] = {}
    sdk_cfg = gpub.cc[os.path.join(gpub.BASEDIR_S , 'pay'  , 'sdk_conf.ini')]
    if sdk_cfg and 'NOT_OPEN_BOOK' in sdk_cfg:
        for key, value in sdk_cfg['NOT_OPEN_BOOK'].items():
            if  key == 'waiyansdk' and  render['appver'] > 30005:
                data_ret['not_go_book'][key] = False
            else:
                data_ret['not_go_book'][key] = value == 'TRUE'

    # 控制主题色
    # data_ret['theme_color'] = '#ff0000'

    # 控制离线下载课本增量更新的APP工作方式 ,3.0app默认支持
    data_ret['support_diff_download']= True

    # 全局控制语音评测模式字段 online_cs、online_xf、offline_cs app默认online_xf
    data_ret['enginetype']= 'offline_cs'

    # 环信客服分组
    data_ret['easemob_cs'] = {'cs_group' : {'user' : 'A' ,'product'  : 'A' , 'pay':'A' ,'order' : 'A' ,'detail':'A',
                                            'sishu': 'S','user_7moor': u'纳米盒客服', 'product_diandu_7moor': u'咨询点读',
                                            'product_wangxiao_7moor': u'咨询网校','product_weike_7moor': u'微课教辅',
                                            'pay_7moor':u'账户', 'order_7moor': u'账户', 'vip_7moor': u'会员',
                                            'detail_7moor': u'纳米盒客服', 'sishu_7moor': u'纳米盒客服',
                                            'kewai_7moor': u'其他'},
                              'im_serverid': "namibox_kefu",
                              'app_feedback': False
                              }

    # httpdns 控制开关，APP默认是开启
    data_ret['httpdns'] = True
    data_ret['session_hold'] = False
    data_ret['phonebook'] = {}
    data_ret['guide'] = None
    data_ret['appicon'] = ''
    data_ret['new_dev_clickread'] = False
    # 书本增量更新开关support_diff_download ,httpdns ，SESSIONHOLD控制开关,APP原生页面和非原生切换
    try:
        sys_cfg = gpub.cc[os.path.join(gpub.BASEDIR_S , 'sysconf'  , 'sys_config.ini')]
        data_ret['support_diff_download'] = sys_cfg['BOOK_INCRE_UPDATES']['update'] == 'TRUE'
        data_ret['httpdns'] = sys_cfg['HTTPDNS']['switch'] == 'TRUE'
        if render['appver'] >= 50700:
            data_ret['customer_service_type'] = sys_cfg['CUSTOMER_SERVICE']['cs_type']
        else:
            data_ret['customer_service_type'] = "huanxin"
        data_ret['session_hold'] =sys_cfg['SESSIONHOLD']['switch'] == 'TRUE'
        data_ret['appnative'] = {}
        # 特殊修改 ，
        if render['appos'] == 'ios':
            if  render['appver'] < 50800:
                data_ret["shanyan_login"] = False
            else:
                data_ret["shanyan_login"] = sys_cfg["LOGIN"]["shanyan_ios"] == 'TRUE'
        else:
            data_ret["shanyan_login"] = sys_cfg["LOGIN"]["shanyan_android"] == 'TRUE'

        for k , v in sys_cfg['APPNATIVE'].items():
            data_ret['appnative'][k] = v=='TRUE'

        if render['appchannel']:
            guide =  sys_cfg['GUIDE'].get(render['appchannel'])
            if guide:
                data_ret['guide'] = [] if guide == "-1" else  map(int,guide)
            data_ret['force_register_login'] = render['appchannel'] in sys_cfg['FORCE_REGISTER']['channels']

        if render['appver'] >= 50700:
            for contact, phonelist in sys_cfg['PHONEBOOK'].items():
                data_ret['phonebook'][contact]= []
                for i, phone in enumerate(phonelist):
                    data_ret['phonebook'][contact].append({'name': '%s%s'% (contact,i+1),"phone": phone})
        # 网校练习题提交模式开关
        data_ret['exercise_commit_only_by_http'] = sys_cfg['EXERCISE_COMMIT_MODEL']['only_by_http'] == 'TRUE'
        # 客户端支持appicon替换图标
        data_ret['appicon']= sys_cfg['APPICON']['appicon'] or ''
        data_ret['new_dev_clickread'] = sys_cfg['NEW_DEV']['new_dev_clickread']== 'TRUE'
    except:
        gpub.log_error.debug(traceback.format_exc())

    # https域名白名单
    data_ret['domain_https'] = settings.DOMAIN_HTTPS.keys()

    return data_ret

RE_APP_SYS_VERSION = re.compile('(?P<v1>\d+)\.(?P<v2>\d+)(\.(?P<v3>\d+))?')


def sysconfig_v3_check_hotfix(request , response , render , post_data):
    """补丁版本检查，用于修复BUG"""

    hot_fix_map     = {
            "url"           : None,
            "md5"           : None,
            "needrestart"   : False
        }
    try:
        # 客户端升级相关操作
        version                 = post_data.get('version' , '')
        version_key             = u'%s_%s' % (render['appos'], version)
        version_value           = None
        if request.user.is_authenticated() and render['user_root_base']:
            # 内部账号，优先查询测试环境，其次查询正式环境
            version_value       = gpub.redis2.hget('app_hotfix_test', version_key)

        if not version_value:
            version_value       = gpub.redis2.hget('app_hotfix_formal', version_key)

        if version_value:
            vnum, hhash, hsize, hstart, hlog, hurl  = version_value.split('|')
            hot_fix_map["url"]          = hurl
            hot_fix_map["md5"]          = hhash
            hot_fix_map["needrestart"]  = hstart == u'是'
    except:
        gpub.log_error.debug(traceback.format_exc())

    return { 'hotfix' :  hot_fix_map}



@jct.utility.amrefresh_cache(timeout = 60)
def sysconfig_v4_check_theme(request , response , render , post_data , key_cache = None):
    # 检测是否有 有效主题
    theme_list    = []
    theme_map     = {'theme':theme_list }

    try:
        theme           = None
        if key_cache:
            # 内部账号，优先查询测试环境，其次查询正式环境
            theme = gpub.redis2.hgetall('app_theme_test')

        if not theme:
            theme = gpub.redis2.hgetall('app_theme_formal')
        theme = dict([(key, ord_json.loads(value)) for key, value in theme.items()])

        if theme:
            theme = sorted(theme.values() , cmp = lambda x , y : cmp(x.get('expire_time') , y.get('expire_time')))
            this_time  = time.strftime("%Y%m%d%H%M%S")
            theme_list.extend([value for value in theme if value.get('expire_time') > this_time])

    except:
        gpub.log_error.debug(traceback.format_exc())

    return theme_map



@jct.utility.amrefresh_cache(timeout = 1800)
def sysconfig_v4_check_imanimationtext(request , response , render , post_data , key_cache = None):
    # 检测是否有 有效im效果

    im_animationtext_map     = {}

    try:
        if request.user.is_authenticated() and render['user_root_base']:
            # 内部账号，优先查询测试环境，其次查询正式环境
            im_animationtext_map.update(gpub.redis2.hgetall('app_im_animationtext_test'))

        # if not im_animationtext_map:
        im_animationtext_map.update(gpub.redis2.hgetall('app_im_animationtext_formal'))

        im_animationtext_map = dict([(smart_decode(key) ,  smart_decode(value) if smart_decode(value).startswith('http') else render['cdn_audio']+smart_decode(value) )
                                     for key, value in im_animationtext_map.items()])


    except:
        gpub.log_error.debug(traceback.format_exc())

    return {'IM_animationtext': im_animationtext_map}


@jct.utility.amrefresh_cache(timeout=600)
def get_message_task_cache(key_cache=None):
    return get_message_task()


def get_message_task():
    ''' 功能函数 获取当前在线并且未超时的task 以及 message '''
    today = str(datetime.datetime.today())
    # 获取当前在线并且未超时的task 以及 message
    _apppush_list = []
    message_id_list = set()
    apppush_list = list(Jct5ApppushTask.objects.filter(end_time__gt=today,
                                                       start_time__lte=today,
                                                       task_type__in=[u'应用内推送', 'all'],
                                                       task_status__in=[u'内部上线', u'正式上线']).order_by('-start_time'))

    for one_task in apppush_list:
        _apppush_list.append(one_task)
        message_id_list.add(one_task.message_id)

    # 获取redis中非 u'所有用户', u'认证教师' 的 group_name 对应的值
    group_name_list = [smart_decode(one_task.send_user_1) for one_task in _apppush_list if one_task.send_user_1 and
                        smart_decode(one_task.send_user_1) not in (u'所有用户', u'认证教师')]
    group_obj_list = Jct5ApppushUserGroup.objects.filter(group_name__in=set(group_name_list))
    group_obj_dict = dict([(group_obj.group_name, {'user_num': group_obj.user_num,
                             'group_type': group_obj.group_type,
                             'group_rule': group_obj.group_rule,
                             'delete_time': str(group_obj.delete_time),
                             }) for group_obj in group_obj_list])
    for one_task in _apppush_list:
        one_task.group_type = None
        if one_task.send_user_1 and smart_decode(one_task.send_user_1) not in (u'所有用户', u'认证教师'):
            send_user_group = group_obj_dict.get(smart_decode(one_task.send_user_1))
            group_rule = send_user_group.get('group_rule')
            one_task.group_type = send_user_group.get('group_type')
            one_task.user_num = send_user_group.get('user_num')
            one_task.group_rule = simplejson.loads(group_rule) if group_rule else None
            one_task.delete_time = str(send_user_group.get('delete_time'))

    message_list = Jct5ApppushMessage.objects.filter(status=u'上线', id__in=message_id_list)
    return _apppush_list, dict([(message.id, message) for message in message_list])


def sysconfig_v4_check_apppush(request, response, render, post_data):
    # 检测是否有 消息推送
    apppush_result = []
    apppush_obj_list = []
    try:
        # 如果是内部用户，不走缓存
        if request.user.is_authenticated() and render['user_root_base']:
            apppush_list, message_dict = get_message_task()
        else:
            # 检测是否有 消息推送
            apppush_list, message_dict = get_message_task_cache(key_cache='v8')
        uuid = render.get("UUID", "")
        new_user_in_48 = False
        if uuid:
            temp_uuid = gpub.redis_uuid.get('uuid_7:%s' % uuid)
            if temp_uuid:
                create_time = int(temp_uuid.split(',')[1])
                now_time = int(time.time())
                if (now_time - create_time <= 2 * 24 * 60 * 60):
                    new_user_in_48 = True
        publisher_list = []
        if apppush_list:
            publisher_list = get_user_publisher(post_data.get('province', ''), post_data.get('city', ''))

        user_grade = serialize_client_grade(post_data.get('grade'))
        if not request.user.is_authenticated():
            user_tag_obj = get_user_tag(0, user_grade)
        else:
            user_grade = user_grade or request.user.get_profile().grade
            user_tag_obj = get_user_tag(request.user.id, user_grade)

        for one_task in apppush_list:
            # 新装机用户，不会收到任何大图推送
            if new_user_in_48 and (one_task.task_type == u'应用内推送'):
                continue

            valid_area_status = check_apppush_area(one_task, post_data)
            # group_type 是定向推送的标志，下面处理定向推送的东西
            if one_task.group_type and one_task.group_type == 'tag_group' and one_task.group_rule:
                if not request.user.is_authenticated():
                    # has_auth = check_in_rule(0, one_task.group_rule_dict, user_grade)
                    has_auth = check_in_rule_new(0, one_task.group_rule, user_tag_obj, valid_area_status, publisher_list)
                else:
                    # 使用标签的新定向推送
                    # has_auth = check_in_rule(int(request.user.id), one_task.group_rule_dict, user_grade)

                    has_auth = check_in_rule_new(int(request.user.id), one_task.group_rule, user_tag_obj, valid_area_status, publisher_list)
                if not has_auth:
                    continue
            else:
                if not valid_area_status:
                    continue
                if one_task.group_type:
                    if request.user.is_authenticated() and one_task.group_type == 'id_group':
                        # 使用ID的定向推送
                        if not gpub.redis2.sismember('push_task_group:' + str(one_task.id), int(request.user.id)):
                            continue
                    else:
                        # 定向必须有group_type。且只支持 ID定向推送，标签定向推送，其他都不支持
                        continue

            # 验证发送平台 （发送平台 ("all", "android", "ios")）
            if not (render['appos'] and (one_task.run_os == 'all' or render['appos'].lower() == one_task.run_os)):
                continue

            # 验证用户，如果是非盒子家族成员，只能收取“正式上线”
            if one_task.task_status == u'内部上线' and not(request.user.is_authenticated() and render['user_root_base']):
                continue

            # 验证用户，根据用户群进行推送的时候，并且，在内部上线的时候，也只有盒子家族中的认证教师才能收到此消息
            if one_task.send_user and not request.user.is_authenticated():
                continue

            # 认证教师判断
            if one_task.send_user and one_task.send_user == u'认证教师' and one_task.send_user != request.user.get_profile().v:
                continue

            # 推广大使判断
            elif one_task.send_user and one_task.send_user == u'推广大使' and not is_namibox_vip_emissary(request.user.id) :
                continue

            else:
                apppush_obj_list.append(one_task)

        if apppush_obj_list and render['appver'] < 50501:
            apppush_obj_list = [apppush_obj_list[0]]

        for apppush_obj in apppush_obj_list:
            message_obj = message_dict.get(apppush_obj.message_id)
            click_url = message_obj.click_url
            click_url_args = urlparse.parse_qs(urlparse.urlsplit(click_url).query)
            _app_template_str = ''
            if click_url_args.get('_app_template'):
                _app_template_str = '&_app_template=%s' % click_url_args.get('_app_template')[0]

            one_result ={
                "cid"     :   message_obj.id,
                'task_id' :   apppush_obj.id,
                'type'    :  'notification' ,
                'title'   :   message_obj.title or '',
                'content' :   message_obj.subtitle or '',
                'monitor' :   u'%s/api/app/push_stat?id=%d&push_type=apppush' % (render['site'], message_obj.id),  # 为了统计曝光量
                'view'    :  'namibox_notify',
                'push_id' :  str(message_obj.id) +"|"+ apppush_obj.run_machine +"|"+ apppush_obj.run_os,
                'start_time': str(apppush_obj.start_time) .replace(':', '').replace(' ', '').replace('-', ''),
                'end_time'  : str(apppush_obj.end_time).replace(':', '').replace(' ', '').replace('-', ''),
                's_image'   : message_obj.s_image,
                's_image_bg': message_obj.s_image_bg,
                'showtime'  : message_obj.showtime,
                'b_image'   : message_obj.b_image
            }
            # 5.8.1后，支持原生命令
            if render['appver'] >= 50801 and 'appnative/redirect_page?' in click_url:
                all_params = click_url.split('params=')[-1].split('|')
                all_params_dict = dict([(a.split(':')[0], a.split(':')[1]) for a in all_params])
                one_result['action'] = all_params_dict
                # app原生命令的时候，用这种方式统计点击量
                one_result['click_monitor'] = u'%s/api/app/push_stat?id=%d&push_type=apppush&push_url=action' % (render['site'], message_obj.id)
            else:
                one_result['url'] = u'%s/api/app/push_stat?id=%d&push_type=apppush&push_url=%s%s' % (render['site'], message_obj.id, urllib.quote(smart_decode(click_url).encode('utf8')), _app_template_str)

            apppush_result.append(one_result)

        if render['appver'] < 50501:
            if apppush_result:
                apppush_result = apppush_result[0]
            else:
                apppush_result = {}
    except:
        gpub.log_error.debug(traceback.format_exc())
        if render['appver'] < 50501:
            apppush_result = {}
        else:
            apppush_result = []
    return {'apppush': apppush_result}


def sysconfig_v5_check_native_update(request , response , render , post_data):
    native_update = {'ios': [], 'android': []}
    try:
        version = post_data.get('version')
        if not version:
            return {'native_update': native_update}
        args = {'version_num__lte': int(version), 'platform': render['appos']}
        cdn_upimg = render['cdn_upimg']
        # 如果是内部用户，不走缓存
        if request.user.is_authenticated() and render['user_root_base']:
            args['formal__in'] = ['test', 'formal']
            return get_native_update(args, cdn_upimg, post_data)
        else:
            args['formal'] = 'formal'
            key_cache = '_'.join([render['appos'], str(post_data.get('version')), str(request.user.is_authenticated() and render['user_root_base'])])
            # 检测是否有 消息推送
            return get_native_update_cache(args, cdn_upimg, key_cache=key_cache)
    except:
        gpub.log_error.debug(traceback.format_exc())
    return {'native_update': native_update}


@jct.utility.amrefresh_cache(timeout = 600)
def get_native_update_cache(args, cdn_upimg, key_cache=None):
    return get_native_update(args, cdn_upimg, key_cache=key_cache)


def get_native_update(args, cdn_upimg, key_cache=None):
    native_update = {'ios': [], 'android': []}
    try:
        native_update_list = Jct4NativeUpdate.objects.filter(**args)
        native_update_list = getAllDatas(native_update_list)
        # 下面的代碼格式化重要的三個數據 forceupdate  resourceurl updateversion
        for native_update_item in native_update_list:
            native_update_item['forceupdate'] = True if native_update_item['forceupdate'] == u'是'else False
            native_update_item['resourceurl'] = cdn_upimg +'/'+ native_update_item['resourceurl']
            native_update_item['updateversion'] = str(native_update_item['updateversion'])
            native_update[native_update_item['platform']].append(native_update_item)

        if args['platform'] == 'android':
            apkid_item_dict = {}
            latest_apkid_item_list = []
            for item in native_update['android']:
                if item['apkid'] in apkid_item_dict:
                    apkid_item_dict[item['apkid']].append(item)
                else:
                    apkid_item_dict[item['apkid']] = [item]
            for apkid, current_item_list in apkid_item_dict.items():
                current_item_list.sort(key=lambda x: int(x.get('updateversion')), reverse=True)
                latest_apkid_item_list.append(current_item_list[0])
            native_update['android'] = latest_apkid_item_list
    except:
        gpub.log_error.debug(traceback.format_exc())
    return {'native_update': native_update}


@gpub.wglobal()
def sysconfig(request , response , render):
    """查询系统运行参数
    """
    os_name = request.REQUEST.get('os_name' , '')            #  iOS
    os_version = request.REQUEST.get('os_version' , '')         # 系统版本如：ios10.3
    app_version = request.REQUEST.get('app_version' , '')       # app版本号（3.0.7）

    try:
        post_data = (json.read(request.body) or {} ) if request.body else {}
    except:
        post_data = {}

    # 针对某些设备在某些网络下会丢失UA导致无法正常显示的问题，这里做一些特殊的保护，只在无法通过UA获取信息的情况下进行
    if not render['appos'] and not render['appver']:
        app_os = 'ios' if os_name == 'iPhone OS' or render['platform'] in ('ipad' , 'iphone' , 'ipod') else 'android'
        re_app = RE_APP_SYS_VERSION.match(app_version)
        app_ver = int(re_app.group('v1')) * 10000 + int(re_app.group('v2')) * 100 + int(re_app.group('v3') or 0) if re_app else 30000
        render['appver']  = app_ver

        # 安卓在3.0.2之前都没有携带参数，也不支持Cookie保存到浏览器会话，放弃Cookie做法
        # expires = (datetime.datetime.now() + datetime.timedelta(days = 7)).strftime("%a, %d-%b-%Y %H:%M:%S GMT")
        # response.set_cookie('_app_os' , app_os , expires = expires , max_age = 60 * 60 * 24 * 7)
        # response.set_cookie('_app_ver' , app_ver , expires = expires , max_age = 60 * 60 * 24 * 7)

        if request.session.get('_app_os') != app_os or request.session.get('_app_ver') != app_ver:
            request.session['_app_os']  = app_os
            request.session['_app_ver'] = app_ver

    province = post_data.get('province') or ''
    city = post_data.get('city') or ''

    if '__province__' in request.REQUEST:
        province = request.REQUEST['__province__']
    if '__city__' in request.REQUEST:
        city = request.REQUEST['__city__']

    if not province and not city:
        ipaddress = request.META.get('REMOTE_ADDR', '')
        if ipaddress.startswith('192.') or ipaddress.startswith('127.'):
            ipaddress = '116.231.115.171'

        location = gpub.query_ip_geocoder_info(ipaddress, is_producer=False)
        if location:
            province = location.province or ''
            city = location.city or ''

    post_data['province'] = province
    post_data['city'] = city

    data_ret    = {}
    if render['ios_audit']:
        data_ret['audit_ver'] = render['appver']
    else:
        data_ret['audit_ver'] = ''

    if render['appver'] < 20000:
        # v2.0之前的版本要求包含foot/welcome/main的下载地址链接
        data_ret.update(sysconfig_v1_static_page(request , response , render , post_data) or {})

    if render['appver'] < 20000:
        # v2.0之前的版本要求包含foot/welcome/main的下载地址链接
        data_ret.update(sysconfig_v1_static_page(request , response , render , post_data) or {})

    if render['appver'] >= 20000 or not render['appver']:
        # v2.0以后将支持安全监测
        data_ret.update(sysconfig_v2_safe_check(request , response , render , post_data) or {})

        # v2以后支持本地静态域名资源缓存
        data_ret.update(sysconfig_v2_local_cache(request , response , render , post_data) or {})

        # v2以后支持本地静态页面
        data_ret.update(sysconfig_v2_local_page(request , response , render , post_data) or {})

    if render['appver'] >= 30000 or not render['appver']:
        # v3版本后支持版本升级监测
        data_ret.update(sysconfig_v3_check_update(request , response , render , post_data) or {})

        # v3版本后支持广告的发布能力

        if not render['ios_audit']:
            data_ret.update(sysconfig_v3_advertise(request , response , render , post_data) or {})
        else:
            screen_width        = post_data.get('screen_width', 900)
            screen_height       = post_data.get('screen_height', 1600)
            width_height_rate   = screen_height/float(screen_width)
            show_url            = sorted([('show_small', 16/9.0), ('show_normal', 3/2.0),
                                        ('show_large', 4/3.0), ('show_huge', 2/1.0)], key=lambda x: abs(x[1] - width_height_rate))
            # 审核模式直接返回指定链接，和广告
            advertise           = Jct4Advertises.objects.filter(id=166)
            if advertise:
                advertise 		= advertise[0]
                real_show_url = None
                # 如果有以上4个尺寸中有一个尺寸的没有上传。则取尺寸最近的那一张
                for one in show_url:
                    real_show_url = getattr(advertise, one[0])
                    if real_show_url:
                        break
                advertise.click_url = "http://namibox.com/v/push/d/jct3content/008185"
                data_ret.update({'ads': [{
                                                'img'               : real_show_url,
                                                'url'               : u'%s/api/app/advertise_stat?id=%d&adv_url=%s' % (render['site'], advertise.id, advertise.click_url),
                                                'start_time'        : advertise.start_hour,
                                                'end_time'          : advertise.end_hour,
                                                'background_time'   : 15,
                                                'countdown_time'    : advertise.countdown_time,
                                                'monitor_url'       : '',
                                                'expire_time'       : advertise.expiretime.strftime('%Y%m%d%H%M%S')
                                            }]})

        # V3版本的一些特殊控制
        data_ret.update(sysconfig_v3_special_control(request , response , render , post_data) or {})

        # 检测是否有热补丁
        # data_ret.update(sysconfig_v3_check_hotfix(request , response , render , post_data) or {})

    if (render['appos'] == 'android' and render['appver'] >= 60000) or (render['appos'] == 'ios' and render['appver'] > 60000) or not render['appver']:
        # 检测是否有 有效主题
        theme_dict = sysconfig_v4_check_theme(request, response, render, post_data, key_cache=request.user.is_authenticated() and render['user_root_base'])
        data_ret.update(theme_dict or {'theme': []})

    if render['appver'] >= 40000 or not render['appver']:
        # 检测是否有 有效im效果
        data_ret.update(sysconfig_v4_check_imanimationtext(request , response , render , post_data , key_cache = request.user.is_authenticated() and render['user_root_base']) or {})

    if render['appver'] >= 40200 or not render['appver']:
        # app 大图推送
        if not render['ios_audit']:
            data_ret.update(sysconfig_v4_check_apppush(request , response , render , post_data))
        else:
            data_ret.update({'apppush': {}})

    if render['appver'] >= 50000 or not render['appver']:
        grade_list = [{
             "sectionname":u"学前",
             "display":0,
             "section":[{
                 "gradename": u"幼儿园",
                 "grade":[{
                     "itemname": u"幼儿园",
                     "key": "ye",
                     "page": "schoolbook",
                     "path":"/v/menu/ye"
                 }]

             }]
        },{
             "sectionname":u"小学",
             "display": 0,
             "section":[{
                 "gradename": u"一年级",
                 "grade":[{
                    "itemname": u"一年级(上)",
                    "key": "1a",
                    "page": "schoolbook",
                    "path": "/v/menu/1a"
                    },{
                        "itemname": u"一年级(下)",
                        "key": "1b",
                        "page": "schoolbook",
                        "path": "/v/menu/1b"
                    }]
             },{
                 "gradename": u"二年级",
                 "grade":[{
                    "itemname": u"二年级(上)",
                    "key": "2a",
                    "page": "schoolbook",
                    "path": "/v/menu/2a"
                    },{
                        "itemname": u"二年级(下)",
                        "key": "2b",
                        "page": "schoolbook",
                        "path": "/v/menu/2b"
                    }]
             },{
                 "gradename": u"三年级",
                 "grade":[{
                    "itemname": u"三年级(上)",
                    "key": "3a",
                    "page": "schoolbook",
                    "path": "/v/menu/3a"
                    },{
                        "itemname": u"三年级(下)",
                        "key": "3b",
                        "page": "schoolbook",
                        "path": "/v/menu/3b"
                    }]
             },{
                 "gradename": u"四年级",
                 "grade":[{
                    "itemname": u"四年级(上)",
                    "key": "4a",
                    "page": "schoolbook",
                    "path": "/v/menu/4a"
                    },{
                        "itemname": u"四年级(下)",
                        "key": "4b",
                        "page": "schoolbook",
                        "path": "/v/menu/4b"
                    }]
             },{
                 "gradename": u"五年级",
                 "grade":[{
                    "itemname": u"五年级(上)",
                    "key": "5a",
                    "page": "schoolbook",
                    "path": "/v/menu/5a"
                    },{
                        "itemname": u"五年级(下)",
                        "key": "5b",
                        "page": "schoolbook",
                        "path": "/v/menu/5b"
                    }]
             },{
                 "gradename": u"六年级",
                 "grade":[{
                    "itemname": u"六年级(上)",
                    "key": "6a",
                    "page": "schoolbook",
                    "path": "/v/menu/6a"
                    },{
                        "itemname": u"六年级(下)",
                        "key": "6b",
                        "page": "schoolbook",
                        "path": "/v/menu/6b"
                    }]
             }]
        },{
             "sectionname":u"小升初",
             "display": 2,
             "section":[{
                 "gradename": u"小升初",
                 "grade":[{
                     "itemname": u"小升初",
                     "key": "xsc",
                     "page": "",
                     "path":""
                 }]

             }]
        },{
             "sectionname":u"初中",
             "display": 1,
             "section":[{
                 "gradename": u"初中",
                 "grade":[{
                     "itemname": u"初中",
                     "key": "cz",
                     "page": "schoolbook",
                     "path":"/v/menu/cz"
                 }]

             }]
        },{
             "sectionname":u"高中",
             "display": 1,
             "section":[{
                 "gradename": u"高中",
                 "grade":[{
                     "itemname": u"高中",
                     "key": "gz",
                     "page": "schoolbook",
                     "path":"/v/menu/gz"
                 }]

             }]
        }]
        data_ret.update({'grade_list_data': grade_list})
        data_ret.update(sysconfig_v5_check_native_update(request, response, render, post_data))

        # 更新用户班级信息
        cur_grade = post_data.get('grade') or ''
        if request.user.is_authenticated() and cur_grade and cur_grade in ['1a', '1b', '2a', '2b', '3a', '3b', '4a', '4b', '5a',
                                                                 '5b', '6a', '6b', 'ye', 'xsc', 'cz', 'gz']:
            _user_grader = Jct5UserGradeInfo.objects.filter(user_id = request.user.id)
            if not _user_grader:
                try:
                    _info = Jct5UserGradeInfo()
                    _info.user = request.user
                    _info.grade = post_data.get('grade')
                    _info.creat_time = datetime.datetime.now()
                    _info.save()
                except IntegrityError:
                    pass
            else:
                cur_grade = _user_grader[0].grade

        cur_date = time.strftime("%Y%m%d", time.localtime())
        reference_grade = {}
        try:
            sys_cfg = gpub.cc[os.path.join(gpub.BASEDIR_S, 'sysconf', 'sys_config.ini')]
            term_b = sys_cfg['REFERENCE_GRADE'].get('term_b')
            term_a = sys_cfg['REFERENCE_GRADE'].get('term_a')
            data_ret['useOldVersion'] = sys_cfg['EXERCISE_LAYOUT'].get('useOldVersion') == 'TRUE'
            # remindcircle = int(sys_cfg['REFERENCE_GRADE'].get('remindcircle'))
            if term_b[0] <= cur_date[4:] <= term_b[1] and  cur_grade in ['1a','2a','3a','4a','5a','6a'] :
                tmp_grade = stringtools.num_to_char(cur_grade[0])
                #cur_grade = '%sb' % cur_grade[0]
                remind = {'color': '#333333', 'b': False, 'font_size': 14, 'contents': [
                    {'text': u'系统已帮您切换成'},
                    {'text': u'%s年级下学期' % tmp_grade,'color':'#00B9FF'},
                    {'text': u'啦，如有错误可以在左上角手动调整哦！'}
                ]
                          }
                reference_grade.update({"remind":remind , "grade" : '%sb' % cur_grade[0],"deadline": '%s%s' % (cur_date[:4],term_b[1]),'title':u'下学期啦！'})

            elif term_a[0] <=cur_date[4:] <= term_a[1] and  cur_grade in ['1b','2b','3b','4b','5b']:
                tmp_grade = stringtools.num_to_char(int(cur_grade[0])+1)
                #cur_grade = '%sa' % (int(cur_grade[0]) + 1)
                remind = {'color': '#333333', 'b': False, 'font_size': 14, 'contents': [
                    {'text': u'系统已帮您切换成'},
                    {'text': u'%s年级上学期' % tmp_grade, 'color': '#00B9FF'},
                    {'text': u'啦，如有错误可以在左上角手动调整哦！'}
                ]
                          }
                reference_grade.update({"remind": remind, "grade": '%sa' %(int(cur_grade[0]) + 1), "deadline": '%s%s' % (cur_date[:4],term_a[1]),'title':u'升年级啦！'})
        except:
            pass

        data_ret['cur_grade'] = cur_grade
        data_ret['reference_grade'] = reference_grade



    # 初始化classzone数据，全量更新
    # if render['appver'] >= 50000 and request.user.is_authenticated():
    #     send_msg_init_classzone(request.user.id)

    #5.6版本点读页面跳转开关
    data_ret['useLocalWeb'] = False
    response.write(json.write(data_ret))
    return response

@gpub.wglobal()
def sysconfig_pep(request , response , render):

    os_plateform = request.REQUEST.get('os_plateform' , '')
    version_value = ''
    if os_plateform:
        version_value = gpub.redis2.hget('rj_app_update', os_plateform)

    audit_mode = gpub.redis2.hget('rj_app_update', 'audit_mode')
    force_update = gpub.redis2.hget('rj_app_update', 'force_update')
    response.write(json.write({'version'    :  version_value,
                               'audit_mode' :  audit_mode,
                               'force_update': force_update}))
    return response


@gpub.wglobal()
def regtoken(request , response , render):
    """注册TOKEN
    """

    token   = request.REQUEST.get('token' , '')
    uuid    = request.REQUEST.get('uuid' , '')

    if render['appos'] not in ('android' , 'ios') or ( not uuid and not token ) or render['appver'] < 30000:
        response.write('fail')
        return response

    # 根据版本进行不同的处理
    #return (regtoken_equal_or_greate_than_v3 if render['appver'] >= 30000 else regtoken_less_than_v3)(request , response , render)
    # 采用数据库存储uuid
    return regtoken_v5(request , response , render)

@gpub.wglobal()
def testapp(request , response , render):
    """测试APP的接口
    """

    return gpub.render_to_response('app/templates/testapp.html' , response , render)

@gpub.wglobal()
def testcontent(request , response , render):
    """内容创作工具
    """

    return gpub.render_to_response('app/templates/testcontent.html' , response , render)

@gpub.wglobal()
def inner_class(request , response , render):
    """内容创作工具
    """

    return gpub.render_to_response('app/templates/inner_class.html' , response , render)

@gpub.wglobal()
def specialsubjects(request , response , render):
    """内容创作-专题栏目
    """

    return gpub.render_to_response('app/templates/specialsubjects.html' , response , render)

@gpub.wglobal()
def bookupdate(request ,plus, response , render):
    """更新
    """
    vdir = "v/click" if 'click' == plus else "v/menu"
    config_vdir = gpub.cc[os.path.join(gpub.BASEDIR_S , vdir,'config.ini')]
    render["appupdate"] = config_vdir["APPUPDATE"]

    return gpub.render_to_response('app/templates/bookupdate.html' , response , render)

@gpub.wglobal()
def get_douban_isbn(request , response , render):
    isbn = request.REQUEST.get("isbn",None)
    if isbn:
        try:
            ret = urllib2.urlopen('https://api.douban.com/v2/book/isbn/'+isbn, timeout=3)
            return HttpResponse(ret.read(), content_type="application/json")
        except urllib2.URLError as e:
          if hasattr(e, 'code'):
            return HttpResponse(json.write({'error':e.code}), content_type="application/json")
          elif hasattr(e, 'reason'):
            return HttpResponse(json.write({'error':e.reason}), content_type="application/json")

    return HttpResponse(json.write({'error':"parameter error"}), content_type="application/json")


@gpub.wglobal()
def oms_downloadapp(request , response , render):
    """oms下载APP的请求，根据请求的来源自动判断：
    . iPad/iPhone/iPod等转向AppStore地址
    . 安卓在微信模式下，显示下载页面（提示用户用本地浏览器打开）
    . 安卓在非微信模式下，转向应用宝地址
    """
     # APP模式下，只需要显示下载页面
    if render['browser'] in ('app','weixin'):
        return gpub.render_to_response('app/templates/oms_download.html' , response , render)

    # 其他模式下根据平台的不同进行跳转
    if render['platform'] == 'android':
        return HttpResponseRedirect('http://a.app.qq.com/o/simple.jsp?pkgname=com.jinxin.namiboxtool')
    elif render['platform'] in ('ipad' , 'iphone' , 'ipod'):
        return HttpResponseRedirect('https://itunes.apple.com/us/app/na-mi-he-fen-xiu/id1061383184')
    else:
        return gpub.render_to_response('app/templates/oms_download.html' , response , render)


@gpub.wglobal()
def search(request , search_type , response , render):
    """

    :param request:
    :param type:
    :param response:
    :param render:
    :return:
    """
    render['search_key'] = request.REQUEST.get('key','')

    render['search_type'] = search_type
    #绘本搜索，查找d/reading的config.ini文件

    if render['search_key'] :
        if search_type == 'reading':
            render['pt'] = request.REQUEST.get('pt')
            file_list = []
            config_dir = gpub.cc[os.path.join(gpub.BASEDIR_D ,'reading', 'config.ini')]
            files_all = glob.glob(os.path.join(gpub.BASEDIR_D , 'reading' , '*_*'))
            files_all = [os.path.basename(_item) for _item in files_all if os.path.isdir(_item)]
            for file in files_all:
                filename = file.decode('utf8' if sys.platform == 'linux2' else 'gb2312')
                bookid , bookname = filename.split('_' , 1)
                if bookid in config_dir and (
                        render['search_key'] in config_dir[bookid]['NAME'] or render['search_key'] in config_dir[bookid]['SUBTITLE']):
                    file_list.append(file)

            file_list.sort(reverse = True)
            config_vdir = { 'SYSTEM'        :   {   'SECTIONS'  : 'MAIN',
                                                    'TEMPLATE':'cms/templates/extra/v_directory_search.html'
                                                } ,
                                'SECTION_MAIN'  :   {   'ID'        : 'MAIN' ,
                                                        'ITEMS'     : 'MAIN' ,
                                                        'SUPPORT'   : [ 'READ', 'STAR', 'COMMENT'],
                                                    } ,
                                'ITEM_MAIN'     :   {   'TYPE'  :   u'内容' ,
                                                        'PATH'  :  '\n'.join('reading/'+ path for path in file_list[:40]),
                                                    }
                                 }

            return cms.views.standard_vdir_page(request , response , render , config_vdir)

        elif search_type == 'jct3userwork':
            ids =[]
            #查询所有配音的绘本
            config_dir = gpub.cc[os.path.join(gpub.BASEDIR_D ,'reading', 'config.ini')]
            objects = connections[settings.route_db('default')].cursor()
            objects.execute(u"""SELECT relate_id , cid FROM jct3_user_works WHERE TYPE = 'audiobook' AND pubstatus = '上线'""")
            for object in objects:
                if object[0] in config_dir and (
                        render['search_key'] in config_dir[object[0]]['NAME'] or render['search_key'] in config_dir[object[0]]['SUBTITLE']):
                    ids.append(object[1])

            if ids:
                config_vdir = { 'SYSTEM'        :   {   'SECTIONS'  : 'MAIN',
                                                        'TEMPLATE':'cms/templates/extra/v_directory_search.html'
                                                } ,
                                'SECTION_MAIN'  :   {   'ID'        : 'MAIN' ,
                                                        'ITEMS'     : 'MAIN' ,
                                                        'SUPPORT'   : [ 'READ', 'STAR', 'COMMENT','AUDIO'],
                                                    } ,
                                'ITEM_MAIN'     :   {   'TYPE'      :   u'JCT3_USERWORKS' ,
                                                        'SQL_CID'   :  ids[:40]
                                                    }
                                 }
                return cms.views.standard_vdir_page(request , response , render , config_vdir)

    render['sections']  =   [   {   'ID'        :   '' ,
                                'ITEMS'     :   []
                             }
                    ]
    return gpub.render_to_response('cms/templates/extra/v_directory_search.html' , response , render)

@gpub.wglobal()
def contact(request , response , render):
    """联系我们
    """
    return gpub.render_to_response('app/templates/contact.html' , response , render)

@gpub.wglobal()
def reguuid(request , response , render):
    """
    由于ios不开启通知不发送regtoken,则需要自己生成uuid用于分享后的统计
    :param request:
    :param response:
    :param render:
    :return:
    """

    # 废弃该接口，3.0以后期不需要处理
    return response

@gpub.wglobal()
def appupdate(request , response , render):


    return gpub.render_to_response('app/templates/appupdate.html' , response , render)


def  checkSignature(uuid ,  token ,timestamp , sign):
    """
    检验uuid的签名
    :param uuid:
    :param token:
    :param sign:
    :return:
    """
    tmpArr = [uuid , token ,timestamp,settings.UUID_SIGN_KEY]
    if sign == hashlib.sha1(''.join(sorted(tmpArr))).hexdigest():
        return  True
    return  False

@gpub.wglobal()
def business(request , response , render):
    """市场拓展
    """

    return gpub.render_to_response('app/templates/business.html' , response , render)

@gpub.wglobal()
def dis_download(request , response , render):
    """
    分发下载链接
    :param request:
    :param response:
    :param render:
    :return:
    """
    return HttpResponseRedirect('/')
    # return gpub.render_to_response('index.html', response, render)

    # 如果平台是iPad、iPod、iPhone，则是ios，否则默认都是android，不依赖于os参数
    if 'os' in request.REQUEST:
        os_platform = request.REQUEST['os']
    else:
        os_platform = 'ios' if render['platform'] in ('ipad' , 'iphone' , 'ipod') else 'android'

    # 获取友盟上进行推广的渠道号
    channel = request.REQUEST.get('channel')
    if  channel:
        spread_info = gpub.redis2.hget('app_umeng_spread', channel) #从redis里面获取推广信息
        # android推广url|ios推广url|创建时间
        android_url, ios_url, create_time = spread_info.split('|')
        # 跳转至安卓
        if os_platform == 'android' and android_url:
            return HttpResponseRedirect(android_url)
        # 跳转至IOS
        elif os_platform == 'ios' and ios_url:
            return HttpResponseRedirect(ios_url)
        else:
            return HttpResponseRedirect('https://namibox.com/app/ext_download_v2')
    else:#兼容老的试卷渠道推广地址，是不带channel参数的
        # 跳转至安卓
        if os_platform == 'android':
            return HttpResponseRedirect('https://at.umeng.com/m0bSDe')
        # 跳转至IOS
        elif os_platform == 'ios':
            return HttpResponseRedirect('https://at.umeng.com/01vKry')
        else:
            return HttpResponseRedirect('https://namibox.com/app/ext_download_v2')

@gpub.wglobal()
def ext_download(request , response , render):
    return HttpResponseRedirect('/')

@gpub.wglobal()
def ext_download_v2(request , response , render):
    return HttpResponseRedirect('/')

@gpub.wglobal()
def apple_association(request , response , render):
    """
    支持ios微信打开APP
    :param request:
    :param response:
    :param render:
    :return:
    """
    return gpub.render_to_response("apple-app-site-association.json", response , render)

@gpub.wglobal()
def enterprise_download(request, response, render):
    """
        2018.07.19 app企业版下载
    """

    return gpub.render_to_response('app/templates/app_enterprise_download.html', response, render)


@gpub.wglobal()
def appscan(request , response , render):
    """
    APP扫码无法识别时跳转的地址
    :param request:
    :param response:
    :param render:
    :return:
    """
    render['qrcode'] = request.REQUEST.get('qrcode')
    return gpub.render_to_response('app/templates/qrcode_ret.html', response, render)


def check_grade_rule_only(form_data):
    '''
    判端规则中是不是 有且只有年级信息
    :param form_data:  规则json
    :return:
    '''
    if not form_data.get('tag_grade'):
        return False
    for checkbox_name in ['money_sum', 'promising_status', 'angle_status',
                          'click_book', 'milesson', 'vschool', 'member_type']:
        if form_data.get(checkbox_name):
            return False
    return True

def check_apppush_area(one_task, post_data):
    """
    验证app推送地区校验规则
    原因: app推送地区校验规则与广告地区校验规则，数据库机构不一致，导致无法封装到统一的check_in_rule公共接口中
    :return:
    """
    # 验证白名单
    if one_task.white_list:
        white_list = one_task.white_list.split(',')
        if 'province' not in post_data:
            return False
        else:
            if (post_data['province'] not in white_list) and ('city' in post_data and post_data['province'] + '_' + post_data['city'] not in white_list):
                return False

    # 验证黑名单
    if one_task.black_list:
        black_list = one_task.black_list.split(',')
        if 'province' not in post_data:
            return False
        else:
            if (post_data['province'] in black_list) or ('city' in post_data and post_data['province'] +  '_' + post_data['city']  in black_list):
                return False
    return True


def get_user_tag(user_id, user_grade):
    """
    获取用户标签
    原因: app推送地区校验规则与广告地区校验规则，数据库机构不一致，导致无法封装到统一的check_in_rule公共接口中
    :return:
    """
    user_tag_obj = list(Jct5UserGroupTag.objects.filter(user_id=user_id))
    if user_tag_obj:
        user_tag_obj = user_tag_obj[0]
    else:
        user_tag_obj = Jct5UserGroupTag(**{'user_id': user_id, 'money_sum': 0, 'click_book': 0, 'milesson': 0,
                                           'vschool': 0, 'member_type': '', 'promising_status': '', 'angle_status': ''
                                           })
    user_tag_obj.tag_grade = user_grade
    return user_tag_obj


def check_advertise_area(advertise, province_all, province_city):
    """
    验证广告地区校验规则
    原因: app推送地区校验规则与广告地区校验规则，数据库机构不一致，导致无法封装到统一的check_in_rule公共接口中
    :return:
    """
    # 如果有排除地区，则看看是否在排除地区内
    if advertise.exclude_province_city and (province_all in advertise.exclude_province_city or province_city in advertise.exclude_province_city):
        return False
    # 如果有特别定制地区，看是否在匹配地区内
    if advertise.special_province_city and province_all not in advertise.special_province_city and province_city not in advertise.special_province_city:
        return False
    return True

def check_in_rule(user_id, form_data, user_grade):
    '''
    拼接定向分组标签推送sql
    :param form_data:  标签分组规则
    :return:
    '''
    user_tag_obj = Jct5UserGroupTag.objects.filter(user_id=user_id)
    if user_tag_obj:
        user_tag_obj = user_tag_obj[0]
    else:
        user_tag_obj = Jct5UserGroupTag(**{'user_id': user_id, 'money_sum':0, 'click_book': 0, 'milesson':0,
                                            'vschool':0, 'member_type': '',  'promising_status': '', 'angle_status': ''
                                            })
    user_tag_obj.tag_grade = user_grade
    for checkbox_name in ['is_login', 'money_sum', 'tag_grade', 'promising_status', 'angle_status',
                          'click_book', 'milesson', 'vschool', 'member_type']:
        is_fit = False
        checkbox_value = form_data.get(checkbox_name)
        if not checkbox_value:
            continue
        if checkbox_name in ('click_book', 'milesson', 'vschool'):
            list_type_value = 'consume_list_type'
        else:
            list_type_value = checkbox_name + '_list_type'

        if checkbox_name == 'is_login' and checkbox_value:
            login_status = u'已登录' if (user_id and int(user_id) != 0) else u'未登录'
            if form_data.get(list_type_value)[0] == 'black_list' and login_status in checkbox_value:
                is_fit = False
            elif form_data.get(list_type_value)[0] == 'white_list' and (login_status not in checkbox_value):
                is_fit = False
            else:
                is_fit = True

            if not is_fit:
                return False

        if checkbox_name == 'money_sum' and checkbox_value:
            for one_money_sum in checkbox_value:
                if one_money_sum == '0' and user_tag_obj.money_sum == 0:
                    is_fit = True
                    break
                elif one_money_sum == '0_50' and user_tag_obj.money_sum > 0 and user_tag_obj.money_sum < 5000:
                    is_fit = True
                    break
                elif one_money_sum == '50_280' and user_tag_obj.money_sum >= 5000 and user_tag_obj.money_sum <= 28000:
                    is_fit = True
                    break
                elif one_money_sum == '280_400' and user_tag_obj.money_sum > 28000 and user_tag_obj.money_sum < 40000:
                    is_fit = True
                    break
                elif one_money_sum == '400' and user_tag_obj.money_sum >= 40000:
                    is_fit = True
                    break
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'tag_grade' and checkbox_value:
            if user_tag_obj.tag_grade in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'promising_status' and checkbox_value:
            if 'before_apply' in checkbox_value:
                checkbox_value.append('')
            if user_tag_obj.promising_status in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'angle_status' and checkbox_value:
            if user_tag_obj.angle_status in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'click_book' and checkbox_value:
            if user_tag_obj.click_book > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'milesson' and checkbox_value:
            if user_tag_obj.milesson > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False
        if checkbox_name == 'vschool' and checkbox_value:
            if user_tag_obj.vschool > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'member_type' and checkbox_value:
            member_type = eval(user_tag_obj.member_type) if user_tag_obj.member_type else []
            for one_member_type in member_type:
                if one_member_type in checkbox_value:
                    is_fit = True
                    break
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

    return True


def check_in_rule_new(user_id, form_data, user_tag_obj, valid_area_status, publisher_list):
    '''
    拼接定向分组标签推送sql
    :param form_data:  标签分组规则
    :param valid_area_status:  地区校验是否成功  如果form_data中拥有publisher_list_type出版社校验规则，忽略该地区校验规则；如果没有，则该地区校验规则生效
    :param publisher_list: 根据用户请求的省市，返回该省市的出版社列表
    :return:
    '''
    for checkbox_name in ['is_login', 'publisher', 'purchased', 'push', 'money_sum', 'tag_grade', 'promising_status', 'angle_status',
                          'click_book', 'milesson', 'vschool', 'member_type']:
        is_fit = False
        checkbox_value = form_data.get(checkbox_name)
        if (not checkbox_value) and checkbox_name != 'publisher':
            continue
        if checkbox_name in ('click_book', 'milesson', 'vschool'):
            list_type_value = 'consume_list_type'
        else:
            list_type_value = checkbox_name + '_list_type'
        if checkbox_name == 'is_login' and checkbox_value:
            login_status = u'已登录' if (user_id and int(user_id) != 0) else u'未登录'
            if form_data.get(list_type_value)[0] == 'black_list' and login_status in checkbox_value:
                is_fit = False
            elif form_data.get(list_type_value)[0] == 'white_list' and (login_status not in checkbox_value):
                is_fit = False
            else:
                is_fit = True

            if not is_fit:
                return False

        # 点读数据字典
        gpub.log_error.error('=====================1111111111-------------%s'%checkbox_name)
        if checkbox_name == 'publisher' and checkbox_value:
            gpub.log_error.error('=====================1111111111')
            if checkbox_value:  # 有数据字典配置选项，则地区校验不需要
                for request_publisher in checkbox_value:
                    if form_data.get(list_type_value)[0] == 'black_list' and request_publisher in publisher_list:
                        is_fit = False
                        break
                    elif form_data.get(list_type_value)[0] == 'white_list' and request_publisher in publisher_list:
                        is_fit = True
                        break
                    else:
                        is_fit = True
                        break
            else: # 没有出版社数据字典配置选项，则进行地区校验。
                if not valid_area_status:
                    is_fit = False

            if not is_fit:
                return False

        else:
            gpub.log_error.error('==============================')
            if not valid_area_status:
                return False
            else:
                is_fit = True

        # 过滤购买内容
        if checkbox_name == 'purchased' and checkbox_value:
            purchased_status = user_tag_obj.list_product.split(';') if user_tag_obj and user_tag_obj.list_product else []
            gpub.log_error.error('======================purchased===%s=====%s===%s'%(form_data.get(list_type_value)[0], purchased_status, list(set(purchased_status) & set(checkbox_value))))
            if form_data.get(list_type_value)[0] == 'white_list' and not list(set(purchased_status) & set(checkbox_value)):
                gpub.log_error.error('======================purchased========%s' % purchased_status)
                return False
            else:
                is_fit = True

            if form_data.get(list_type_value)[0] == 'black_list' and list(set(purchased_status) & set(checkbox_value)):
                return False
            else:
                is_fit = True

        if checkbox_name == 'money_sum' and checkbox_value:
            for one_money_sum in checkbox_value:
                if one_money_sum == '0' and user_tag_obj.money_sum == 0:
                    is_fit = True
                    break
                elif one_money_sum == '0_50' and user_tag_obj.money_sum > 0 and user_tag_obj.money_sum < 5000:
                    is_fit = True
                    break
                elif one_money_sum == '50_280' and user_tag_obj.money_sum >= 5000 and user_tag_obj.money_sum <= 28000:
                    is_fit = True
                    break
                elif one_money_sum == '280_400' and user_tag_obj.money_sum > 28000 and user_tag_obj.money_sum < 40000:
                    is_fit = True
                    break
                elif one_money_sum == '400' and user_tag_obj.money_sum >= 40000:
                    is_fit = True
                    break
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'tag_grade' and checkbox_value:
            if user_tag_obj.tag_grade in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'promising_status' and checkbox_value:
            if 'before_apply' in checkbox_value:
                checkbox_value.append('')
            if user_tag_obj.promising_status in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'angle_status' and checkbox_value:
            if user_tag_obj.angle_status in checkbox_value:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'click_book' and checkbox_value:
            if user_tag_obj.click_book > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'milesson' and checkbox_value:
            if user_tag_obj.milesson > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False
        if checkbox_name == 'vschool' and checkbox_value:
            if user_tag_obj.vschool > 0:
                is_fit = True
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

        if checkbox_name == 'member_type' and checkbox_value:
            member_type = eval(user_tag_obj.member_type) if user_tag_obj.member_type else []
            for one_member_type in member_type:
                if one_member_type in checkbox_value:
                    is_fit = True
                    break
            if form_data.get(list_type_value)[0] == 'black_list':
                is_fit = not is_fit
            if not is_fit:
                return False

    return True

def regtoken_v5(request , response , render):
    """
    新设备处理
    :param request:
    :param response:
    :param render:
    :return:
    """
    # 3.0一定需要uuid参数
    if not request.REQUEST.get('uuid'):
        response.write('error : request without uuid argument .')
        return response

    appos, appver, user_agent = render['appos'], render['appver'], request.META.get('HTTP_USER_AGENT')
    uuid, token, channel = request.REQUEST['uuid'], request.REQUEST.get('token'), request.REQUEST.get('chn')

    if len(uuid)!=36:
        response.write('error : request wrong uuid argument .')
        return response

    # 3.03后需要校验uuid  sign 为 [uuid,token ,timestamp,key]升序排序sha1加密
    # 在调试模式下并且指定了_delta_参数，则可以忽略签名的校验，_delta_是为了模拟regtoken按天偏移进行留存率开发测试用的，参考下面data_queue的timestamp的字段
    if not (settings.DEBUG and request.REQUEST.get('_delta_')):
        sign = request.REQUEST.get('sign')
        timestamp = request.REQUEST.get('timestamp')
        if not sign or not timestamp or not checkSignature(uuid or '', token or '', timestamp or '', sign):
            response.write('fail')
            return response

        expires = (datetime.datetime.now() + datetime.timedelta(seconds=settings.SESSION_COOKIE_AGE)).strftime(
            "%a, %d-%b-%Y %H:%M:%S GMT")
        response.set_cookie('appuuid', uuid or '', expires=expires, max_age=settings.SESSION_COOKIE_AGE)

    # 判断是否为新设备：从2016年9月红包活动开始，对于新设备的定义发生了变化，所谓新设备定义是自安装起24小时内都是新设备
    # 为此调整了数据保存的策略，在核心键值uuid.[android|ios].v3保存的是该uuid首次创建的时间（之前保存的是版本类型，如ios、android）

    is_new_device = False
    is_new_uuid   = False
    # 对于新设备，默认写入到uuid.[android|ios].v3中的是当前时间，在用户推荐的场景下，还会写入uid信息
    now_ime = int(time.time())

    data_queue = {'timestamp': datetime.datetime.now() if not settings.DEBUG or not request.REQUEST.get(
        '_delta_') else datetime.datetime.now() + datetime.timedelta(days=int(request.REQUEST['_delta_'])),
                  'uuid': uuid,
                  'token': token,
                  'appos': appos,
                  'appver': appver,
                  'user_agent': user_agent,
                  'user_id': request.user.pk,
                  'ipaddress': request.META.get('REMOTE_ADDR')
                  }

    if appos == 'android':
        uuid_sqlinfo_temp = Jct6UuidAndriod.objects.filter(uuid =uuid)
    else:
        uuid_sqlinfo_temp = Jct6UuidIos.objects.filter(uuid = uuid)

    if uuid_sqlinfo_temp:
        uuid_sqlinfo = uuid_sqlinfo_temp[0]
        if now_ime - uuid_sqlinfo.create_time < 86400:
            is_new_device = True

        if uuid_sqlinfo.ret_user_id:
            # 对于已经登记的设备，如果其中包含分享信息，是准备推送到队列中进行渠道留存分析的
            data_queue.update({'name': u'渠道老用户', 'recommend_uid': uuid_sqlinfo.ret_user_id})
            gpub.push_ms_queue_message(settings.CONFIG_MQS, 'ChannelRegtoken', **data_queue)

    else:
        uuid_sqlinfo = None
        is_new_device = True
        is_new_uuid = True
        if  gpub.redis_uuid.setnx('uuid:%s'% uuid,'%s,%s'%(appos,now_ime)):
            gpub.redis_uuid.expire('uuid:%s'% uuid, 86400)

        # 增加 7 天时间戳
        if gpub.redis_uuid.setnx('uuid_7:%s'% uuid,'%s,%s'%(appos,now_ime)):
            gpub.redis_uuid.expire('uuid_7:%s'% uuid, 86400*7)

    # 如果是登录用户，且当前session中没有uuid，则（1）进行用户和会话ID的关联关系（2）进行用户和设备的关联关系（3）在session中记录uuid信息
    if request.user.is_authenticated() and 'device' not in request.session:
        mobile_app, decription_app = jct.namibox.useragent.analyse_user_agent_to_description(
            request.META['HTTP_USER_AGENT'])
        user_agent = mobile_app + '|' + decription_app + '|' + user_agent
        config_user_session(request, request.user, uuid, user_agent)
        config_user_dev(request, request.user, uuid, user_agent, render)
        request.session['device'] = uuid

    regtoken_params = {
        'user_id': request.user.id  if request.user.is_authenticated() else None,
        'user_name': request.user.username  if request.user.is_authenticated() else '',
        'date_time': datetime.datetime.now(),
        'user_agent': request.META.get('HTTP_USER_AGENT'),
        'appos': appos,
        'uuid': uuid,
        'token': token,
        'is_new_device': is_new_device,
        '_delta_': request.REQUEST.get('_delta_') or 0,
        'ipaddress': request.META.get('REMOTE_ADDR'),
        'platform': render['platform'],
        'appver': appver,
        'is_new_uuid': is_new_uuid
    }
    process_new_uuid(regtoken_params)

    try:
        # send_regtoken_msg(request,appos,appver,uuid, render['platform'] ,is_new_device=is_new_device ,token=token,is_new_uuid = is_new_uuid)
        # 登录状态下regtoken触发系统发放优惠券任务
        if request.user.is_authenticated() and appver >= 50000:
            send_triggle_msg(request.user.id, request.user.username, render['appos'],
                             request.META.get('HTTP_USER_AGENT'))
    except:
        # 有异常不影响正常流程
        gpub.log_error.error('regtoken_msg error %s'% uuid )
        gpub.log_error.error(traceback.format_exc())

    try:
        from namibox.tina3.tga import tga_logger
        # 更新或创建用户信息
        tga_logger.user_setOnce(
            distinct_id=uuid,
            account_id=request.user.pk,
            properties=dict(
                create_time=datetime.datetime.fromtimestamp(
                    uuid_sqlinfo.create_time
                ) if (uuid_sqlinfo and uuid_sqlinfo.create_time) else datetime.datetime.now(),
                date_joined=request.user.date_joined if request.user.is_authenticated() else None,
            )
        )
        tga_logger.user_set(
            distinct_id=uuid,
            account_id=request.user.pk,
            properties=dict(
                last_register_token=datetime.datetime.now(),
                last_login=request.user.last_login if request.user.is_authenticated() else None,
                last_appos=appos,
                last_appver=appver,
                last_platform=render['platform']
            )
        )
        # 上报 "启动纳米盒" 事件
        tga_logger.track(
            distinct_id=uuid,
            account_id=request.user.pk,
            event_name='start_app',
            properties={
                "#ip": request.META.get("REMOTE_ADDR"),
                "appos": appos,
                "appver": appver,
                "platform": render['platform']
            }
        )
        # 上报 "新注册设备" 事件
        if is_new_uuid:
            tga_logger.track(
                distinct_id=uuid,
                account_id=request.user.pk,
                event_name='new_device_registered',
                properties={
                    "#ip": request.META.get("REMOTE_ADDR"),
                    "ip": request.META.get("REMOTE_ADDR"),
                    "appos": appos,
                    "appver": appver,
                    "platform": render['platform']
                }
            )
    except:
        # 有异常不影响正常流程
        gpub.log_error.error('regtoken to TA error %s'% uuid )
        gpub.log_error.error(traceback.format_exc())

    response.write('ok')
    return response


def process_new_uuid(regtoken_params):
    """
    新老uuid处理
    :param regtoken_params:
    :param data_queue:
    :return:
    """
    ret_user_id = share_uuid(regtoken_params)

    if regtoken_params['is_new_device']:
        if ret_user_id:
            data_queue = {
                'timestamp': regtoken_params['date_time'] + datetime.timedelta(days=int(regtoken_params['_delta_'])),
                'uuid': regtoken_params['uuid'],
                'token': regtoken_params['token'],
                'appos': regtoken_params['appos'],
                'appver': regtoken_params['appver'],
                'user_agent': regtoken_params['user_agent'],
                'user_id': regtoken_params['user_id'],
                'ipaddress': regtoken_params['ipaddress']
                }
            # 对于新设备，准备推送到队列中进行渠道留存分析的
            data_queue.update({'name': u'渠道新用户', 'recommend_uid': ret_user_id})
            gpub.push_ms_queue_message(settings.CONFIG_MQS, 'ChannelRegtoken', **data_queue)
        # 将数据保存到数据库
        temp_uuid = gpub.redis_uuid.get('uuid:%s'% regtoken_params['uuid'])
        if  temp_uuid  and regtoken_params['is_new_uuid']:
            try:
                if regtoken_params['appos'] == 'android':
                    jct6uuid = Jct6UuidAndriod(uuid = regtoken_params['uuid'],create_time= temp_uuid.split(',')[1],ret_user_id = ret_user_id)
                else:
                    jct6uuid = Jct6UuidIos(uuid=regtoken_params['uuid'], create_time=temp_uuid.split(',')[1],
                                    ret_user_id=ret_user_id)
                jct6uuid.save()
            except IntegrityError:
                pass

def share_uuid(regtoken_params):
    """
    分享用户处理
    :param regtoken_params:
    :return:
    """
    token = regtoken_params['uuid']
    key = '%s_%s' % (regtoken_params['ipaddress'], regtoken_params['appos'])
    val_share = gpub.redis_share.get('APP_%s' % key)
    if not val_share:
        return None

    re_data = dict(re.findall('(?P<key>[^=]+)=(?P<val>[^\|]*)\|?', val_share))
    if not (re_data.get('UID') and re_data.get('IP') == regtoken_params['ipaddress'] and re_data.get('OS') ==
            regtoken_params['appos']):
        logging.getLogger('share').debug('TOKENFAIL'
                     + '|IP=' + regtoken_params['ipaddress']
                     + '|APPOS=' + regtoken_params['appos']
                     + '|TOKEN=' + token
                     + '|UA=' + regtoken_params['user_agent']
                     + '|VAL=' + val_share)

        return None

    user_id = int(re_data['UID'])
    ret_user_id = None
    val_award = None
    value_incr = None

    # 用户之前下载过是老用户，通过分享链接再次下载
    if not regtoken_params['is_new_device']:
        action_type = 'TOKENROLD'
    else:
        if gpub.redis_share.hget('download_with_award', token):
            # 该设备已经被作为新用户奖励过积分，可以直接忽略掉了
            return
        else:
            action_type = 'TOKENOK'
            val_award = 500
            pipe = gpub.redis_share.pipeline()
            pipe.hset('download_with_award', token, user_id)
            pipe.hset('download_with_%s' % user_id, token, time.time())
            pipe.execute()
            # 给积分appver 在5.5及以上才给积分
            if regtoken_params['appver'] >= 50500:
                value_incr = integral_increase(user_id, 'download', value=val_award)
            ret_user_id = user_id

    # 下载信息入库
    log = Jct4SharedownloadLog()
    log.timetamp = datetime.datetime.now()
    log.user_id = user_id
    log.user_agent = regtoken_params['user_agent']

    log.os_platform = regtoken_params['platform']
    log.action = action_type
    log.val_share = val_share
    log.val_award = val_award
    log.value_incr = value_incr
    log.token = token
    log.app_os = regtoken_params['appos']
    log.app_ver = regtoken_params['appver']

    log.user_ip = regtoken_params['ipaddress']
    obj_geo = gpub.query_ip_geocoder_info(log.user_ip, True)
    if obj_geo:
        log.user_provice = obj_geo.province
        log.user_city = obj_geo.city
        log.user_longitude = 0
        log.user_latitude = 0
    log.save()
    return  ret_user_id
