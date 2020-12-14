import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignUpPage from './components/pages/SignUpPage';
import SpinPage from './components/pages/SpinPage';
import NotFoundPage from './components/pages/404Page';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={SignUpPage} />
          <Route path='/spin/:sNum' exact component={SpinPage} />
          <Route path='/404' exact component={NotFoundPage} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </>
  );
}

export default App;
