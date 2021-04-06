import React, {Component} from 'react';
// import { Link} from 'react-router-dom';
// import config from '../config';
import { FontAwesomeIcon } from 'react-fontawesome'
import CommentForm from '../CommentForm/CommentForm'
import BathroomsApiService from '../services/bathrooms-api-service';
import TokenService from '../services/token-service';
import PopUp from '../PopUp/PopUp';
import ReactStars from 'react-rating-stars-component';
//import {findBathroom} from '../bathrooms-helpers'

 export default class BathroomInfo extends Component {
     state = {
         error: null,
         bathroom: {},
         comments: [],
         commentForm: false,
         popUp: false,
         rating: null,
     }
     static defaultProps = {
         match: {
             params: {}
         }
     }
     componentDidMount(){
         console.log('has auth token', TokenService.hasAuthToken())
        const {bathroom_id} = this.props.match.params
        BathroomsApiService.getBathroom(bathroom_id)
        .then(bathroomInfo => {
            this.setState(
                {bathroom: bathroomInfo}
            )
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
        BathroomsApiService.getBathroomComments(bathroom_id)
        .then(newComments => {
            console.log('newComments', newComments)
            console.log('this', this)
            this.setState(
               {comments:  newComments} 
            )
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }

    //organize comments
    bathroomComments = () => {
        console.log('comments', this.state.comments)
        if(this.state.comments.length > 0){
            return (
            <ul className='BathroomPage__comment-list'>
                {this.state.comments.map(comment =>
                    <li 
                        key={comment.id} className='BathroomPage__comment'>
                        <p className='BathroomPage__comment-text'>
                            {/* <FontAwesomeIcon
                                size='lg'
                                icon='quote-left'
                                className='BathroomPage__comment-icon blue'
                            /> */}
                            {comment.text}
                        </p>
                        <p className='BathroomPage__comment-user'>
                            {comment.user.fname} {comment.user.lname}
                        </p>
                    </li>
                )
                }
          </ul>
        )}
      }

    togglePop = () => {
        this.setState(
            {popUp: !this.state.popUp}
        )
    }
    commentButtonClicked = (e) => {
        e.preventDefault();
        if(TokenService.hasAuthToken()){
        this.setState({commentForm: !this.state.commentForm})
        }
        else{
            this.togglePop()
        }
    }

    ratingChanged = (newRating) => {
        this.setState({
            rate: newRating
        })
    }

    handleAddRate = (e) => {
        e.preventDefault();
        BathroomsApiService.postRates(this.state.rating)
    
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
    }
    // handleAddComment = (newComment) => {
    //     this.setState({
    //         comments: [...comments, newComment]
    //     })
    // }
    showCommentForm = () => {
    if(this.state.commentForm === true){
      return (
        <div>
        <form onSubmit={this.handleAddRate}>
            <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
            <button 
                id='new-rate'
                className='new-rate'
            >
                Rate
            </button>
        </form>
        <CommentForm 
            comments={this.state.comments} 
            bathroom_id={this.props.match.params}
            handleAddComment={this.handleAddComment}
            />
        </div>
    )}
    }

  
    render(){ 
        console.log('bathroom', this.state.bathroom)
        const { bathroom} = this.state
        //console.log('comments', this.state.comments[0])
        
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
            <h3> Description: </h3>
            <p>{bathroom.description}</p>
            <br />
            <h3> Rating: </h3>
            <p>{bathroom.rate}</p>
            <button onClick={(e) => {
                e.preventDefault() 
                window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${bathroom.lat},${bathroom.lng}`}
            }>
                     Directions </button>
            
            <h3>User added? </h3>
            <p>{bathroom.category}</p>
                <br />
            
            {/* <ul className='BathroomPage__comment-list'>
                {comments.map(comment =>
                <li key={comment.id} className='BathroomPage__comment'>
                    <p className='BathroomPage__comment-text'>
                    <FontAwesomeIcon
                        size='lg'
                        icon='quote-left'
                        className='BathroomPage__comment-icon blue'
                    />
                    {comment.text}
                    </p>
                    <p className='BathroomPage__comment-user'>
                    {comment.user.username} 
                    </p>
                </li>
                )}
            </ul> */}
            <div>
                {this.bathroomComments()}
            </div>

                <button onClick={this.commentButtonClicked}>
                    Add Comments
                </button>
            <div>
                {this.showCommentForm()}
                {this.state.popUp ? <PopUp toggle={this.togglePop} bathroomId={this.props.match.params} /> : null}
            </div>
        </>
        )
    }
 }

 //export default BathroomInfo;