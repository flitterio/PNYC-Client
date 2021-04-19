import React from 'react';

export default class User extends React.Component {
    static defaultProps ={
        onDeleteUser: () => {},
    }
    render(){
        const{fname, lname, username} = this.props
        return(
            <div className='User'>
                <h1 className='username'>Hello, {username}!</h1>
                <h2 className='your_profile'> Your Profile</h2>
                <h3 className='name_lable'>Name:</h3>
                    <p className='user_name'>{fname} {lname}</p>
            </div>
        )
    }
}