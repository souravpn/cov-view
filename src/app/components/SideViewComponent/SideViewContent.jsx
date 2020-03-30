import React,{useState, useEffect} from 'react';

import JhuServer from '../../api/JhuServer';

import './SideViewComponent.scss';

const SideViewContent = (props) => {

    const selectedCountry = props.selectedCountry;
    const setSelectedCountry = props.setSelectedCountry;

    const[countryList, setCountryList] = useState(undefined);

    useEffect(() => {
        JhuServer.getStatsByAllCountry()
        .then(
            response => setCountryList(response.data)
        )
    }, []);

    const compare = (a,b) => {
        if(a.country > b.country) return 1; else return -1;
    }

    return(
        <div className="sideViewContentArea">

            {/* As long as data is not fected, show loading... */}
            {countryList===undefined && <h5>Loading...</h5>}
            
            {/* If no data is fetched, show No Countries */}
            {(countryList!==undefined && countryList.length===0) && <h5>No Countries</h5>}

            {/* All countries */}
            {(countryList!==undefined && countryList.length>0) && 
                <div className="row sideViewContentRow">
                    <div className="sideViewContentIcon">
                        {/* <img className="sideViewContentIconContent" src={cntry.countryInfo.flag}/> */}
                    </div>
                    <div className="sideViewContentItems" align="left" onClick={()=>(window.location.href=`/country/ALL_COUNTRIES`)}>
                        <h5 className="sideViewContentItemsText">
                            All Countries
                        </h5>
                    </div>
                </div>
            }

            {/* country list */}
            {(countryList!==undefined && countryList.length>0) && countryList.sort(compare).map(
                cntry => 
                <div className="row sideViewContentRow">
                    <div className="sideViewContentIcon">
                        {/* <img className="sideViewContentIconContent" src={cntry.countryInfo.flag}/> */}
                    </div>
                    {/* <div className="sideViewContentItems" align="left" onClick={()=>setSelectedCountry(cntry)}> */}
                    <div className="sideViewContentItems" align="left" onClick={()=>(window.location.href=`/country/${cntry.country}`)}>
                        <h5 className="sideViewContentItemsText">
                            {/* <img src={cntry.countryInfo.flag}/> */}
                            {cntry.country}
                        </h5>
                    </div>
                </div>
            )}
        </div>
    )

}

export default SideViewContent;