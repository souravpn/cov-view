import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './FooterComponent.scss';

const Footer = () => {
    return(
        <div className="footerArea">
            <div className="footerTextArea">
                <a className="footerTextAreaText">Cov-view.com built with <FontAwesomeIcon icon={faHeart} style={{"color":"red"}}/> in Morgan Hill, California | <a href="/ack">Acknowledgements</a> </a>
            </div>
        </div>
    )
}

export default Footer;