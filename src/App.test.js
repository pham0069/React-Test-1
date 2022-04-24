import App from './App';
import { shallow } from 'enzyme';
import { findByTestAttribute, testStore } from '../utils';
import React from 'react';

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    // react-redux 6.0 introduces breaking change that prevents passing store directly to component like this
    // react-redux 7.0 brings it back
    
    const wrapper = shallow(<App store={store}/>)
                        .childAt(0) // gets the <App> wrapped inside <ContextProvider> due to redux connect()
                        .dive(); // shallow render the child of the current wrapper, instead of decoration of previous parent wrapper
    console.log(wrapper.debug());
    return wrapper;
}

describe('App component', () => {
    let wrapper;
    beforeEach(() => {
        const initialState = {
            posts: [
                {
                    title: 'Example 1',
                    body: 'Some Text 1'
                }, {
                    title: 'Example 2',
                    body: 'Some Text 2'
                },{
                    title: 'Example 3',
                    body: 'Some Text 3'
                }
            ]
        };
        wrapper = setUp(initialState);    
    });

    it('should render without error', () => {
        const component = findByTestAttribute(wrapper, 'appComponent');
        expect(component.length).toBe(1);
    }); 
})