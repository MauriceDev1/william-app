
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom'
import { auth, handelUserProfile } from './firebase/utils.js'
import { setCurrentUser } from './redux/User/user.actions'

// layouts

import MainLayout from './layouts/mainLayout.js'

//pages

import Homepage from './pages/homepage.js'
import Registration from './pages/registration.js'
import Login from './pages/login'
import Recovery from './pages/recovery.js'


class App extends Component {
  authListner = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    this.authListner = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await handelUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
              ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.authListner();
  }

  render(){
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => (
            <MainLayout>
              <Homepage/>
            </MainLayout>
          )} exact/>
          <Route path="/registration" 
          render={()=> currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login" 
            render={()=> currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
            <Route path="/recovery" 
              render={()=> (
                <MainLayout>
                  <Recovery />
                </MainLayout>
              )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
