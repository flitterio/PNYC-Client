//COMMENTED OUT SO THAT IT DOES NOT MESS WITH RENDERING, BUT WOULD BE HELPFUL TO USE THIS LATER
// var geocoder = require('google-geocoder');
// var Hashids = require('hashids/cjs');

// var geo = geocoder({
//   key: ''
// });

// // let address='223 Edenbridge Dr, Toronto';
// // geo.find(address, function(err, res){

// //  return res[0].location;
// //   // process response object
// // ask jake for help
// // })

// function toHex(input){
//     const hashids = new Hashids()

//     const id = hashids.encode(parseInt(input * 100000)) 
//     const numbers = hashids.decode(id)

//     return id;
//   }


//   function formatBathrooms(bathrooms){
//       //let format = [];
//       let templat = '';
//       let templng = '';
//       //let temphash = '';
//       for(let i = 0; i < bathrooms.length; i++){
//         //  console.log('loop', i)
//         address= bathrooms[i].location
//         geo.find(address, function(err, res){
    
//         templat =res[0].location.lat;
//         templng =res[0].location.lng;
//         //  console.log('geo.find', bathrooms[i], templat, templng)
//         console.log(`('`+ toHex(templat) + `', '` + bathrooms[i].name + `', ` + templat + ', ' + templng + `, 'Public Bathroom', 0, 'preloaded'),` )
//         })
        
//         // temphash = toHex(parseInt(templat * 100000))
//         // console.log(temphash)
//         // format.push('('+ temphash + ', ' + bathrooms[i].name + ', ' + templat + ', ' + templng + ', '+ bathrooms[i].type+ ')')

//         // console.log('being pushed,','('+ temphash + ', ' + bathrooms[i].name + ', ' + templat + ', ' + templng + ', '+ bathrooms[i].type+ ')' )

//         // address='';
//         // templat = '';
//         // templng = '';
//         // temphash = '';
//       }
//     //   return format;
//   }

// formatBathrooms(bathroomList)