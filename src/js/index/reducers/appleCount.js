import { fromJS } from 'immutable';
const initState = {
    count: 9
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'ADD_COUNT':
            const newState = {
                count: state.count + 1,
            }
            return newState;
        case 'reduce_COUNT':
            // return fromJS(state).set('count', state.count--).toJS();
            const newReduceState = {
                count: state.count - 1
            }
            return newReduceState;
        default:
            return state;
    }
}