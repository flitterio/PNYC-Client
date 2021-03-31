import React, {Component} from 'react';
import {Route, Switch, Link, Router} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import MapPage from './MapPage/MapPage';
import NewBathroom from './NewBathroom/NewBathroom';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';
import NavRoutes from './NavRoutes/NavRoutes';
import {bathrooms} from './bathrooms-helpers';
import CommentForm from './CommentForm/CommentForm'
import BathroomInfo from './BathroomInfo/BathroomInfo';
import PrivateRoute from './Utils/PrivateRoute';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';
import config from './config';
// import ApiContext from './ApiContext';

class App extends Component {
  state= {
    bathrooms: [],
    comments: [],
    user: [],
    tempLat: 0,
    tempLng: 0,
    error: null,
  }

  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/bathrooms`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })

    .then(res => {
        if(!res.ok) {
        return res.json().then(error => Promise.reject(error))
        }
        return res.json();
    })
    .then(bathrooms => {
        this.setState(
            {bathrooms: bathrooms}
        )
        console.log('bathrooms', bathrooms)
    })
    .catch(error => {
        console.error(error)
        this.setState({error})
    })
        
  }



  handleNewBathroom = (newLat, newLng)=> {
    this.setState({
      tempLat: newLat,
      tempLng: newLng,
    })
  }
 
  handleAddBathroom = (newBathroom) => {
    this.setState({
      bathrooms: [...this.state.bathrooms, newBathroom]
    })
  }

  handleAddComment = (newComment) => {
    this.setState({
      ...this.state.comments,
      newComment
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
          <PublicOnlyRoute 
              path='/sign-in' 
              component={SignIn} 
          />
          <PublicOnlyRoute 
              path='/register' 
              component={Register} 
              />
          <PrivateRoute 
            path='/new-bathroom' 
            component={() => <NewBathroom tempLat={this.state.tempLat} tempLng={this.state.tempLng} handleAddBathroom={this.handleAddBathroom}/> } 
          />
          {/* PUTTING THIS IN BATHROOM INFO COMPONENT */}
          {/* <Route 
            path='/:bathroom_id/new-comment'
            component={() => <CommentForm bathrooms={this.state.bathrooms} comments={this.state.comments} handleAddComment={this.handleAddComment}/>}
            /> */}
          <Route
            path='/:bathroom_id'
            component={() => <BathroomInfo bathrooms={this.state.bathrooms} comments={this.state.comments} handleAddComment={this.handleAddComment} />}
            />
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