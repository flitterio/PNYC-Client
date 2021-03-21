import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm'

 class BathroomInfo extends Component {
    render(){
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