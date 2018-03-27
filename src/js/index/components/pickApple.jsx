import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/appleAction';

class PickApple extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        const obj = Object.assign({}, {name: "liudong"})
        var curChildren = React.Children.map(this.props.children, function(children) {
            if (children.type !== 'div') {
                return React.cloneElement(children, {
                    //把父组件的props.name赋值给每个子组件
                    name: '刘东'
                  });
            }
            return children;
        })
        // var curChildren = this.props.children.map(function(children) {
        //     if (children.type !== 'div') {
        //         return React.cloneElement(children, {
        //             //把父组件的props.name赋值给每个子组件
        //             name: '刘东'
        //           });
        //     }
        //     return children;
        // })
        return (
            <div>
                <button onClick={this.props.actions.reduce}>-</button>
                <p style={{display: 'inline-block'}} onClick={this.change}>{this.props.state.count}</p>
                <button onClick={this.props.actions.sum}>+</button>
                {curChildren}
            </div>
        )
    }

    componentDidMount() { 
        document.body.addEventListener('click', e => {
            console.log('document');
        });
    }
}

const mapStateToProps = state => ({
    state: state.appleCount
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PickApple);
