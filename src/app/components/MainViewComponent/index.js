import React from 'react';

import JhuServer from '../../api/JhuServer';

import './MainViewComponent.scss'
import HighLevelStats from './HighLevelStats';
import AllCountries from './AllCountriesComponent';
import Chart from './chart';

const MainView = (props) => {

    const selectedCountry = props.selectedCountry;
    const setSelectedCountry = props.setSelectedCountry;

    console.log(props);

    // const selectedCountryName = selectedCountry.country;

    return(
        <div className="mainViewArea">
            {/* Render Header */}
            <div className="mainViewAreaHeading" align="left">
                <div className="mainViewAreaHeadingText">
                    {selectedCountry===undefined && "Please select a country to see details"}
                    {(selectedCountry!==undefined && selectedCountry==="ALL_COUNTRIES") && "Country wise cases"}
                    {(selectedCountry!==undefined && selectedCountry!=="ALL_COUNTRIES") && selectedCountry.country}
                </div>
            </div>

            {/* Render All country stats */}
            {(selectedCountry!==undefined && selectedCountry==="ALL_COUNTRIES") && <AllCountries/>}

            {/* Render country stats */}
            {(selectedCountry!==undefined && selectedCountry!=="ALL_COUNTRIES") && <HighLevelStats countryName={selectedCountry.country}/>}

            {/* Render country chart */}
            {(selectedCountry!==undefined && selectedCountry!=="ALL_COUNTRIES") && <Chart countryNameList={[selectedCountry.country]}/>}

        </div>
    )

}

export default MainView;