import React, {useState,useEffect} from 'react';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'

const AllCountries = () => {

    var nf = new Intl.NumberFormat();
    
    const[allCountryList, setAllCountryList] = useState(undefined);
    const[comparisionKey, setComparisionKey] = useState("cases");
    const[comparisionKeyAsc, setComparisionKeyAsc] = useState(false);

    useEffect(() => {
        JhuServer.getStatsByAllCountry()
        .then(response => setAllCountryList(response.data))
        .catch()
    }, [allCountryList])

    // console.log(allCountryList)

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
                        <td className="allCountryTableCol" align="left"><a className="allCountryTableText" style={{"color":"black", "fontSize": "1em"}}>{cntry.country}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"blue"}}>{nf.format(cntry.cases)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"red"}}>{nf.format(cntry.deaths)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"orange"}}>{nf.format(cntry.critical)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"green"}}>{nf.format(cntry.recovered)}</a></td>
                        <td className="allCountryTableCol" align="right"><a className="allCountryTableText" style={{"color":"pink"}}>{nf.format(cntry.active)}</a></td>
                    </tr>
                )
            )
        )
    }

    return(
        <React.Fragment>
            {/* All country Table */}
            <div className="allCountryTableArea">
                {allCountryList===undefined && "Loading Country wise data..."}
                {allCountryList!==undefined && <table className="allCountryTable">
                    <thead>
                        <tr className="allCountryTableRowHeader">
                            <th className="allCountryTableColHeader" align="left" onClick={()=>updateComparsionKey("country")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Country</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("cases")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Total Cases</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("deaths")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Deaths</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("critical")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Critical</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("recovered")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Recovered</a></th>
                            <th className="allCountryTableColHeader" align="right" onClick={()=>updateComparsionKey("active")}><a className="allCountryTableTextHeader" style={{"color":"black"}}>Total Active</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableContent(allCountryList.sort(compare))}
                    </tbody>
                </table>}
            </div>
        </React.Fragment>
    )

}

export default AllCountries;