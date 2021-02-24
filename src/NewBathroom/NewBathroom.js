import React, {Component} from 'react';
import './NewBathroom.css';

class NewBathroom extends Component {
    render(){
        return(
            <div className='NewBathroom'>
                <header>
                    <h1>
                        New Bathroom 
                    </h1>
                </header>
                <section>
                    <form action="upload.php" method="post" enctype="multipart/form-data" id="newbathroom">
                            Select image to upload:
                            <input type="file" className="fileToUpload" id="fileToUpload" />
                            <br /><br />
                        <label htmlFor="location">
                            Location
                        </label>
                        <input id="location" className="location" type="text" placeholder="location" required />
                        
                        <label htmlFor="bathroom">
                            Bathroom
                        </label>
                        <input id="bathroom" className="bathroom" type="text" placeholder="bathroom" required />

                        <br /><br />
                            <section class="description">
                                <label htmlFor="description">
                                    Description
                                </label>
                                <br/>
                                <input id="description" type="textarea" value="description"/>
                        <br /><br />
                            </section>
                            <div class="rate">
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
                            </div>
                        <br /><br />

                            <input type="submit" value="Add Item" className="submit" />
                            <br /><br />
        
                    </form>
                </section>
            </div>

        )
    }
}

export default NewBathroom;