import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home';
import Location from './pages/Location';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/truck/:truckId/locations' component={Location} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
