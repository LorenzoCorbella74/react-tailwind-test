// import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// COMPONENTS
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import Item from './components/Item';
import NotFound from './components/NotFound';

function App () {
  return (
    <Router>
      <div className="sm:container md:mx-auto">
        <Navbar />
        <div className="mt-4">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/item/:id">
              <Item />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
