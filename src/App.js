
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { checkUserSession } from './redux/User/user.actions'

//hoc
import WithAuth from './hoc/withAuth'

// layouts

import MainLayout from './layouts/mainLayout.js'

//pages

import Homepage from './pages/homepage.js'
import Registration from './pages/registration.js'
import Login from './pages/login'
import Recovery from './pages/recovery.js'
import Dashboard from './pages/dashboard.js'


const App = props => {
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
 
  }, []);


    return (
      <div className="App">
        <Switch>
          <Route path="/" render={() => (
            <MainLayout>
              <Homepage/>
            </MainLayout>
          )} exact/>
          <Route path="/registration" render={()=> (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login" render={()=> (
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
              <Route path="/dashboard" 
                render={()=> (
                  <WithAuth>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </WithAuth>
                )} />
        </Switch>
      </div>
    );
  
}

export default App;
