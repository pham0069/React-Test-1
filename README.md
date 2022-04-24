https://www.youtube.com/watch?v=JQD-ApooNMI&list=PL-Db3tEF6pB8Am-IhCRgyGSxTalkDpUV_&index=5

1. npx create-react-app my-app
2. npm install 
node-sass       -> for mixing css syntax in js file
                -> below are testing framework and utility
jest
enzyme
jest-enzyme
enzyme-adapter-react-16

(can downgrade react from 17 to 16; to be used with enzyme-adapter-react-16)

3. create setupTests.js and provide Enzyme configuration
Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});

4. Test file should follow the name conventions: test.js, spec.js
Can be put in same folder as source or put under a separate folder 'test' with same folder structure as src

5. Create src/component/header
- Put the content in index.js
- Put the test in header.spec.js

6. Enzyme test suite structure

////////
describe("Test suite", () => {
    it("test case", () => {

    });

    it ...

});

describe ...
////////

describe() function takes 2 args:
- string: specify test suite
- function: the test function to be implemented
typically contains all the test cases under the suite

it() function takes 2 args:
- string: specify test case
- function: the test case to be implemented
typically test 1 possible case that could happen to check if it succeeds as expected

There could be multiple it() and describe() declaration in the test files
which are corresponding to multiple test suites and cases for a component

7. Test if a component is rendered as expected
- use enzyme shallow to render a component for unit test
    /////////
    const component = shallow(<Header {...props} />);
    /////////
- can print the component content with
    /////////
    component.debug()
    /////////
- test if expected class name exists:
    /////////
    const wrapper = component.find('.headerComponent');
    expect(wrapper.length).toBe(1);
    ////////
- className in src code may change, if that changes then the test code based on className also need change
to avoid that, we can insert the test attribute in the component
    /////////    
    <img data-test="logoImg" src={Logo} alt="Logo" />
    /////////
and find the child based on the test attribute
    /////////
    const wrapper = component.find(`[data-test='logoImg']`);
    /////////

8. Refactor the code 

- to create test component, to reuse among test suites
const setUp = (props={}) => {
    const component = shallow(<Header {...props} />);
    return component;
};

- to find test attribute
    /////////
    const findByTestAttribute  = (component, attr) => {
        const wrapper = component.find(`[data-test='${attr}']`);
        return wrapper;
    };
    /////////

9. Add the hook to the test suite, which will be executed before running a test case
        let component;
        beforeEach(() => {
            component = setUp();
        });    

10. Specify the prop type that a component expect
Headline.propTypes = {
    header: PropTypes.string,
    desc: PropTypes.string,
    tempArr: PropTypes.arrayOf(PropTypes.shape(
        {
            fname: PropTypes.string,
            lname: PropTypes.string,
            email: PropTypes.string,
            age: PropTypes.number,
            onlineStatus: PropTypes.bool,
        }
    ))
};

Passing property of wrong type may lead to failure to render the component
or printing of prop type error in the console

11. Testing prop types with checkPropTypes
    const propsErr = checkPropTypes(Headline.propTypes, expectedProps, 'props', Headline.name);
    expect(propsErr).toBeUndefined();

12. Create global state with Redux store
- create RootReducer in reducers folder
- create createStore.js

////////
import { createStore } from 'redux';
import RootReducer from './reducers';

export const store = createStore(RootReducer);
/////////

- provide the store on the app level in index.js

/////////
import { Provider } from 'react-redux';
import { store } from './createStore';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/////////

13.  Create button component with properties of text and a function to handle click
- create test button.spec.js
which test prop types and correct rendering

14. Create list item componet to hold the posts
- write test
- 
15. - Connect redux store to app
- add shared button to the page
- use axios to fetch data from url

16. Integration test
- moxios as test library to mock fetched data for axios
- 