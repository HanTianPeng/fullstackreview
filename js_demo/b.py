def get_banner_list_by_old_rule(banner, multi_return_data, province, city,is_tag, user_tag, installed_status, render):
    """
    获取banner列表，通过USER_TAG规则
    :param: multi_return_data: dict类型，改参数的结果值最终会被get_banner_list_by_old_rule、get_banner_list_by_new_rule两个规则影响
    multi_return_data参数: 单banner或app4.0以前版本版本，优先年级、白名单、默认
    multi_return_data = {
        "grade_num": 1,
        “white_num”: 4,
        "banner_list": []
    }
    :return:
    """
    login_status = 'yes' if render.get('is_user_login') else 'no'

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
                multi_return_data['grade_num'] = multi_return_data['grade_num'] + 1
                break
        else:  # 有年级过滤选项，但是用户的年级并不满足其中，直接过滤掉该banner
            return False

    # 地区黑名单过滤
    if banner.has_key('FILTER_TYPE') and banner['FILTER_TYPE'] == u'黑名单' and banner['AREA']:
        # 上海市|上海市,北京市|北京市
        try:
            for AREA in banner['AREA'].split(','):
                b_province, b_city = AREA.split('|')
                # 没有地市只要匹配上省份，处理下一个
                if not b_city and province == b_province:
                    raise BlackListException
                # 省市和地市都匹配上，处理下一个
                if city == b_city and province == b_province:
                    raise BlackListException
        except BlackListException:
            return False

    # 地区白名单过滤
    if banner.has_key('FILTER_TYPE') and banner['FILTER_TYPE'] == u'白名单' and banner['AREA']:
        for AREA in banner['AREA'].split(','):
            b_province, b_city = AREA.split('|')
            # 没有地市只要匹配上省份，符合条件
            if not b_city and province == b_province:
                multi_return_data['white_num'] = multi_return_data['white_num'] + 1
                break
            # 省市和地市都匹配上，符合条件
            if city == b_city and province == b_province:
                multi_return_data['white_num'] = multi_return_data['white_num'] + 1
                break
        else:
            return False

    if is_tag:
        # 如果用户未登录，并且设置了标签(无论黑白名单)，都不展示----除去新装机条件、登录状态条件(因为老版本这两个条件)
        if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] in [u'黑名单', u'白名单']:
            if banner['USER_TAG'] and (('login_status' in banner['USER_TAG'].keys()) or (
                    'installed_status' in banner['USER_TAG'].keys())):
                pass
            elif not render.get('is_user_login', 0):
                return False

        # 初始化一些值
        banner_user_tag = banner.get('USER_TAG') or {}
        if not user_tag:
            user_tag = Jct5UserGroupTag()
            user_tag.promising_status = 'before_apply'
            user_tag.money_sum = 0

        # 标签黑名单过滤，只要满足1个条件，就不行
        user_tag.money_sum = user_tag.money_sum or 0  # 避免数据库字段出现null的情况，虽然常规情况下不可能
        if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] == u'黑名单' and user_tag:
            if ((banner['USER_TAG'].get('login_status'))) and (login_status in banner['USER_TAG'].get('login_status')):
                return False
            # 新装机用户过滤
            if (banner['USER_TAG'].get('installed_status')) and (installed_status in banner['USER_TAG'].get('installed_status')):
                return False
            try:
                for one_tag, value in banner_user_tag.items():
                    if one_tag == 'money_sum':
                        for one in value:
                            if len(one) > 1 and one[0] <= user_tag.money_sum < one[1]:
                                raise BlackListException
                            if len(one) == 1 and one[0] <= user_tag.money_sum:
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
                return False

            # 标签白名单过滤, 只要满足1个条件，就行
            if 'FILTER_TYPE_1' in banner and banner['FILTER_TYPE_1'] == u'白名单':  # 百万新苗未申请用户需要特殊处理
                is_continue = True
                if (('login_status' in banner['USER_TAG'].keys()) or ('installed_status' in banner['USER_TAG'].keys())):
                    if (banner['USER_TAG'].get('login_status')) and (login_status not in banner['USER_TAG'].get('login_status')):
                        return False
                    # 新装机用户过滤
                    elif (banner['USER_TAG'].get('installed_status')) and (installed_status not in banner['USER_TAG'].get('installed_status')):
                        return False
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
                    return False

    multi_return_data['banner_list'].append(banner)

    return True