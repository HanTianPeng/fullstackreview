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
        if checkbox_name == 'publisher' and checkbox_value:
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
            if not valid_area_status:
                return False
            else:
                is_fit = True

        # 过滤购买内容
        if checkbox_name == 'purchased' and checkbox_value:
            purchased_status = user_tag_obj.list_product.split(';') if user_tag_obj and user_tag_obj.list_product else []
            if form_data.get(list_type_value)[0] == 'white_list' and not list(set(purchased_status) & set(checkbox_value)):
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