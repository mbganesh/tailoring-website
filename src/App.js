import React from 'react'
import { Route , BrowserRouter as Router , Switch } from 'react-router-dom'
import TempPage from './Components/TempPage'
import CustomerCRUD from './Components/CustomerCRUD';
import CustomerDetails from './Components/CustomerDetails';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/admin-panel" exact component={TempPage}/>
          <Route path="/" exact component={TempPage}/>
          <Route path="/customer" component={CustomerCRUD}/>
          <Route path="/customer-details" component={CustomerDetails}/>
        </Switch>
    </Router>
  )
}

export default App
