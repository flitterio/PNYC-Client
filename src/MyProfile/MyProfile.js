import React, {Component} from 'react';
//import ApiContext from '../ApiContext';
//import './MyProfile.css';
import User from '../User/User';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import config from '../config';


class MyProfile extends Component {
    state={
        error: null,
        user:[],
        favorites: [],
    }
    static defaultProps ={
        match: {
            params: {}
        }
    }


    componentDidMount() {
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
            this.setState({user: responseJson }) 
         })

    .catch(error => {
        console.error(error)
        this.setState({error})
        })

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
            this.setState({user: responseJson }) 
         })

        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

    render(){
        const { user=[]} = this.state

        return(
        <article id="my-profile">
            <div className='profile-group'>
                <User 
                    id={user.id}
                    fname={user.fname}
                    lname={user.lname}
                    username = {user.username}
                    password = {user.password}
                    favorites = {user.favorites}
                        />

            </div>
        </article>
        )
    }
}

export default MyProfile;