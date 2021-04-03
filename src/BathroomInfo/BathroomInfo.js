import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import config from '../config';
import CommentForm from '../CommentForm/CommentForm'
import BathroomsApiService from '../services/bathrooms-api-service';
import TokenService from '../services/token-service';
import PopUp from '../PopUp/PopUp';
import ReactStars from 'react-rating-stars-component';
//import {findBathroom} from '../bathrooms-helpers'

 class BathroomInfo extends Component {
     state = {
         error: null,
         bathroom: {},
         comments: [],
         commentForm: false,
         popUp: false,
     }
    //  static defaultProps = {
    //      match: {
    //          params: {}
    //      }
    //  }
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
        .then(bathroomComments => {
            this.setState(
                {comments: bathroomComments}
            )
        })
        .catch(error => {
            console.error(error)
            this.setState({error})
        })
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
    handleAddRate = () => {
        console.log('handleaddrate called')
    }
    showCommentForm = () => {
    if(this.state.commentForm === true){
      return (
        <div>
            {/* <form className='new-rate' onSubmit={this.handleAddRate()}>
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
                <button 
                    id='new-rate'
                    className='new-rate'
                >
                    Rate
                </button>
            </form> */}
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
            bathrooms={this.props.bathrooms} 
            comments={this.props.comments} 
            handleAddComment={this.props.handleAddComment}
            />
        </div>
    )}
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
                <h3> Description: </h3>
                <p>{bathroom.description}</p>
                <h3>User added? </h3>
                <p>{bathroom.category}</p>
                    <br />
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

 export default BathroomInfo;