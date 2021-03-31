import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import config from '../config';
import CommentForm from '../CommentForm/CommentForm'
//import {findBathroom} from '../bathrooms-helpers'

 class BathroomInfo extends Component {
     state = {
         error: null,
         bathroom: {},
     }
     static defaultProps = {
         match: {
             params: {}
         }
     }
     componentDidMount(){
        const {bathroomId} = this.props.match.params
        console.log('bathroomID', bathroomId)
            fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    // 'Authorization': `Bearer ${TokenService.getAuthToken()}`
                }
            })
    
        .then(res => {
            if(!res.ok) {
            return res.json().then(error => Promise.reject(error))
            }
            return res.json();
        })
        .then(bathroomInfo => {
            this.setState(
                {bathroom: bathroomInfo}
            )
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

    render(){ 
        const { bathroom } = this.state
        // const {bathrooms} = this.props
        // const {bathroomId} = this.props.match.params
        // const bathroom = findBathroom(bathrooms, bathroomId)
        // console.log('bathroom', bathroom)
        // SHOULD LOAD DATA FOR ONE BATHROOM
        //GET THIS DATA FROM BATHROOMS STATE??? Jake
        return(
            <>
                <h1> Bathroom Info Page </h1>
                <h2>{bathroom.br_name}</h2>
                <h3>{bathroom.description}</h3>
                <h3>{bathroom.category}</h3>
            
                <p>Add rating here: </p>
                <div className="rate">
                                <input type="radio" id="star5" className="rate" value="5" />
                                <label htmlFor="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" className="rate" value="4" />
                                <label htmlFor="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" className="rate" value="3" />
                                <label htmlFor="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" className="rate" value="2" />
                                <label htmlFor="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" className="rate" value="1" />
                                <label htmlFor="star1" title="text">1 star</label>
                            </div>
                    <br /><br /><br />
                    <CommentForm 
                        bathrooms={this.props.bathrooms} 
                        comments={this.props.comments} 
                        handleAddComment={this.props.handleAddComment}
                    />
            </>
        )
    }
 }

 export default BathroomInfo;