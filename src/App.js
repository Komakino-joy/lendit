
import './App.css';
import backgroundImage from '../src/images/background.svg';
import {lazy, Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { isSignedIn } from "./redux/site-member/site-member.selectors";

import Navigation from './components/navigation/navigation.component';
import PrivateRoute from "./higher-order-components/privateroute/privateroute.hoc";
import Loader from 'react-loader-spinner';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SigninPage = lazy(() => import("./pages/signin/signin.component"));
const RegistrationPage = lazy(() => import("./pages/register/register.component"));



function App({ isSignedIn }) {

  return (
    <div className="App">
      <Navigation></Navigation>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback= {<Loader type="Puff" color="#4178BE" height={70} width={70} className='loader bg' 
                  style={{position: "absolute",top: "20%",left: "50%",margin: "-25px 0 0 -25px", backgroundImage:`url(${backgroundImage})`}} />}>
            <Route exact path = '/signin'>{isSignedIn ? <Redirect to="/home" /> : <SigninPage />}</Route> 
            <Route exact path = '/register' component={RegistrationPage}/>
            <Route exact path = '/' render={() => isSignedIn ? (<Redirect to='/home' />) : (<Redirect to='/signin' />)}/>
            <PrivateRoute  exact path = '/home' component={HomePage}/>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isSignedIn
});

export default connect(mapStateToProps)(App);
