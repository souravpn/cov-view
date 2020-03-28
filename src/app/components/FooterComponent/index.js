import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './FooterComponent.scss';

const Footer = () => {

    // console.log("Footer");

    return(
        <div className="footerArea">
            <h5>Cov-view.com built with <FontAwesomeIcon icon={faHeart} style={{"color":"red"}}/> in Morgan Hill, California</h5>
            <span>Acknowledgements</span>
            <h5 style={{"color":"yellow"}}>Site still under construction. Please bear with us...</h5>
        </div>
    )

}

export default Footer;