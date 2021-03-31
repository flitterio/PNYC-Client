import React, {Component} from 'react';
import './NewBathroom.css';
import {bathrooms} from '../bathrooms-helpers';
import {tags} from '../options';
import Select from 'react-select'
import Hashids from 'hashids';

class NewBathroom extends Component {
    state = {
        id: '', 
        lat: this.props.tempLat,
        lng: this.props.tempLng,
        br_name: '',
        description: '',
        rate: null
    };

    handleStars = (event) => {
        this.setState({
            rate: event.target.value
        });
    };

    toHex = (input) => {
        const hashids = new Hashids()

        const id = hashids.encode(input) 
        const numbers = hashids.decode(id)

        console.log('id', id)

        return id;
      }

    createNewBathroom = (event) => {
        event.preventDefault();
        const{bathroom, description } = event.target

        console.log(this.state)
        const hexId = this.toHex(parseInt(this.state.lat * 100000))
        
       let newBathroom = {
            id: hexId,
            lat: this.state.lat,
            lng: this.state.lng,
            br_name: bathroom.value,
            description: description.value,
            rate: this.state.rate
        }

        this.props.handleAddBathroom(newBathroom)
//FETCH API POST /bathrooms
        console.log('newBAthroom', newBathroom);
    }

    createNewBathroom
    render(){
        console.log(this.props.tempNewBathroom)
//NEED TO MAKE MULTIPLE LABELS FOR DIFFERENT RATINGS? OR SHOULD i JUST DO ONE RATING AND LEAVE IT AT THAT????
        return(
            <div className='NewBathroom'>
                <header>
                    <h1>
                        New Bathroom 
                    </h1>
                </header>
                <section>
                    <form onSubmit={this.createNewBathroom} >
                        {/* <label htmlFor="location">
                            Location
                        </label>
                        <input id="location" className="location" type="text" placeholder="location" required />
                         */}
                        <label htmlFor="bathroom">
                            Bathroom
                        </label>
                        <input id="bathroom" className="bathroom" type="text" placeholder="bathroom" required />

                        <br /><br />
                            <section className="description">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <br/>
                                <input id="description" type="textarea" />
                        <br /><br />
                            </section>
                            <div className="rate" onChange={this.handleStar}>
                                <input 
                                    type="radio" 
                                    id="star5" 
                                    className="rate" 
                                    value='5'
                                    checked={this.state.rate === 5}
                                    onChange={this.handleStars} 
                                />
                                <label 
                                    htmlFor="star5" 
                                    title="text"
                                >
                                        5 stars
                                </label>

                                <input 
                                    type="radio" 
                                    id="star4" 
                                    className="rate" 
                                    value="4"
                                    checked={this.state.rate === 4}
                                    onChange={this.handleStars} 
                                />
                                <label 
                                    htmlFor="star4" 
                                    title="text"
                                >
                                    4 stars
                                </label>

                                <input 
                                    type="radio" 
                                    id="star3" 
                                    className="rate" 
                                    value="3" 
                                    checked={this.state.rate === 3}
                                    onChange={this.handleStars} 
                                />
                                <label 
                                    htmlFor="star3" 
                                    title="text"
                                >
                                    3 stars
                                </label>

                                <input 
                                    type="radio" 
                                    id="star2" 
                                    className="rate" 
                                    value="2" 
                                    checked={this.state.rate === 2}
                                    onChange={this.handleStars} 
                                />
                                <label 
                                    htmlFor="star2" 
                                    title="text"
                                >
                                    2 stars
                                </label>

                                <input 
                                    type="radio" 
                                    id="star1" 
                                    className="rate" 
                                    value="1" 
                                    checked={this.state.rate === 1}
                                    onChange={this.handleStars} 
                                />
                                <label 
                                    htmlFor="star1" 
                                    title="text"
                                >
                                    1 star
                                </label>
                            </div>
                        <br /><br />

                        <Select  
                        id="tag"
                        options={tags}
                        onChange={this.handleTagChange}
                        isMulti
                        isClearable/>


                            <input type="submit" value="Add Item" className="submit" />
                            <br /><br />
                    </form>
                </section>
            </div>

        )
    }
}

export default NewBathroom;