import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttribute, checkProp } from '../../../utils';
import ListItem from './index';

describe('ListItem Component', () => {
    describe('Checking PropTypes', () => {
        it('Should give no error on correct props', () => {
            let expectedProps = {
                title: 'Title',
                desc: 'Description'
            };
            let propErrors = checkProp(ListItem, expectedProps);
            expect(propErrors).toBeUndefined();
        });

        it('Should give error on incorrect props', () => {
            let expectedProps = {
                title: 2,
                desc: 'Description'
            };
            let propErrors = checkProp(ListItem, expectedProps);
            expect(propErrors).toBeDefined();
            console.log(propErrors);
            expect(propErrors).toEqual(
                expect.stringContaining('title'));
        })
    });
});

describe('Component renders', () => {
    let wrapper; 
    beforeEach(() => {
        const props = {
            title: 'Example',
            desc: 'Some text'
        }
        wrapper = shallow(<ListItem {...props}/>);
    });

    it('Should render without error', () => {
        const component = findByTestAttribute(wrapper, 'listItemComponent');
        expect(component.length).toBe(1);
    });

    it('Should render a title', () => {
        const component = findByTestAttribute(wrapper, 'componentTitle');
        expect(component.length).toBe(1);
    });

    it('Should render a desc', () => {
        const component = findByTestAttribute(wrapper, 'componentDesc');
        expect(component.length).toBe(1);
    });

    describe('Should NOT render', () => {
        let wrapper; 
        beforeEach(() => {
            const props = {
                desc: 'Some text'
            }
            wrapper = shallow(<ListItem {...props}/>);
        });

        it('when title is missing', () => {
            const component = findByTestAttribute(wrapper, 'listItemComponent');
            expect(component.length).toBe(0);
        });
    });
});