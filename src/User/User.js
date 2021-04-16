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
                <h1 className='username'>Hello, {username}!</h1>
                <h2 className='your_profile'> Your Profile</h2>
                <h3 className='name_lable'>Name:</h3>
                    <p className='user_name'>{fname} {lname}</p>
                {/* <ul>
                    {favorites.map(favorite => {
                        <li id={favorite.id}>
                            {favorite.bathroom_id}
                        </li>
                    })}
                </ul> */}
            </div>
        )
    }
}