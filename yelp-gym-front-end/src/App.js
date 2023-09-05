import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gyms from './Pages/Gyms';
import Create from './Pages/Create'
import Show from './Pages/Show';
import Edit from './Pages/Edit'
function App() {
  return (
    <Router>
      <div className='d-flex flex-column vh-100'>
      <Navbar/>
      <div className='container mt-5'>
        <Switch>
          <Route path='/gyms/:id/edit'>
            <Edit />
          </Route>
          <Route path="/gyms/:id/view">
            <Show/>
          </Route>
          <Route path='/create'>
            <Create/>
          </Route>   
          <Route path='/gyms'>
            <Gyms/>
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
