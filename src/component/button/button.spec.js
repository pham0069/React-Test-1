import React from 'react';
import { shallow } from 'enzyme';
import { checkProp, findByTestAttribute } from './../../../utils';
import SharedButton from './index';

describe('SharedButton Component', () => {

    describe('Checking PropTyeps', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                buttonText: 'Example Button Text',
                emitEvent: () => {

                }
            };
            const propsError = checkProp(SharedButton, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });

    describe('Renders', () => {
        let wrapper;

        beforeEach(() => {
            let props = {
                buttonText: 'abc',
                emitEvent: () => {
                }
            };
            wrapper = shallow(<SharedButton {...props} /> )
        })

        it('Should render a button', () => {
            const button = findByTestAttribute(wrapper, 'buttonComponent');
            expect(button.length).toBe(1);
        })
    });
});