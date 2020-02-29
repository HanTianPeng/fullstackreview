import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './common/header/index';
import { GlobalStyled } from './style';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <GlobalStyled />
                <Header />
            </Provider>
            
        );
    }
}

export default App;