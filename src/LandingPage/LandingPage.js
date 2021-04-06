import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'


class LandingPage extends Component{
    render(){
        return(
            <div className='landing'>
                <section >
                    <h2>GOT TO GO BUT DON'T KNOW WHERE TO LOOK?</h2>
                    <p>Have you ever found yourself in the middle of New York City, surrounded by buildings, but with no idea where you can use the bathroom? You're not alone. PNYC is the only app around that specializes in finding you the nearest and nicest place. You can even rate your experience, and add hidden gems on to the map as you find them (like the Chipotle on the coner that will take pity on your unfortunate bladder attack) </p>
                <h3> HOW TO USE </h3>
                    <p>Click below to go to the map and find a bathroom near you, make an account to add and review restrooms</p>
                    <p>To add a restroom, click on the location you wish to add one, then on the poop emoji that pops up!</p>
                </section>

                <Link 
                    to='/map' 
                    className='maplink'
                >
                    FIND ME A BATHROOM!
                </Link> 
            </div>
        )
    }
}

export default LandingPage;