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