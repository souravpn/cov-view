import React from 'react';

import HeaderHighLevelStats from './HeaderHighLevelStats.jsx';
import './HeaderComponent.scss';

const Header = () => {

    console.log("Header");

    return(
        <div className="headerArea">
            <div className="headerAreaHeading" align="left">
                <div className="headerAreaHeadingText">
                    World Wide stats
                </div>
            </div>
            <HeaderHighLevelStats />
        </div>
    )

}

export default Header;