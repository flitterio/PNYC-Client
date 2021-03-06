import React, { Component } from 'react';
import BathroomsApiService from '../services/bathrooms-api-service';
import { Button, Textarea } from '../Utils/Utils';
import './CommentForm.css';

export default class  extends Component {
  state ={
    text: '',
    error: null,
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const newComment = {
      text: this.state.text
    }
    const {bathroom_id} = this.props
    const bathroomId = bathroom_id.bathroom_id
    const { text } = ev.target
    BathroomsApiService.postComment(bathroomId, text.value)

      .then((newComment) => {
        this.props.handleAddComment(newComment)
        text.value = ''
      })
      .catch(error => {
        console.error(error)
        this.setState({error})
    })
  }

  render() {
    return (
      <form
        className='CommentForm'
        onSubmit={this.handleSubmit}
      >
        <div className='text'>
          <Textarea
            required
            aria-label='Type a comment...'
            name='text'
            id='text'
            cols='30'
            rows='3'
            placeholder='Type a comment..'>
          </Textarea>
        </div>
        <Button type='submit'>
          Post comment
        </Button>
      </form>
    )
  }
}
