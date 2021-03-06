import Header from './component/header';
import Headline from './component/headline';
import SharedButton from './component/button';
import ListItem from './component/listItem';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';
import './app.scss';
import './App.css';
import { Component } from 'react';

let tempArr = [
  {
      fname: 'John',
      lname: 'Doe',
      email: 'john-doe@email.com',
      age: 23,
      onlineStatus: true,
  }
];
let initialState = {
  hideBtn: false
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
    this.state = {
      ...initialState
    };
  }
  
  fetch() {
    this.props.fetchPosts();
    this.hideButton();
  }

  hideButton() {
    this.setState({
      hideBtn: true
    });
  }

  toggleHideButton(hideBtn) {
    return !hideBtn;
  }

  render () {
    let configButton = {
      buttonText: 'Get posts', 
      emitEvent: this.fetch
    };

    const { posts } = this.props;
    const { hideBtn } = this.state;

    return <div className='App' data-test='appComponent'>
      <Header />
      <section className='main'>
        <Headline header='Posts' desc="Click the button to render posts" tempArr={tempArr} > </Headline>
        {!hideBtn && <SharedButton {...configButton} /> }
        {posts.length > 0 && 
        <div>
          {posts.map((post, index) => {
            const { title, body } = post;
            const configListItem = {
              title,
              desc: body
            };
            return (
              <ListItem {...configListItem} />
            );
          })}
        </div>
        }
      </section>
    </div>
  }
    
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, {fetchPosts})(App);
