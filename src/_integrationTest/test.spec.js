import moxios from 'moxios';
import { testStore } from '../../utils';
import { fetchPosts } from '../actions';

describe('fetchPosts action', () => {
    beforeEach(() => {
        // install mock adaptor for axios so it wont go to the actual url and fetch data
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Store is updated correctly', () => {
        const expectedState = [{
            title: 'Example 1',
            body: 'Some Text 1'
        }, {
            title: 'Example 2',
            body: 'Some Text 2'
        },{
            title: 'Example 3',
            body: 'Some Text 3'
        }];

        const store = testStore();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            })
        });

        return store.dispatch(fetchPosts())
        .then(() => {
            const newState = store.getState();
            expect(newState.posts).toBe(expectedState);
        })
    });

    

    
});