import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class Detail extends PureComponent {
    render() {
        // console.log('路由参数==>', this.props.match.params.id);  // 动态路由
        // console.log('路由参数==>', this.props.location.search);  // 路由参数

        return (
            <div>Detail~</div>
        );
    }
}

export default withRouter(Detail);