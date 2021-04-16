import React, {Component} from 'react';
import CommentForm from '../CommentForm/CommentForm'
import BathroomsApiService from '../services/bathrooms-api-service';
import TokenService from '../services/token-service';
import PopUp from '../PopUp/PopUp';
import ReactStars from 'react-rating-stars-component';
import './BathroomInfo.css'


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
            this.props.history.push('./not-found');
            
        })
        BathroomsApiService.getBathroomComments(bathroom_id)
        .then(newComments => {
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
        if(this.state.comments.length > 0){
            return (
            <ul className='BathroomPage__comment-list'>
                {this.state.comments.map(comment =>
                    <li 
                        key={comment.id} className='BathroomPage__comment'>
                        <p className='BathroomPage__comment-text'>
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
        </form>
        <br />
        <CommentForm 
            comments={this.state.comments} 
            bathroom_id={this.props.match.params}
            handleAddComment={this.handleAddComment}
            />
        </div>
    )}
    }

  
    render(){ 
        const { bathroom} = this.state
    return(
        <div className='BathroomInfoPage_main'>
            <div className='title'>
                <h1> Bathroom Info Page </h1>
                <h2 className='bathroom_name'>{bathroom.br_name}</h2>
                
                <button onClick={(e) => {
                        e.preventDefault() 
                        window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${bathroom.lat},${bathroom.lng}`}
                        }
                        className='directions'
                    >
                        Directions
                    </button>
            </div>
            <div className = 'BathroomInfo_info'>
                <div className='BathroomPage_item'>
   
                    <h3 className='description'> Description: </h3>
                        <p className='BathroomInfo_paragraph'>{bathroom.description}</p>
                    <h3 className='description'> Rating: </h3>
                        {/* <ReactStars 
                            count={bathroom.rate}
                            size={35}
                            color="#ffd700"
                            edit={false}
                            half={true}
                        /> */}
                            <p className='BathroomInfo_paragraph'>{bathroom.rate}</p>
                    
                    <h3 className='description'>
                        User added?: 
                    </h3>
                        {bathroom.category === 'user_added' ? <p className='BathroomInfo_paragraph'>Added by user</p> : <p className='BathroomInfo_paragraph'>Preloaded Bathroom</p> }

                        <button onClick={this.commentButtonClicked}>
                            Rate/ Add Comments
                    </button>
                    <br /><br />
                    <div className='RateComment'>
                        {this.showCommentForm()}
                        {this.state.popUp ? <PopUp toggle={this.togglePop} bathroomId={this.props.match.params} /> : null}
                    </div>
                </div>
                <div className='BathroomPage_item'>
                    <div className='BathroomComments'>
                        <h3>Comments:</h3>
                        {this.bathroomComments()}
                    </div>

                </div>
            </div>
        </div>
        )
    }
 }

 //export default BathroomInfo;