import React, { Component } from 'react'
import BathroomsApiService from '../services/bathrooms-api-service'
import { Button, Textarea } from '../Utils/Utils'



export default class  extends Component {
  state ={
    text: '',
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const newComment = {
      text: this.state.text
    }
    const {bathroom_id} = this.props.match.params
    const {bathrooms} = this.props
    const { text } = ev.target
    BathroomsApiService.postComment(bathroom_id, text.value)
      .then(this.props.handleAddComment(newComment))
      .then(() => {
        text.value = ''
      })
      //unsure what to do for this error
     // .catch(this.context.setError)
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
