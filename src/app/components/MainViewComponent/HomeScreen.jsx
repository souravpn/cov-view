import React from 'react';

import './MainViewComponent.scss'

const HomeScreen = () => {

    console.log("HomeScreen")

    return(
        <div className="mainViewArea">
            <div className="ack-Container" align="center">
                <div className="ack-Container-text-area">
                <a className="ack-Container-text"><b>Click on a country to begin! Or view all Countries and compare the cases.</b></a><br/><br/>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;