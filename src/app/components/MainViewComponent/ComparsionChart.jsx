import React from 'react';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'
import Chart from './chart';

const ComparisonChart = (props) => {
    console.log("ComparisonChart");
    console.log(props.match.params.cntrycmparetext);

    const countryNameList = props.match.params.cntrycmparetext.split("&");

    return(
        <div className="mainViewArea">
            {/* Render Header */}
            <div className="mainViewAreaHeading" align="left">
                <a className="mainViewAreaHeadingText">Comparing countries ({countryNameList.join(", ")})</a>
            </div>

            {/* Render country chart */}
            {(countryNameList!==undefined) && <Chart countryNameList={countryNameList}/>}

        </div>
    )

}

export default ComparisonChart;