import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import PickApple from './components/pickApple.jsx';
import AppleItem from './components/appleItem.jsx';
import indexCss from '../../css/index.css';

const store = createStore(reducer, applyMiddleware(thunk));
render(
    <Provider store={store}>
    <div>
        <PickApple>
            <AppleItem key="0"></AppleItem>
            {/* <div key={1}>123</div>
            <div key={2}>234</div> */}
        </PickApple>
    </div>
    </Provider>,
    document.getElementById('app')
)