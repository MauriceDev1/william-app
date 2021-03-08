import {Route, Switch} from 'react-router-dom'

import MainLayout from './layouts/mainLayout.js'

import Homepage from './pages/homepage.js'
import Registration from './pages/registration.js'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" render={() => (
          <MainLayout>
            <Homepage/>
          </MainLayout>
        )} exact/>
        <Route path="/registration" render={()=>(
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
