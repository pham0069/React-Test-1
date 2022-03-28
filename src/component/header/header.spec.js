import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';
import { findByTestAttribute } from '../../../utils';

const setUp = (props={}) => {
    const component = shallow(<Header {...props} />);
    return component;
};



describe('Header Component', () => {
    
    let component;

    // run before each test
    beforeEach(() => {
        component = setUp();
    });

    it('It should render without errors', () => {
        /**
         * Print the component debug
         * 
            <header className="headerComponent">
            <div className="wrap">
                <div className="logo">
                <img className="logoImg" src="logo.png" alt="Logo" />
                </div>
            </div>
            </header>
         */
        console.log(component.debug());
        //search for className
        const wrapper = component.find('.headerComponent');
        expect(wrapper.length).toBe(1);
    });

    it('It should render a logo', () => {
        //search for existence
        const wrapper = findByTestAttribute(component, 'logoImg');
        expect(wrapper.length).toBe(1);
    });
})
