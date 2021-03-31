export const findBathroom = (bathrooms, bathroomId) =>
    bathrooms.find(bathroom => bathroom.id === bathroomId)
    
export let bathrooms = [
    {
        id: 'QXJjaWxsYSBQbGF5Z3JvdW5k',
        br_name: 'Arcilla Playground',
        lat: 40.663930,
        lng: -73.938274, 
        description: 'playground', 
        user_id: 1,
        category: 'preloaded'
    },
    {
        id: 'faijsdfilok',
        br_name: 'Playground',
        lat: 40.663778,
        lng: -73.938909, 
        description: '', 
        user_id: 1,
        category: 'preloaded'
    },
    {
        id: 'houet',
        br_name: 'test',
        lat: 40.724884,
        lng: -73.820915,
        description: 'test', 
        user_id: 1,
        category: 'preloaded'
    },
    {
        id: 'duwlsof',
        br_name: 'testing',
        lat: 40.75524628508683,
        lng: -73.97035608857422, 
        description: 'test', 
        user_id: 1,
        category: 'preloaded'
    }
  ]