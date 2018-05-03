import React from 'react';
import HocPreventUpdate from '../../../devtool/HocPreventUpdate'
const HocItem = (WrapCompoent) =>             //相当于一个高阶组件
    class extends React.Component {
        render() {
            return <WrapCompoent age={23} {...this.props}/>
        }
    }
@HocItem
@HocPreventUpdate         //可以再子组件这一层，控制自己是否需要根据父组件渲染而渲染；
export default class AppleItem extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        debugger;
        return (
            <div>
                年龄:{this.props.age} &nbsp;&nbsp;
                姓名:{this.props.name}
                <a href="https://github.com/morepowerful/yej" target="_blank"><img src="https://scdn2.ycosystem.com/liudong.png" /></a>
                <h2 onClick={this.props.onUnUpdate()}>yej快速构建react项目仓库地址(点击<a href="https://github.com/morepowerful/yej" target="_blank">这里</a>)</h2>
            </div>
        )
    }
}

// export default HocItem(AppleItem);

