import React from 'react'
//import ApiContext from '../ApiContext'

export default class User extends React.Component {
    static defaultProps ={
        onDeleteUser: () => {},
    }
    //static contextType = ApiContext;
    render(){
        const{id, fname, lname, username, favorites} = this.props
        return(
            <div className='User'>
                <h1>Hello, {username}!</h1>
                <h2>Your Profile</h2>
                <h3>Name:</h3>
                    <p>{fname} {lname}</p>
                <ul>
                    {favorites.map(favorite => {
                        <li id={favorite.id}>
                            {favorite.bathroom_id}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}