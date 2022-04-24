import React from 'react';
import { shallow } from 'enzyme';
import Headline from './index';

import { findByTestAttribute, checkProp } from '../../../utils';

const setUp = (props={}) => {
    const component = shallow(<Headline {...props} />);
    return component; //ShallowWrapper
}

describe('Headline Component', () => {
    describe('Have props', () => {

        let component;

        beforeEach(() => {
            const props = {
                header: 'Test header',
                desc: 'Test desc'
            }
            component = setUp(props);
        });

        it('should render without error', () => {
            const wrapper = findByTestAttribute(component, 'HeadlineComp');
            expect(wrapper.length).toBe(1);
        });
        it('should render a H1', () => {
            const wrapper = findByTestAttribute(component, 'header');
            expect(wrapper.length).toBe(1);
        });
        it('should render a description', () => {
            const wrapper = findByTestAttribute(component, 'desc');
            expect(wrapper.length).toBe(1);
        });
    });

    describe('Have NO props', () => {

        let component;

        beforeEach(() => {
            component = setUp();
        });

        it('should not render', () => {
            const wrapper = findByTestAttribute(component, 'HeadlineComp');
            expect(wrapper.length).toBe(0);
        })
    });

    describe('Checking PropTypes', () => {
        it('Should not throw a warning', () => {
            const expectedProps = {
                header: 'Test Header',
                desc: 'Test Desc',
                tempArr: [
                    {
                        fname: 'Test fname',
                        lname: 'Test lname',
                        email: 'test@email.com',
                        age: 23,
                        onlineStatus: true
                    }
                ]
            };

            const propsErr = checkProp(Headline, expectedProps);
            expect(propsErr).toBeUndefined();

        })
    });

});