# React testing with Jest and Enzyme
Follow the SimpleTut tutorial to recreate the code
https://www.youtube.com/watch?v=JQD-ApooNMI&list=PL-Db3tEF6pB8Am-IhCRgyGSxTalkDpUV_&index=5

#### Create react project
 > npx create-react-app my-app
#### Install dependencies using npm or yarn
 -> for mixing css syntax in js file 
node-sass      
-> below are testing framework and utility
jest
enzyme
jest-enzyme
enzyme-adapter-react-16

(can downgrade react from 17 to 16; to be used with enzyme-adapter-react-16)

#### Setup test to use enzyme
Provide Enzyme configuration in 'setupTests.js'
```
Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true
});
```

##### Test file convention
- test file name should follow the naming notations: test.js, spec.js (to be recognized by jest)
- test file can be put in same folder as source or put under a separate folder 'test' with same folder structure as src
- e.g. for header component, give it a folder src/component/header
+ put the content in index.js
+ put the test in header.spec.js

##### Test suite structure

```
describe("Test suite", () => {
it("test case", () => {

});

it ...

});

describe ...
```

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

#### Test if a component is rendered as expected
- use enzyme shallow to render a component for unit test
    ```
    const component = shallow(<Header {...props} />);
    ```
- can print the component content with
    ```
    component.debug()
    ```
- test if expected class name exists:
    ```
    const wrapper = component.find('.headerComponent'); // find className
    expect(wrapper.length).toBe(1);
    ```
- className in src code may change according to css. If we rely on className to test and className changes in the future, then the test code will break. To avoid that, we can insert the test attribute in the component
    ```    
    <img data-test="logoImg" src={Logo} alt="Logo" />
    ```
and find the child based on the test attribute
    ```
    const wrapper = component.find(`[data-test='logoImg']`);
    ```

#### Refactor test utils into a separate file for reuse

- to create test component with shallow
```
const setUp = (props={}) => {
    const component = shallow(<Header {...props} />);
    return component;
};
```

- to find test attribute
```
const findByTestAttribute  = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};
```

####  Test hook
beforeEach() will be executed before running a test case
```
let component;
beforeEach(() => {
    component = setUp();
});    
```

#### Test propType
- Specify the prop type that a component expect
```
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
```
- Passing property of wrong type may lead to failure to render the component
or printing of prop type error in the console

- Testing prop types with checkPropTypes. Required to install module 'check-prop-types'
```
const propsErr = checkPropTypes(Headline.propTypes, expectedProps, 'props', Headline.name);
expect(propsErr).toBeUndefined();
```

#### Use Redux store to enable global state for React app
- create RootReducer in reducers folder
```
export default combineReducers({
    posts
});
```
Each reducer should be a function that accepts the current state and action as arguments. Depending on the dispatched action, reducer will modify the state accordingly
```
export default reducer = (state=[], action) => {
    switch(action.type) {
        case types.GET_POSTS:
            return action.payload;
        default:
            return state;
    }
};
```
  
- create store by specifying the reducer in createStore.js
```
import { createStore } from 'redux';
import RootReducer from './reducers';

export const store = createStore(RootReducer);
```

- provide the store on the app level in index.js
```
import { Provider } from 'react-redux';
import { store } from './createStore';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### UI Components
- header
- headline
- button
- list item

These components should have their unit tests written for basic functionality like
- render without error (using findTestAttribute)
- check prop types

#### Allow async dispatcher for store
- use redux thunk as enhancer
```
export const middlewares = [ReduxThunk];
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
export const store = createStoreWithMiddleware(RootReducer);
```
- use axios to fetch data from url, which would trigger action dispatch to update the store. Require to install module 'axios'.
```
export const fetchPosts = () => async(dispatch) => {
    await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(res => {
        console.log(res.data);
        dispatch({
            type: types.GET_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        //console.log(err);
    });
}
```
- connect redux store to app
```
const mapStateToProps = state => {
  return {
    posts: state.posts
  }
};
const mapDispatchToProps = { fetchPosts };
export default connect(mapStateToProps, mapDispatchToProps)(App);
```


####  Test redux store
- this is kind of integration test as it involves store, dispatcher, reducer (and even axios)
- use moxios as test library to mock fetched data for axios
- in test, install moxios before each test and uninstall it after each test
```
beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

```
- mock the fetched data
```
moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: expectedState
        })
    });
```
- create test store in same way as in dev code
- check if store state is updated as expected after the axios fetched data triggers the action dispatch to the store
```
return store.dispatch(fetchPosts())
        .then(() => {
            const newState = store.getState();
            expect(newState.posts).toBe(expectedState);
        })
```
#### Test connected component 
- App component is connected component to redux store
```
export default connect(mapStateToProps, {fetchPosts})(App);
```
- Pass store prop to App is disabled in redux 6 but re-enabled in redux 7
```
shallow(<App store={store}/>);
```
- The shallow rendering of \<App/\> is wrapped by \<ContextProvider/\>
```
 <ContextProvider value={{...}}>
    <App store={{...}} posts={{...}} fetchPosts={[Function (anonymous)]} />
 </ContextProvider>
 ```

- childAt(0) allows extracting the first child within the parent component, but the child component is simply decoration wrapper, not the actual rendering
```
<App store={{...}} posts={{...}} fetchPosts={[Function (anonymous)]} />
```
- dive() does shallow rendering with the actual data
 ```
 <div className="App" data-test="appComponent">
      <Header />
      <section className="main">
        <Headline header="Posts" desc="Click the button to render posts" tempArr={{...}}>
           
        </Headline>
        <SharedButton buttonText="Get posts" emitEvent={[Function: bound fetch]} />
        <div>
          <ListItem title="Example 1" desc="Some Text 1" />
          <ListItem title="Example 2" desc="Some Text 2" />
          <ListItem title="Example 3" desc="Some Text 3" />
        </div>
      </section>
    </div>
 ```
- thus need to use both functions to get the expected App component for testing 
```
const wrapper = shallow(<App store={store}/>).childAt(0) .dive();
```

####   Simulate event for enzyme component
https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
- to test callback on component like button
    ```
    const button = findByTestAttribute(wrapper, 'buttonComponent');
    button.simulate('click');
    const callback = mockFunc.mock.calls;
    ```
