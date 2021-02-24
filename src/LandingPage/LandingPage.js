import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class LandingPage extends Component{
    render(){
        return(
            <div>
                <section>
                    <h2>Got to go but don't know where to look?</h2>
                    <p>Have you ever found yourself in the middle of New York City, surrounded by buildings, but with no idea where you can use the bathroom? You're not alone. PNYC is the only app around that specializes in finding you the nearest and nicest place. You can even rate your experience, and add hidden gems on to the map as you find them (like the Chipotle on the coner that will take pity on your unfortunate bladder attack) </p>

                    <p>click the button below to go to the map and find a bathroom near you, make an account to add and review restrooms</p>
                </section>

                <Link to='/map' className='maplink'>FIND ME A BATHROOM!</Link> 
            </div>
        )
    }
}

export default LandingPage;