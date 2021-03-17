import React, {Component} from 'react';
import {Route, Switch, Link, Router} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import MapPage from './MapPage/MapPage';
import NewBathroom from './NewBathroom/NewBathroom';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';
import NavRoutes from './NavRoutes/NaveRoutes';
import {bathrooms} from './bathrooms-helpers';

class App extends Component {
  state= {
    bathrooms: bathrooms,
    tempLat: 0,
    tempLng: 0,
  }

  handleNewBathroom(newLat, newLng) {
    let tempLat= newLat
    let tempLng= newLng

    this.setState({
      tempLat: tempLat,
      tempLng: tempLng,
    })
  }
 

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
    // const value = {

    // }
    return(
      <>
      <NavRoutes />
      <Switch>
          <Route  
            exact
            path='/'
            component={LandingPage}
          />
          <Route 
            path='/map' 
            component={() => <MapPage bathrooms={this.state.bathrooms} handleNewBathroom={this.handleNewBathroom} />} 
          />
          <Route 
            path='/new-bathroom' 
            component={() => <NewBathroom tempLat={this.state.tempLat} tempLng={this.state.tempLng}/> } 
          />

          <Route path='/sign-in' component={SignIn} />
          <Route path='/register' component={Register} />
      </Switch>
      </>
    )
  }
  render(){
    console.log('this.state.bathrooms', this.state.bathrooms)
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