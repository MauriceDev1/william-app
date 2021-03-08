
import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { auth, handelUserProfile } from './firebase/utils.js'

// layouts

import MainLayout from './layouts/mainLayout.js'

//pages

import Homepage from './pages/homepage.js'
import Registration from './pages/registration.js'
import Login from './pages/login'

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListner = null;

  componentDidMount(){
    this.authListner = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth) {
        const userRef = await handelUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnmount(){
    this.authListner();
  }

  render(){
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => (
            <MainLayout currentUser={currentUser}>
              <Homepage/>
            </MainLayout>
          )} exact/>
          <Route path="/registration" 
          render={()=> currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login" 
            render={()=> currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
        </Switch>
      </div>
    );
  }
}

export default App;
