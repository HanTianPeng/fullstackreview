import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    ListItem,
    ListInfo,
    LoadMore
} from '../style';
import * as actionCreators from '../store/actionCreators';


class List extends PureComponent {
    render() {
        const { articleList, articlePage, getMoreList, } = this.props;
        return (
            <div>
                {  
                    // 箭头函数return一个字符串,无逻辑代码可以直接一个()搞定
                    articleList.map((item, index, arr) => (
                            <Link key={"文章"+index} to="/detail">
                                <ListItem>
                                    <img className="pic" src={item.get("imgUrl")} alt="400" />
                                    <ListInfo>
                                        <h3 className="title">{item.get("title")}</h3>
                                        <p className="desc">{item.get("content")}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>
                        )
                    )
                }
                <LoadMore onClick={() => {getMoreList(articlePage)}}>查看更多</LoadMore>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(["home", "articleList"]),
    articlePage: state.getIn(["home", "articlePage"])
});

const mapDispatchToProps = (Dispatch) => ({
    getMoreList(currentArticlePage){
        Dispatch(actionCreators.getMoreList(currentArticlePage + 1));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);