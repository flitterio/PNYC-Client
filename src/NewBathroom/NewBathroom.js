import React, {Component} from 'react';
import './NewBathroom.css';
import {tags} from '../options';
import Select from 'react-select'
import Hashids from 'hashids';
import ReactStars from 'react-rating-stars-component';
import BathroomsApiService from '../services/bathrooms-api-service';
import './NewBathroom.css';
import {withRouter} from 'react-router-dom';


class NewBathroom extends Component {
    state = {
        id: '', 
        lat: this.props.tempLat,
        lng: this.props.tempLng,
        br_name: '',
        description: '',
        rate: null,
        ishandicap: false,
        isfamily: false,
        hasstalls: false,
        isprivate: false,
        gender_neutral: false,
        hasbaby_table: false,

    };

    toHex = (input) => {
        const hashids = new Hashids()

        const id = hashids.encode(input) 
        const numbers = hashids.decode(id)

        return id;
      }
    
    handleTagChange = (event) => {
        let tempTags = event.map(e => e.value)

        if (tempTags.includes("ishandicap")) {
            this.setState({
                ishandicap: true
            })
        } else {
            this.setState ({
                ishandicap: false
            })
        }

        if (tempTags.includes("hasstalls")) {
            this.setState({
                hasstalls: true
            })
        } else {
            this.setState ({
                hasstalls: false
            })
        }

        if (tempTags.includes("isfamily")) {
            this.setState({
                isfamily: true
            })
        } else {
            this.setState ({
                isfamily: false
            })
        }

        if (tempTags.includes("isprivate")) {
            this.setState({
                isprivate: true
            })
        } else {
            this.setState ({
                isprivate: false
            })
        }

        if (tempTags.includes("gender_neutral")) {
            this.setState({
                gender_neutral: true
            })
        } else {
            this.setState ({
                gender_neutral: false
            })
        }
        
        if (tempTags.includes("hasbaby_table")) {
            this.setState({
                hasbaby_table: true
            })
        } else {
            this.setState ({
                hasbaby_table: false
            })
        }
    }

    ratingChanged = (newRating) => {
        this.setState({
            rate: newRating
        });
    }

    createNewBathroom = (event) => {
        event.preventDefault();
        const{bathroom, description } = event.target
        const hexId = this.toHex(parseInt(this.state.lat * 100000))
        
       let newBathroom = {
            id: hexId,
            lat: this.state.lat,
            lng: this.state.lng,
            br_name: bathroom.value,
            description: description.value,
            rate: this.state.rate,
            ishandicap: this.state.ishandicap,
            isfamily: this.state.isfamily,
            hasstalls: this.state.hasstalls,
            isprivate: this.state.isprivate,
            gender_neutral: this.state.gender_neutral,
            hasbaby_table: this.state.hasbaby_table,
        }
        
        this.props.handleAddBathroom(newBathroom);

        BathroomsApiService.postBathroom(newBathroom);
        
       this.props.history.push('/map');

    }

    createNewBathroom
    render(){
        return(
            <div className='NewBathroom'>
                <header>
                    <h1 className='newBathroom_title'>
                        New Bathroom 
                    </h1>
                </header>
                <section>
                    <form   
                        className='newBathroom_form' 
                        onSubmit={this.createNewBathroom} >

                        <label htmlFor="bathroom">
                            Bathroom
                        </label>
                        <br />
                        <input id="bathroom" className="bathroom" type="text" placeholder="bathroom" required />

                        <br /><br />
                            <section className="description">
                                <label htmlFor="description"
                                >
                                    Description
                                </label>
                                <br/>
                                <input id="description" type="textarea" />
                        <br /><br />
                            </section>
             <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={24}
                activeColor="#ffd700"
            />   
                        <br /><br />

                        <Select  
                        id="tag"
                        options={tags}
                        onChange={this.handleTagChange}
                        isMulti
                        isClearable/>
                    <br />

                            <input type="submit" value="Add Bathroom" className="new_bathroom" />
                            <br /><br />
                    </form>
                </section>
            </div>

        )
    }
}

export default withRouter(NewBathroom);