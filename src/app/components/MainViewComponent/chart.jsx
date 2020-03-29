import React,{useEffect, useState} from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'

const Chart = (props) => {

    console.log("chart..");

    const countryNameList = props.countryNameList;
    const singleCountryReport = props.countryNameList.length===1 ? true : false;

    const [countryTimeSeriesList, setCountryTimeSeriesList] = useState(undefined)
    const [metricselected, setMetricSelected] = useState("cases");
    const [metricTimeSeries, setMetricTimeSeries] = useState(undefined)

    const colorList = ["red","green","blue","orange","pink"];

    console.log(`Chart ${countryNameList}`)

    const cureatedCountry = (cntry) => {
        let newCntry = (cntry==="USA" ? "US" : cntry);
        return newCntry;
    }

    useEffect(()=>{
        var countryTimeSeriesListTemp = {};
        JhuServer.getHistoricalStatsByCountry()
        .then(response => (
            countryNameList.map(
                cntry => {
                    if(Object.keys(response.data).includes(cureatedCountry(cntry))) { countryTimeSeriesListTemp[cntry] = response.data[cureatedCountry(cntry)] }
                }
            )
        ))
        .then(()=>setCountryTimeSeriesList(countryTimeSeriesListTemp))
        .catch()
    }, [countryNameList]);

    const updateMetric = (metric) => {
        setMetricSelected(metric)
    }

    // console.log(countryTimeSeriesList)

    const pivotTimeSeries = (countryTimeSeriesList) => {
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
                                metricTimeSeriesTemp[date["date"]][cntry]=date["confirmed"]
                                // console.log(`1 metricTimeSeriesTemp ${metricTimeSeriesTemp}`)
                            }
                        }else{
                            // console.log(`NOT includes date`)
                            metricTimeSeriesTemp[date["date"]]={}
                            metricTimeSeriesTemp[date["date"]]["date"]=date["date"]
                            metricTimeSeriesTemp[date["date"]][cntry]=date["confirmed"]
                            // console.log(`2 metricTimeSeriesTemp ${metricTimeSeriesTemp}`)
                        }
                    }
                )
            }
        )
        // console.log(Object.values(metricTimeSeriesTemp));
        return Object.values(metricTimeSeriesTemp);
    }
    pivotTimeSeries(countryTimeSeriesList);

    const renderComparisionChart = (countryTimeSeriesList) => {
        console.log("renderChart")
        // console.log(countryTimeSeriesList)
        var data = pivotTimeSeries(countryTimeSeriesList);
        // console.log(data)

        return(
            <ResponsiveContainer className="chartResponsiveContainer">
                <LineChart data={data}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
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
                    <Line type="monotone" dataKey={cntry} stroke="black" />
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
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="confirmed" stroke="blue" />
                        <Line type="monotone" dataKey="deaths" stroke="red" />
                        <Line type="monotone" dataKey="recovered" stroke="green" />
                </LineChart> 
            </ResponsiveContainer>
        )
    }

    return(
        <React.Fragment>
        {countryTimeSeriesList!==undefined && <div className="chartContainerArea">
            <div className="chartButtonPanel">buttons</div>
            {singleCountryReport ? renderSingleChart() : renderComparisionChart(countryTimeSeriesList)}
        </div>}
        {/* {!singleCountryReport && <div className="chartContainerArea">
            <div className="chartButtonPanel">buttons</div>
            {singleCountryReport ? renderSingleChart() : renderComparisionChart(countryTimeSeriesList)}
        </div>} */}
        </React.Fragment>
    )

}

export default Chart;