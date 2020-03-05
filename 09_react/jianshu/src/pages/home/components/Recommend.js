import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    RecommendWrapper,
    RecommendItem
} from '../style';

class Recommend extends Component {
    render() {
        const { recommendList } = this.props;
        return (
            <RecommendWrapper>
                {
                    recommendList.map((item, index, arr) => (
                        <RecommendItem key={"推荐"+item.get("id")} imgUrl={item.get("imgUrl")}></RecommendItem>
                    ))
                }
                
            </RecommendWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    recommendList: state.getIn(["home", "recommendList"])
});

export default connect(mapStateToProps)(Recommend);