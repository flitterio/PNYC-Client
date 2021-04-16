import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

class NotFoundPage extends React.Component{
    render(){
        return <div className='not-found'>
            <h1 className="error">404</h1>
            <h2 className='poo'>Oh Poop.</h2>
            <img src='/pile-of-poo_1f4a9.png' alt='Poop Emoji' />
            <h3 className='message'>The Page You Requested Does Not Exist</h3>
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>
    }
}
export default NotFoundPage;