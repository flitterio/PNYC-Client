import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './PopUp.css';

export default class PopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className="modal">
     <div className="modal_content">
        <span className="close" onClick={this.handleClick}>&times;    </span>
        <p><Link to={{
            pathname: '/sign-in',
            state:{redirectUrl: this.props.bathroomId}
            }}
            className='popup_text'
            >
                Sign In</Link> to use this feature!</p>
        
        <p>New Here? 
            <Link to='/register' className='popup_text'> Register for a free account</Link>
        </p>
    </div>
   </div>
  );
 }
}