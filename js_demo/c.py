if checkbox_name == 'publisher' and checkbox_value:
if checkbox_value:  # 有数据字典配置选项，则地区校验不需要
    if province and city:
        publisher_dbs = list(Jct4BookREecRateLast.objects.filter(province=province, city=city, is_active=1).values_list('publisher', 'book_subtitle'))
    elif province:
        publisher_dbs = list(Jct4BookREecRateLast.objects.filter(province=province, is_active=1).values_list('publisher', 'book_subtitle'))
    elif city:
        publisher_dbs = list(Jct4BookREecRateLast.objects.filter(city=city, is_active=1).values_list('publisher', 'book_subtitle'))
    else:
        publisher_dbs = []
    publisher_list = []
    for publisher, book_subtitle in publisher_dbs:
        format_publisher = publisher + '_'
        format_publisher_subtitle = publisher + '_' + book_subtitle
        if format_publisher not in publisher_list:
            publisher_list.append(format_publisher)
        if format_publisher_subtitle not in publisher_list:
            publisher_list.append(format_publisher_subtitle)
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