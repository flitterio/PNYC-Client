//THESE ALL USE CONFIG. COMMENTING OUT UNTIL ACTUAL API IS SET UP

// import config from './config'

// const BathroomApiService = {
//     getBathrooms() {
//         return fetch(`${config.API_ENDPOINT}/bathrooms`, {
//           headers: {
//           },
//         })
//           .then(res =>
//             (!res.ok)
//               ? res.json().then(e => Promise.reject(e))
//               : res.json()
//           )
//       },
//       getBathroom(bathroomId) {
//         return fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}`, {
//               method: 'GET',
//               headers: {
//                   'content-type': 'application/json',
//               }
//         })
//           .then(res =>
//             (!res.ok)
//               ? res.json().then(e => Promise.reject(e))
//               : res.json()
//           )
//       },
//       getBathroomComments(bathroomId) {
//         return fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}/comments`, {
//           headers: {
//           },
//         })
//           .then(res =>
//             (!res.ok)
//               ? res.json().then(e => Promise.reject(e))
//               : res.json()
//           )
//       },
//       postComment(bathroom_id, text) {
//         const newComment = {
//             bathroom_id: bathroom_id,
//             text,
//           }
//         return fetch(`${config.API_ENDPOINT}/comments`, {
//           method: 'POST',
//           headers: {
//             'content-type': 'application/json',
//             'Authorization': `Bearer ${TokenService.getAuthToken()}`
//           },
//           body: JSON.stringify(newComment),
//         })
//           .then(res =>
//             (!res.ok)
//               ? res.json().then(e => Promise.reject(e))
//               : res.json()
//           )
//       }
// }

//  export default BathroomApiService