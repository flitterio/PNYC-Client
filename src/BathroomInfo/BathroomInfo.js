import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm'

 class BathroomInfo extends Component {
    render(){
        // SHOULD LOAD DATA FOR ONE BATHROOM
        //GET THIS DATA FROM BATHROOMS STATE??? Jake
        return(
            <>
                <div> Bathroom Info Page </div>
                <p>Add rating here: </p>
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