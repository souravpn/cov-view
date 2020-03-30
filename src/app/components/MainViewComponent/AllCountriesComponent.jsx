import React, {useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'
import Chart from './chart';

const AllCountries = () => {
    // console.log(this.props);
    var nf = new Intl.NumberFormat();
    
    const[allCountryList, setAllCountryList] = useState(undefined);
    const[comparisionKey, setComparisionKey] = useState("cases");
    const[comparisionKeyAsc, setComparisionKeyAsc] = useState(false);

    const[countryComparisionList, setCountryComparisionList] = useState([]);
    const[comparisonChartEnabled, setComparisonChartEnabled] = useState(false);
    
    const updateCountryComparisionList = (val) => {
        let countryComparisionListTemp = countryComparisionList;
        countryComparisionListTemp.includes(val) ? countryComparisionListTemp.pop(val) : countryComparisionListTemp.push(val)
        setCountryComparisionList(countryComparisionListTemp);
    }

    useEffect(() => {
        JhuServer.getStatsByAllCountry()
        .then(response => setAllCountryList(response.data))
        .catch()
    }, [])

    console.log(allCountryList)

    const updateComparsionKey = (value) => {
        console.log(`new key = ${value}`)
        if(comparisionKey===value){
            setComparisionKeyAsc(!comparisionKeyAsc);
        }else{
            setComparisionKey(value);
            setComparisionKeyAsc(false)
        }
    }

    const compare = (a,b) => {
        switch(comparisionKey){
            case "country":
                if(!comparisionKeyAsc){
                    if(a.country > b.country) return -1; else return 1;
                }else{
                    if(a.country > b.country) return 1; else return -1;
                }
                break;
            case "deaths":
                if(!comparisionKeyAsc){
                    if(a.deaths > b.deaths) return -1; else return 1;
                }else{
                    if(a.deaths > b.deaths) return 1; else return -1;
                }
                break;
            case "deathsToday":
                if(!comparisionKeyAsc){
                    if(a.todayDeaths > b.todayDeaths) return -1; else return 1;
                }else{
                    if(a.todayDeaths > b.todayDeaths) return 1; else return -1;
                }
                break;
            case "critical":
                if(!comparisionKeyAsc){
                    if(a.critical > b.critical) return -1; else return 1;
                }else{
                    if(a.critical > b.critical) return 1; else return -1;
                }
                break;
            case "recovered":
                if(!comparisionKeyAsc){
                    if(a.recovered > b.recovered) return -1; else return 1;
                }else{
                    if(a.recovered > b.recovered) return 1; else return -1;
                }
                break;
            case "active":
                if(!comparisionKeyAsc){
                    if(a.active > b.active) return -1; else return 1;
                }else{
                    if(a.active > b.active) return 1; else return -1;
                }
                break;
            case "casesToday":
                if(!comparisionKeyAsc){
                    if(a.todayCases > b.todayCases) return -1; else return 1;
                }else{
                    if(a.todayCases > b.todayCases) return 1; else return -1;
                }
                break;
            default:
                if(!comparisionKeyAsc){
                    if(a.cases > b.cases) return -1; else return 1;
                }else{
                    if(a.cases > b.cases) return 1; else return -1;
                }
                break;
        }
    }


    const renderTableContent = (value) => {
        // console.log("renderTableContent")
        return(
            value.map(
                cntry => (
                    <tr className="allCountryTableRow">
                        <td className="allCountryTableCol"><input type="checkbox" onClick={()=>updateCountryComparisionList(cntry.country)}/></td>
                        <td className="allCountryTableCol" align="left"><a className="allCountryTableText" style={{"color":"black", "fontSize": "1em"}}>{cntry.country}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"blue"}}>{nf.format(cntry.cases)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"blue"}}>{nf.format(cntry.todayCases)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"red"}}>{nf.format(cntry.deaths)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"red"}}>{nf.format(cntry.todayDeaths)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"orange"}}>{nf.format(cntry.critical)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"green"}}>{nf.format(cntry.recovered)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"pink"}}>{nf.format(cntry.active)}</a></td>
                    </tr>
                )
            )
        )
    }

    const redirectToCntryComparison = (countryComparisionList) => {
        let compString = countryComparisionList.join("&")
        // this.props.history.push(`/compare-countries/${compString}`);
        // window.location.href = `/compare-countries/${compString}`
        window.open(`/compare-countries/${compString}`);
    }

    // const showCntryComparison = (countryComparisionList) => {
        
    // }

    return(
        <React.Fragment>
            
            {/* {comparisonChartEnabled && <Chart countryNameList={countryComparisionList}/>} */}
             
            {/* comparison header */}
            {!comparisonChartEnabled && <div className="countryComparisionHeader">
                <div className="countryComparisionPanel">
                    <div className="countryComparisionButton" onClick={()=>redirectToCntryComparison(countryComparisionList)}>
                        <a className="countryComparisionText">{countryComparisionList.length>1 ? "Compare" : "Select Countries to compare cases"}</a>
                    </div>
                    {countryComparisionList.length>1 && <div className="countryComparisionList" align="left">
                        <a className="countryComparisionListText">Queued for comparision: {countryComparisionList.map(x => <a>{x},</a>)}</a>
                    </div>}
                </div>
            </div>}

            {/* All country Table */}
            {!comparisonChartEnabled && <div className="allCountryTableArea">
                {allCountryList===undefined && "Loading Country wise data..."}
                {allCountryList!==undefined && <table className="allCountryTable">
                    <thead>
                        <tr className="allCountryTableRowHeader">
                            <th className="allCountryTableColHeader"><input type="checkbox" onClick={()=>console.log("all selected")}/></th>
                            <th className="allCountryTableColHeader" align="left" onClick={()=>updateComparsionKey("country")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Country</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("cases")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Total Cases</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("casesToday")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Today</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("deaths")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Deaths</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("deathsToday")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Today</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("critical")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Critical</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("recovered")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Recovered</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("active")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Total Active</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableContent(allCountryList.sort(compare))}
                    </tbody>
                </table>}
            </div>}
        </React.Fragment>
    )

}

export default withRouter(AllCountries);