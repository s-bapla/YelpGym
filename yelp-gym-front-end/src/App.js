import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gyms from './Pages/Gyms';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column vh-100'>
      <Navbar/>
      <div className='container mt-5'>
        <Switch> 
          <Route path='/gyms'>
            <Gyms/>
          </Route>
          <Route path='/'>
            <h1>Home</h1>
          </Route>   
          <Route path='/'>
            <h1>Home</h1>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
