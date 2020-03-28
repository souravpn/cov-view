import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart, faVirus } from '@fortawesome/free-solid-svg-icons';

import SideViewContent from './SideViewContent.jsx';

import './SideViewComponent.scss';

const SideView = (props) => {

    const selectedCountry = props.selectedCountry;
    const setSelectedCountry = props.setSelectedCountry;

    // console.log("SideView");

    return(
        <div className="sideViewPane">
            <div className="sideViewPaneHeader" align="left">
                <a className="sideViewPaneHeaderText"> Cov-View</a>
            </div>

            <div className="sideViewPaneSubHeader" align="left">
                <a className="sideViewPaneSubHeaderText">Updates on Covid-19</a>
            </div>
            
            <SideViewContent 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry}/>
        </div>
    )

}

export default SideView;