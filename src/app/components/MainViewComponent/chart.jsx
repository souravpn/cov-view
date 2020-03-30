import React,{useEffect, useState} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import moment from 'moment';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'

const Chart = (props) => {

    console.log("chart..");
    var nf = new Intl.NumberFormat();

    const countryNameList = props.countryNameList;
    const singleCountryReport = props.countryNameList.length===1 ? true : false;

    const [countryTimeSeriesList, setCountryTimeSeriesList] = useState(undefined)
    const [metricselected, setMetricSelected] = useState("confirmed");
    const [metricTimeSeries, setMetricTimeSeries] = useState(undefined)

    const colorList = ["red", "green", "blue", "orange", "brown", "black", "magenta", "khaki", "pink", "purple"];

    console.log(`Chart ${countryNameList}`)

    const cureatedCountry = (cntry) => {
        // let newCntry = (cntry==="USA" ? "US" : cntry);
        let newCntry = (Object.keys(cureatedCountryDict).includes(cntry) ? cureatedCountryDict[cntry] : cntry);
        return newCntry;
    }
    var cureatedCountryDict = {
        "USA": "US",
        "S. Korea": "Korea, South",
        "St. Vincent Grenadines": "Saint Vincent and the Grenadines",
        "Taiwan": "Taiwan*",
        "UAE": "United Arab Emirates",
        "UK": "United Kingdom",
    }

    useEffect(()=>{
        var countryTimeSeriesListTemp = {};
        JhuServer.getHistoricalStatsByCountry()
        .then(response => (
            countryNameList.map(
                cntry => (
                    // console.log(cntry);
                    Object.keys(response.data).includes(cureatedCountry(cntry)) ? ( countryTimeSeriesListTemp[cntry] = response.data[cureatedCountry(cntry)] )
                    : ( countryTimeSeriesListTemp[cntry] = null )
                )
            )
        ))
        .then(()=>setCountryTimeSeriesList(countryTimeSeriesListTemp))
        .catch()
    }, [countryNameList]);

    const updateMetric = (metric) => {
        setMetricSelected(metric)
    }

    // console.log(countryTimeSeriesList)

    const pivotTimeSeries = (countryTimeSeriesList, metricselected) => {
        // console.log("pivotTimeSeries")
        // console.log(countryTimeSeriesList);
        var metricTimeSeriesTemp = {}
        countryTimeSeriesList!==undefined && Object.keys(countryTimeSeriesList).map(
            cntry => {
                countryTimeSeriesList[cntry].map(
                    date => {
                        // console.log(cntry, date);
                        if(Object.keys(metricTimeSeriesTemp).includes(date["date"])){
                            // console.log(`includes date`)
                            if(!Object.keys(metricTimeSeriesTemp[date["date"]]).includes(cntry)){
                                // console.log(`includes cntry`)
                                metricTimeSeriesTemp[date["date"]][cntry]=date[metricselected]
                                // console.log(`1 metricTimeSeriesTemp ${metricTimeSeriesTemp}`)
                            }
                        }else{
                            // console.log(`NOT includes date`)
                            metricTimeSeriesTemp[date["date"]]={}
                            metricTimeSeriesTemp[date["date"]]["date"]=date["date"]
                            metricTimeSeriesTemp[date["date"]][cntry]=date[metricselected]
                            // console.log(`2 metricTimeSeriesTemp ${metricTimeSeriesTemp}`)
                        }
                    }
                )
            }
        )
        // console.log(Object.values(metricTimeSeriesTemp));
        return Object.values(metricTimeSeriesTemp);
    }
    // pivotTimeSeries(countryTimeSeriesList);

    const renderComparisionChart = (countryTimeSeriesList, metricselected) => {
        console.log("renderChart")
        // console.log(countryTimeSeriesList)
        var data = pivotTimeSeries(countryTimeSeriesList, metricselected);
        // console.log(data)

        return(
            <ResponsiveContainer className="chartResponsiveContainer">
                <LineChart data={data}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={customToolTip}/>
                        <Legend />
                        {returnTrendLinesPerCountry()}
                </LineChart> 
            </ResponsiveContainer>
        )
    }
    const returnTrendLinesPerCountry = () => {
        return(
            countryNameList.map(
                cntry => (
                    <Line type="monotone" dataKey={cntry} stroke={colorList[countryNameList.indexOf(cntry)]} dot={false} />
                )
            )
        )
    }

    const renderSingleChart = () => {
        console.log("renderSingleChart")
        var data = countryTimeSeriesList[countryNameList[0]];
        console.log(data)

        return(
            <ResponsiveContainer className="chartResponsiveContainer">
                <LineChart data={data}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={customToolTip}/>
                        <Legend />
                        <Line type="monotone" dataKey="confirmed" stroke="blue" dot={false} />
                        <Line type="monotone" dataKey="deaths" stroke="red" dot={false} />
                        <Line type="monotone" dataKey="recovered" stroke="green" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            // : <ResponsiveContainer className="chartResponsiveContainer">Sorry, Historical data is not available for this country.</ResponsiveContainer>
        )
    }

    const customToolTip = (values) => {
        return(
            values.active && <div className="tooltip-card scroll">
            <div className="tooltip-card-header" align="left">
                <a className="tooltip-card-header-text">{moment(values.label.replace(/-/g, '/')).format("MM-DD-YYYY")}</a><br/>
                <span className="tooltip-card-header-subtitle">{moment(values.label.replace(/-/g, '/')).diff(moment("2020/01/22"), "days")} days since outbreak</span>
            </div>
            <div className="tooltip-card-body">
                <div className="table">
                    <tbody>
                        {values.payload.map(x => (
                            <tr>
                                <td align="left"><a className="tooltip-card-body-text" style={{"color":x.color}}>{x.name+": "}</a></td>
                                <td align="right"><a className="tooltip-card-body-text" style={{"color":x.color}}>{nf.format(x.value)}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>
            </div>
        )
    }

    return(
        <React.Fragment>
        {countryTimeSeriesList!==undefined && <div className="chartContainerArea">
            {!singleCountryReport && <div className="chartButtonPanel">
                <div className="row">
                    {metricselected==="confirmed" ? <div className="chartButton-enabled column" style={{"backgroundColor":"blue"}} onClick={()=> setMetricSelected("confirmed")}><a className="chartButton-Text">Cases</a></div> : <div className="chartButton column" onClick={()=> setMetricSelected("confirmed")}><a className="chartButton-Text">Cases</a></div>}
                    {metricselected==="deaths" ? <div className="chartButton-enabled column" style={{"backgroundColor":"red"}} onClick={()=> setMetricSelected("deaths")}><a className="chartButton-Text">Deaths</a></div> : <div className="chartButton column" onClick={()=> setMetricSelected("deaths")}><a className="chartButton-Text">Deaths</a></div>} 
                    {metricselected==="recovered" ? <div className="chartButton-enabled column" style={{"backgroundColor":"green"}} onClick={()=> setMetricSelected("recovered")}><a className="chartButton-Text">Recovered</a></div> : <div className="chartButton column" onClick={()=> setMetricSelected("recovered")}><a className="chartButton-Text">Recovered</a></div>}
                </div>
            </div>}
            {singleCountryReport ? (countryTimeSeriesList[countryNameList[0]]!==null ? renderSingleChart() : <a className="portal-text">Sorry, Historical data is not available for this country</a>) : renderComparisionChart(countryTimeSeriesList, metricselected)}
        </div>}
        </React.Fragment>
    )

}

export default Chart;