import React, {Component} from 'react';
import {Route, Switch, Link, Router} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import MapPage from './MapPage/MapPage';
import NewBathroom from './NewBathroom/NewBathroom';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';
import NavRoutes from './NavRoutes/NaveRoutes';

class App extends Component {

  // RenderNavRoutes(){
  //   return(
  //     <>
  //       <NavRoutes />

  //         {/* <Switch>
  //         <Route  
  //           exact
  //           path='/'
  //           component={LandingPage}
  //         />
  //         <Route path='/map' component={MapPage} />
  //         <Route path='/new-bathroom' component={NewBathroom} />
  //         <Route path='/sign-in' component={SignIn} />
  //         <Route path='/register' component={Register} />
  //         </Switch> */}
  //     </>
  //   );
  // }

  RenderMainRoutes() {
    return(
      <>
      <NavRoutes />
      <Switch>
          <Route  
            exact
            path='/'
            component={LandingPage}
          />
          <Route path='/map' component={MapPage} />
          <Route path='/new-bathroom' component={NewBathroom} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/register' component={Register} />
      </Switch>
      </>
    )
  }
  render(){
    return (
      <div className='App'>
        <header className='App_header'>
          {/* {this.RenderNavRoutes()} */}
          {/* <Link to='/'> P NYC </Link> */}
        </header>
        <main className='App_main'>
          {this.RenderMainRoutes()}
        </main>
      </div>
    );
  }
}

export default App;