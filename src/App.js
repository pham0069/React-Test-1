import Header from './component/header';
import Headline from './component/headline';
import './app.scss';
import './App.css';

let tempArr = [
  {
      fname: 'John',
      lname: 'Doe',
      email: 'john-doe@email.com',
      age: 23,
      onlineStatus: true,
  }
];

function App() {
  return (
    <div className='App'>
      <Header />
      <section className='main'>
        <Headline header='Posts' desc="Click the button to render posts" tempArr={tempArr} > </Headline>
      </section>
    </div>
  );
}

export default App;
