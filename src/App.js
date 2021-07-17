import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getLoading, setIsloading } from './features/loadingSlice';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import Header from './Header';
import Home from './home/Home';
import Loading from './Loading';
import Login from './Login';
import MyNetwork from './my_network/MyNetwork';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { setIndicator } from './features/indicatorSlice';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const loading = useSelector(getLoading)

  useEffect(() => {
    dispatch(setIsloading(true));
    auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
        dispatch(setIndicator("Home"));
      }
      else {
        dispatch(logout());
      }
      dispatch(setIsloading(false));
    })
  }, [dispatch])

  return (
    <div className="app">
      <Router>
      <Header/>

      {loading ? <Loading /> : !user ? (
        <Login/>
      ) : (
        <div className="app__body">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home}/>
            <Route path="/mynetwork" component={MyNetwork}/>
          </Switch>
        </div>
      )}
      </Router>
    </div>  
  );
}

export default App;
