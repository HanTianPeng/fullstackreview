def appbanner_filter_v1(_banner_list, render = None, settings = None,  banner_type = 'single', return_ip_info=False, is_producer=True):
    """
    banner过滤（有效时间段、年级、黑名单、白名单）  v1 添加了对用户标签的过滤
    :param _banner_list:
    :param render:
    :param settings:
    :param banner_type:
    :return:
    """
    grade_map = {
        "ye": u"幼儿园",
        "1a": u"一年级",
        "1b": u"一年级",
        "2a": u"二年级",
        "2b": u"二年级",
        "3a": u"三年级",
        "3b": u"三年级",
        "4a": u"四年级",
        "4b": u"四年级",
        "5a": u"五年级",
        "5b": u"五年级",
        "6a": u"六年级",
        "6b": u"六年级",
        "xsc": u"小升初",

    }

    banners_ret = []

    is_area = False
    is_tag = False
    province, city = '', ''
    ip_dict = {
        'detailed': None,
        'debug_user_ip': None,
        'debug_user_ip_geo': 'NOT FOUND'
    }

    installed_status = 'old_user'
    uuid = render.get("UUID", "")
    if uuid and gpub.redis_uuid.exists('uuid_7:%s' % uuid):
        installed_status = 'new_user'
    login_status = 'yes' if render.get('is_user_login') else 'no'
    # 判断是否需要取 用户所在区域or标签 判断
    for _banner in _banner_list:
        if not _banner:
            continue

        # 老banner字典类型
        if isinstance(_banner, types.DictionaryType):
            continue

        for banner in _banner:
            if not banner:
                continue
            # 判断是否需要获取用户地区信息以及用户个人标签信息，避免不必要查询
            if 'FILTER_TYPE' in banner and (banner['FILTER_TYPE'] == u'黑名单' or banner['FILTER_TYPE'] == u'白名单') and banner['AREA']:
                is_area = True
            elif ('RULE' in banner) and (('publisher' in banner['RULE'] and banner['RULE']['publisher']) or ('area' in banner['RULE'] and banner['RULE']['area'])):
                is_area = True

            if 'FILTER_TYPE_1' in banner and (banner['FILTER_TYPE_1'] == u'黑名单' or banner['FILTER_TYPE_1'] == u'白名单') and banner['USER_TAG']:
                is_tag = True
            elif ('RULE' in banner) and (('purchased' in banner['RULE'] and banner['RULE']['purchased']) or ('money' in banner['RULE'] and banner['RULE']['money'])):
                is_tag = True

    # 根据IP取用户区域
    if is_area :
        ipaddress = render['request'].META.get('REMOTE_ADDR' , '')
        if ipaddress.startswith('172.') or ipaddress.startswith('127.'):
            ipaddress   = '116.231.115.171'

        from jct.service.ipaddress import query_ipaddress_administrative
        try:
            location = query_ipaddress_administrative(ipaddress , is_producer = is_producer , log_obj = logging.getLogger('django')).get(ipaddress)
        except:
            location = None

        if location:
            province    =  location.province
            city        =  location.city

            ip_dict['detailed'] = location
            ip_dict['debug_user_ip'] = ipaddress
            ip_dict['debug_user_ip_geo'] = (u'%s_%s_%s_%s' % (location.country, location.city, location.company, location.uni_administrative_id)) \
                    if isinstance(location, Jct5UniIpaddress) else 'NOT FOUND'

    # 从用户标签表读取用户标签信息
    user_tag = None
    if is_tag and render.get('is_user_login'):
        user_tag_set = Jct5UserGroupTag.objects.filter(user_id=render['is_user_login'].id)
        if user_tag_set:
            user_tag = user_tag_set[0]

    # 循环处理
    for _banner in _banner_list:
        if not _banner:
            banners_ret.append(None)
            continue

        # 老banner字典类型，不需要过滤
        if isinstance(_banner, types.DictionaryType):
            banners_ret.append(_banner)
            continue

        banner_list = []
        white_num = 0
        grade_num = 0
        for banner in _banner:
            # banner未开始
            if banner.has_key('VALID_TIME') and banner['VALID_TIME'] and datetime.datetime.strptime(banner['VALID_TIME'],'%Y-%m-%d %H:%M:%S') > datetime.datetime.now():
                continue

            # banner已结束
            if banner.has_key('DEAD_TIME') and banner['DEAD_TIME'] and datetime.datetime.strptime(banner['DEAD_TIME'],'%Y-%m-%d %H:%M:%S') < datetime.datetime.now():
                continue

            # 过滤年级
            if banner.has_key('GRADE') and banner['GRADE']:
                grades = []
                if render and render.get("choice_grade"):
                    grades.append(grade_map.get(render['choice_grade']))

                elif render and render['request'].user.is_authenticated():
                    grades.append(render['request'].user.get_profile().grade)
                else:
                    pass

                for _grade in banner['GRADE'].split(','):
                    if _grade in grades:
                        grade_num = grade_num + 1
                        break
                else:
                    continue

            # 地区黑名单过滤
            if banner.has_key('FILTER_TYPE') and banner['FILTER_TYPE'] == u'黑名单' and banner['AREA'] :
                # 上海市|上海市,北京市|北京市
                try:
                    for AREA in banner['AREA'].split(',') :
                        b_province, b_city = AREA.split('|')
                        # 没有地市只要匹配上省份，处理下一个
                        if not b_city and province == b_province:
                            raise BlackListException
                        # 省市和地市都匹配上，处理下一个
                        if city == b_city and province == b_province:
                            raise BlackListException
                except BlackListException:
                    continue

            # 地区白名单过滤
            if banner.has_key('FILTER_TYPE') and banner['FILTER_TYPE'] == u'白名单' and banner['AREA'] :
                for AREA in banner['AREA'].split(',') :
                    b_province, b_city = AREA.split('|')
                    # 没有地市只要匹配上省份，符合条件
                    if not b_city and province == b_province:
                        white_num = white_num + 1
                        break
                    # 省市和地市都匹配上，符合条件
                    if city == b_city and province == b_province:
                        white_num = white_num + 1
                        break
                else:
                    continue
            
            if is_tag:
                # 如果用户未登录，并且设置了标签(无论黑白名单)，都不展示
                if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] in [u'黑名单', u'白名单']:
                    if banner['USER_TAG'] and (('login_status' in banner['USER_TAG'].keys()) or ('installed_status' in banner['USER_TAG'].keys())):
                        pass
                    elif not render.get('is_user_login', 0):
                        continue

                banner_user_tag = banner.get('USER_TAG') or {}
                if not user_tag:
                    user_tag = Jct5UserGroupTag()
                    user_tag.promising_status = 'before_apply'
                    user_tag.money_sum = 0

                # 标签黑名单过滤，只要满足1个条件，就不行
                user_tag.money_sum = user_tag.money_sum or 0   # 避免数据库字段出现null的情况，虽然常规情况下不可能
                if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] == u'黑名单' and user_tag:
                    if ((banner['USER_TAG'].get('login_status'))) and (login_status in banner['USER_TAG'].get('login_status')):
                        continue
                    # 新装机用户过滤
                    if (banner['USER_TAG'].get('installed_status')) and (installed_status in banner['USER_TAG'].get('installed_status')):
                        continue
                    try:
                        for one_tag, value in banner_user_tag.items():
                            if one_tag == 'money_sum':
                                for one in value:
                                    if len(one) > 1 and one[0] <= user_tag.money_sum < one[1]:
                                        raise BlackListException
                                    if len(one) == 1 and  one[0] <= user_tag.money_sum:
                                        raise BlackListException
                            if one_tag in ['click_book', 'milesson', 'vschool']:
                                if value and getattr(user_tag, one_tag):
                                    raise BlackListException
                            if one_tag == 'member_type' and user_tag.member_type:
                                u_member_types = json_py26.loads(user_tag.member_type)
                                for one_type in u_member_types:
                                    if one_type in value:
                                        raise BlackListException
                            if one_tag == 'promising_status':
                                u_promising_status = user_tag.promising_status or 'before_apply'
                                if u_promising_status in value:
                                    raise BlackListException
                            if one_tag == 'angle_status' and user_tag.angle_status:
                                u_angle_status = user_tag.angle_status
                                if u_angle_status in value:
                                    raise BlackListException
                    except BlackListException:
                        continue

                # 标签白名单过滤, 只要满足1个条件，就行
                if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] == u'白名单':  # 百万新苗未申请用户需要特殊处理
                    is_continue = True
                    if (('login_status' in banner['USER_TAG'].keys()) or ('installed_status' in banner['USER_TAG'].keys())):
                        if (banner['USER_TAG'].get('login_status')) and (login_status not in banner['USER_TAG'].get('login_status')):
                            continue
                        # 新装机用户过滤
                        elif (banner['USER_TAG'].get('installed_status')) and (installed_status not in banner['USER_TAG'].get('installed_status')):
                            continue
                        else:
                            is_continue = False
                    for one_tag, value in banner_user_tag.items():
                        try:
                            if one_tag == 'money_sum':
                                for one in value:
                                    if len(one) > 1 and one[0] <= user_tag.money_sum < one[1]:
                                        raise WhiteListInclude
                                    if len(one) == 1 and one[0] <= user_tag.money_sum:
                                        raise WhiteListInclude
                            if one_tag in ['click_book', 'milesson', 'vschool']:
                                if value and getattr(user_tag, one_tag):
                                    raise WhiteListInclude
                            if one_tag == 'member_type' and user_tag.member_type:
                                u_member_types = json_py26.loads(user_tag.member_type)
                                for one_type in u_member_types:
                                    if one_type in value:
                                        raise WhiteListInclude
                            if one_tag == 'promising_status':
                                u_promising_status = user_tag.promising_status or 'before_apply'
                                if u_promising_status in value:
                                    raise WhiteListInclude
                            if one_tag == 'angle_status' and user_tag.angle_status:
                                u_angle_status = user_tag.angle_status
                                if u_angle_status in value:
                                    raise WhiteListInclude
                        except WhiteListInclude:
                            is_continue = False
                            break
                    if is_continue:
                        continue

            banner_list.append(banner)
            # 最多取5张banner
            if len(banner_list) >= 5:
                continue
        banner_list = sorted(banner_list, key=lambda t: t['INDEX']) if len(banner_list) > 1 else banner_list

        # 单banner或app4.0以前版本版本，优先年级、白名单、默认
        if len(banner_list) >= 1 and banner_type == 'single' :
            if grade_num >= 1:
                banner_list = [banner for banner in banner_list if banner['GRADE']][0]
            elif white_num >= 1:
                banner_list = [banner for banner in banner_list if banner['FILTER_TYPE'] == u'白名单'][0]
            else:
                banner_list = banner_list[0]

        banner_list = banner_list[:5] if isinstance(banner_list , types.ListType) and len(banner_list) >=5 else banner_list
        if banner_list :
            banners_ret.append(banner_list)
        else:
            banners_ret.append(None)
    if return_ip_info:
        return (banners_ret, ip_dict, is_area)
    else:
        return banners_ret