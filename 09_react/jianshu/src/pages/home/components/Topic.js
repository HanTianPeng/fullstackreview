import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    TopicWrapper,
    TopicItem
} from '../style';


class Topic extends Component {
    render() {
        return (
            <TopicWrapper>
                {
                    this.props.topicList.map((item, index, arr) => {
                        return (
                            <TopicItem key={item.get("name")+item.get("id")}>
                                <img className="topic-pic" src={item.get("imgUrl")} alt="200" />
                                {item.get("name")}
                            </TopicItem>
                        )
                    })
                }
            </TopicWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    topicList: state.getIn(["home", "topicList"])
});

export default connect(mapStateToProps, null)(Topic);