import React, {Component} from 'react';
// import { Link} from 'react-router-dom';
// import config from '../config';
import { FontAwesomeIcon } from 'react-fontawesome'
import CommentForm from '../CommentForm/CommentForm'
import BathroomsApiService from '../services/bathrooms-api-service';
import TokenService from '../services/token-service';
import PopUp from '../PopUp/PopUp';
import ReactStars from 'react-rating-stars-component';
import './BathroomInfo.css';
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
                            {comment.user.username} 
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
            rating: newRating
        })
    }

    handleAddRate = (e) => {
        e.preventDefault();
        const {bathroom_id} = this.props.match.params
        const { rating } = this.state
        console.log('bathroom_id', bathroom_id, 'rating', rating)
        BathroomsApiService.postRates(bathroom_id, rating)


        .catch(error => {
            console.error(error)
            this.setState({error})
        })
        window.location.reload()
    }
    handleAddComment = (newComment) => {
        this.setState({
            comments: [...this.state.comments, newComment]
        })
    }
    showCommentForm = () => {
    if(this.state.commentForm === true){
        return (
        <div>
        <form onSubmit={this.handleAddRate}>
            <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={35}
                activeColor="#ffd700"
            />
            <button 
                id='new-rate'
                className='new-rate'
            >
                Rate
            </button>
            <br /><br />
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
    return(
        <div className='BathroomInfoPage_main'>
            <div className='BathroomPage_item'>
                <h1> Bathroom Info Page </h1>
                <h2>{bathroom.br_name}</h2>
                <h3> Description: </h3>
                    <p>{bathroom.description}</p>
                <h3> Rating: </h3>
                    {/* <ReactStars 
                        count={bathroom.rate}
                        size={35}
                        color="#ffd700"
                        edit={false}
                        half={true}
                    /> */}
                    <p>{bathroom.rate}</p>

                <button onClick={(e) => {
                    e.preventDefault() 
                    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${bathroom.lat},${bathroom.lng}`}
                }>
                    Directions
                </button>
                
                <h3>User added? </h3>
                <p>{bathroom.category}</p>
                    <br />
            </div>
            <div className='BathroomPage_item'>
                <div className='BathroomComments'>
                    <h3>Comments:</h3>
                    {this.bathroomComments()}
                </div>
                <button onClick={this.commentButtonClicked}>
                        Rate/ Add Comments
                </button>
                <div className='RateComment'>
                    {this.showCommentForm()}
                    {this.state.popUp ? <PopUp toggle={this.togglePop} bathroomId={this.props.match.params} /> : null}
                </div>
            </div>
        </div>
        )
    }
}

//export default BathroomInfo;