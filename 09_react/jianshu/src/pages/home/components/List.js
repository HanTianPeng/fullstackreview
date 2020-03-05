import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ListItem,
    ListInfo
} from '../style';


class List extends Component {
    render() {
        const { articleList, } = this.props;
        return (
            <div>
                {  
                    // 箭头函数return一个字符串,无逻辑代码可以直接一个()搞定
                    articleList.map((item, index, arr) => (
                            <ListItem key={"文章"+item.get("id")}>
                                <img className="pic" src={item.get("imgUrl")} alt="400" />
                                <ListInfo>
                                    <h3 className="title">{item.get("title")}</h3>
                                    <p className="desc">{item.get("content")}</p>
                                </ListInfo>
                            </ListItem>
                        )
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(["home", "articleList"])
});

export default connect(mapStateToProps, null)(List);