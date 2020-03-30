import React, { useEffect, useState } from 'react';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'

const HighLevelStats = (props) => {

    const countryName = props.countryName;
    const [countryData, setCountryData] = useState(undefined);

    var nf = new Intl.NumberFormat();

    useEffect(() => {
        JhuServer.getStatsBySpecificCountry(countryName)
        .then(response => setCountryData(response.data))
        .catch()
    }, [countryName]);

    return(
        <React.Fragment>

            {/* Country details */}
            <div className="HighLevelStatsArea">
                <div className="HighLevelStatsAreaPanel">
                    <div className="row">
                        <div className="column" style={{"width":"100%", "float":"left"}} align="left">
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxContent">
                                    {countryData!==undefined ? <img src={countryData.countryInfo.flag} style={{"height": "2rem", "width":"3rem"}}/> : "Loading..."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Case details */}
            <div className="HighLevelStatsArea">
                <div className="HighLevelStatsAreaPanel">
                    <div className="row">
                        <div className="column" style={{"width":"20%", "float":"left"}}>
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxHeader"><a className="portal-text">Total Cases</a></div>
                                <div className="HighLevelStatsBoxContent">
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"blue"}}>
                                        {countryData!==undefined ? nf.format(countryData.cases) : "Loading..."}
                                    </div>
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"blue", "fontSize":"1rem"}}>
                                        {countryData!==undefined ? "(Today)"+nf.format(countryData.todayCases) : "Loading..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column" style={{"width":"20%", "float":"left"}}>
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxHeader"><a className="portal-text">Total Deaths</a></div>
                                <div className="HighLevelStatsBoxContent">
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"red"}}>
                                        {countryData!==undefined ? nf.format(countryData.deaths) : "Loading..."}
                                    </div>
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"red", "fontSize":"1rem"}}>
                                        {countryData!==undefined ? "(Today)"+nf.format(countryData.todayDeaths) : "Loading..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column" style={{"width":"20%", "float":"left"}}>
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxHeader"><a className="portal-text">Critical</a></div>
                                <div className="HighLevelStatsBoxContent">
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"orange"}}>
                                    {countryData!==undefined ? nf.format(countryData.critical) : "Loading..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column" style={{"width":"20%", "float":"left"}}>
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxHeader"><a className="portal-text">Recovered</a></div>
                                <div className="HighLevelStatsBoxContent">
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"green"}}>
                                        {countryData!==undefined ? nf.format(countryData.recovered) : "Loading..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column" style={{"width":"20%", "float":"left"}}>
                            <div className="HighLevelStatsBox">
                                <div className="HighLevelStatsBoxHeader"><a className="portal-text">Active Cases</a></div>
                                <div className="HighLevelStatsBoxContent">
                                    <div className="HighLevelStatsBoxContentText" style={{"color":"pink"}}>
                                        {countryData!==undefined ? nf.format(countryData.active) : "Loading..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HighLevelStats;