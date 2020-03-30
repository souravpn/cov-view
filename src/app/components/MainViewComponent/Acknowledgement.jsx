import React from 'react';

import './MainViewComponent.scss'

const Acknowledgement = () => {

    console.log("Acknowledgement")

    return(
        <div className="mainViewArea">
            <div className="ack-Container" align="center">
                <div className="ack-Container-text-area">
                    <a className="ack-Container-text"><b>Acknowledgement</b></a><br/><br/>
                    <a className="ack-Container-text">The data shown in all the portals is sourced from various public APIs and data hosted by John Hopkins University.</a><br/><br/>
                    <a className="ack-Container-text">We are extremely grateful to all members of John Hopkins University who were part of collecting, curating and hosting these valuable datasets that help us monitor the situation worlwide right now.</a><br/><br/>
                    <a className="ack-Container-text">And of course, we are extremely grateful to the members of healthcare, law enforcement, administration, service sector and other essential industries who are making sure life goes on uninterrupted</a><br/><br/>
                    <a className="ack-Container-text"><b>Stay safe.</b></a><br/><br/>
                </div>
            </div>
        </div>
    )
}

export default Acknowledgement;
