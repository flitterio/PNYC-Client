import React, {Component} from 'react';
import {Input, Button} from '../Utils/Utils';
import AuthApiService from '../services/auth-api-service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './Register.css';
const eye = <FontAwesomeIcon icon={faEye} />;


class Register extends Component {
    
    state = {
        error:null,
        passwordShown: false
     }
    
togglePasswordVisiblity = () =>{
    this.setState({passwordShown: !this.state.passwordShown });
}
onRegistrationSuccess = () => {
    window.location.href='/sign-in'
}
    handleSubmit = ev => {
        ev.preventDefault();
 
        const { fname, lname, username, password} = ev.target
    
        this.setState({ error: null });
        AuthApiService.postUser({
            username: username.value.toLowerCase(),
            password: password.value,
            fname: fname.value,
            lname: lname.value,
        })
        .then(user => {
            fname.value = ''
            lname.value = ''
            username.value = ''
            password.value = ''
            this.onRegistrationSuccess()
        })
        .catch(res => {
            console.log('res.error', res.error)
            this.setState({ error: res.error })
        })
      }
    

    render(){
        const { error } = this.state
        return(
        <div className="register"> 
                <h1>
                    New User
                </h1>

            <section className="container">
                <form id="register" 
                onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                        </div>
                        
                <div className='col-25'>
                    <label htmlFor="fname">
                        First Name: 
                    </label>
                </div>
                <div className="col-75">
                    <Input 
                        id="fname" 
                        name="fname" 
                        type="text" placeholder="First Name" required />
                        </div>
                <br /><br />
                <div className='col-25'>
                    <label htmlFor="lname">
                        Last Name: 
                    </label>
                </div>
                <div className="col-75">
                    <Input 
                        id="lname" 
                        name="lname" 
                        type="text" placeholder="Last Name" required/>
                </div>
                <br /><br />
                
                <div className='col-25'>
                    <label htmlFor="username">
                        Username:  
                    </label>
                </div>
                <div className="col-75">
                    <Input 
                        id="username"  name="username" type="text" placeholder="Username" required/> 
                </div>
                <br /><br />
                <div className="pass">
                <div className='col-25'>
                    <label htmlFor="password">
                        Password:  
                    </label>
                </div>

                <div className="col-70">
                    <Input 
                        type={this.state.passwordShown ? "text" : "password"} 
                        id="password" name="password" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Password" 
                        title="Password must be between 8 and 72 characters, contain one upper case, lower case, number and special character, and cannot start or end with empty spaces."
                        required />
                  </div>
                  <div>
                    <i onClick={this.togglePasswordVisiblity}>{eye}</i>{" "}
                </div>
                </div>
                <br /><br />
                <div className="submit">
                    <Button id="buttonstyle" className="submit" type="submit">
                        Register
                        </Button>
                </div>
                </form>
            </section> 
        </div>
        )
    }
}

export default Register;