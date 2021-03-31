import { useImperativeHandle } from 'react';
import config from '../config';
import TokenService from '../services/token-service';

    const BathroomsApiService = {

  postbathroom(newBathroom) {
      return fetch(`${config.API_ENDPOINT}/bathrooms/`, {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify(newBathroom)
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  
  },
  
    getBathrooms() {
        return fetch(`${config.API_ENDPOINT}/bathrooms`, {
          headers: {
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      getBathroom(bathroomId) {
        return fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}`, {
          headers: {
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      getBathroomComments(bathroomId) {
        return fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}/comments`, {
          headers: {
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      postComment(bathroom_id, text) {
        const newComment = {
            bathroom_id: bathroom_id,
            text,
          }
        return fetch(`${config.API_ENDPOINT}/comments`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newComment),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      }
}

export default BathroomsApiService