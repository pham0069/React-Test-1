import checkPropTypes from 'check-prop-types';
import { applyMiddleware, createStore } from 'redux';
import RootReducer from './../src/reducers';
import { middlewares } from './../src/createStore';

export const findByTestAttribute  = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProp = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsErr;
}

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(RootReducer, initialState);
}