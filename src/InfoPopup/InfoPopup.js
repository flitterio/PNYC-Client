import React, { Component } from "react";
import './InfoPopup.css';

export default class InfoPopUp extends Component {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className="info_modal">
     <div className="info_modal_content">
        <span className="close" onClick={this.handleClick}>&times;    </span>
        <p>To add a bathroom, click or tap on a location on the map. </p>
        <p>Click on the new poop emoji to add to the database</p>
    </div>
   </div>
  );
 }
}