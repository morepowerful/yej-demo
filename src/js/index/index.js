import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import PickApple from './components/pickApple.jsx';
import AppleItem from './components/appleItem.jsx';
import indexCss from '../../css/index.css';
import DevTools from '../../devtool/redux-devtool'

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(thunk),
    //必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
  )
const store = createStore(reducer, enhancer);
render(
    <Provider store={store}>
    <div>
        <PickApple>
            <AppleItem key="0"></AppleItem>
            {/* <div key={1}>123</div>
            <div key={2}>234</div> */}
        </PickApple>
        <DevTools />
    </div>
    </Provider>,
    document.getElementById('app')
)

console.log("process.env.NODE_ENV 的值是(index.js)："+ process.env.NODE_ENV)
console.log('devport:',devport)
