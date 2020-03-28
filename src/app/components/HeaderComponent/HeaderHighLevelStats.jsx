import React, { useEffect, useState } from 'react';

import JhuServer from '../../api/JhuServer';

import './HeaderComponent.scss'

const HeaderHighLevelStats = () => {

    const[highLevelStats, setHighLevelStats] = useState(undefined);

    var nf = new Intl.NumberFormat();

    useEffect(() => {
        JhuServer.getHighLevelStats()
        .then(response => setHighLevelStats(response.data))
        .catch()
    }, [])

    console.log(highLevelStats);

    return(
        <div className="HighLevelStatsArea">
            <div className="HighLevelStatsAreaPanel">
                <div className="row">
                    <div className="column" style={{"width":"20%", "float":"left"}}>
                        <div className="HighLevelStatsBox">
                            <div className="HighLevelStatsBoxHeader">Total Cases</div>
                            <div className="HighLevelStatsBoxContent">
                                <div className="HighLevelStatsBoxContentText" style={{"color":"blue"}}>
                                    {highLevelStats!==undefined ? nf.format(highLevelStats.cases) : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column" style={{"width":"20%", "float":"left"}}>
                        <div className="HighLevelStatsBox">
                            <div className="HighLevelStatsBoxHeader">Deaths</div>
                            <div className="HighLevelStatsBoxContent">
                                <div className="HighLevelStatsBoxContentText" style={{"color":"red"}}>
                                    {highLevelStats!==undefined ? nf.format(highLevelStats.deaths) : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column" style={{"width":"20%", "float":"left"}}>
                        <div className="HighLevelStatsBox">
                            <div className="HighLevelStatsBoxHeader">Critical</div>
                            <div className="HighLevelStatsBoxContent">
                                <div className="HighLevelStatsBoxContentText" style={{"color":"orange"}}>
                                {highLevelStats!==undefined ? nf.format(highLevelStats.critical) : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column" style={{"width":"20%", "float":"left"}}>
                        <div className="HighLevelStatsBox">
                            <div className="HighLevelStatsBoxHeader">Recovered</div>
                            <div className="HighLevelStatsBoxContent">
                                <div className="HighLevelStatsBoxContentText" style={{"color":"green"}}>
                                    {highLevelStats!==undefined ? nf.format(highLevelStats.recovered) : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column" style={{"width":"20%", "float":"left"}}>
                        <div className="HighLevelStatsBox">
                            <div className="HighLevelStatsBoxHeader">Active Cases</div>
                            <div className="HighLevelStatsBoxContent">
                                <div className="HighLevelStatsBoxContentText" style={{"color":"pink"}}>
                                    {highLevelStats!==undefined ? nf.format(highLevelStats.active) : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderHighLevelStats;