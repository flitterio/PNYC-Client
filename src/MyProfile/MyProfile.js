import React, {Component} from 'react';
//import ApiContext from '../ApiContext';
import './MyProfile.css';
import User from '../User/User';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import config from '../config';
import DeleteUser from '../DeleteUser/DeleteUser';
import UserService from '../services/user-service';

class MyProfile extends Component {
    state={
        error: null,
        user: this.props.user,
        favorites: [],
        deleteWarning: false,
    }
    static defaultProps ={
        match: {
            params: {}
        }
    }


    // componentDidMount() {
    //     UserService.getUserInfo()
    // }

    deleteWarning = (e) => {
        const current = this.state.deleteWarning;
        const newVal = !current;
      this.setState({deleteWarning: newVal});
    }

    getFavorites = () => {
        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if(!res.ok) {
            return res.json().then(error => Promise.reject(error))
            }
            return res.json();
        })
         .then(responseJson => {
            this.setState({favorites: responseJson }) 
         })

        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

    render(){
        const { user={}, favorites=[]} = this.state

        return(
        <article id="my-profile">
            <div className='profile-group'>
                <User 
                    id={user.id}
                    fname={user.fname}
                    lname={user.lname}
                    username = {user.username}
                    password = {user.password}
                    favorites = {favorites}
                        />
                 <section className="DeleteUser" >
                    <input id="delete" type='button' value='DELETE USER' onClick={this.deleteWarning} style={{visibility: !this.state.deleteWarning ? 'visible' : 'hidden'}}/> 
                    
                    {this.state.deleteWarning ? <DeleteUser user={this.state.user} deleteWarning={this.deleteWarning}/> : null}

                </section>
            </div>
        </article>
        )
    }
}

export default MyProfile;