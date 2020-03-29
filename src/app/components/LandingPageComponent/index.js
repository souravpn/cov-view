import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainView from '../MainViewComponent';
import ComparisonChart from '../MainViewComponent/ComparsionChart.jsx';
import SideViewComponent from '../SideViewComponent';
import FooterComponent from '../FooterComponent';
import Header from '../HeaderComponent';

const LandingPage = () => {

    const [selectedCountry, setSelectedCountry] = useState("ALL_COUNTRIES");

    console.log("Welcome to cov-view website. Designed to update you on covid-19.");

    return(
        <div>
            <SideViewComponent 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry}/>
            <Header />
            <Router>
                <Switch>
                    <Route path="/" render={(props) => <MainView {...props} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>} />
                    <Route path="/ALL_COUNTRIES" render={(props) => <MainView {...props} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>} />
                    <Route path="/compare-countries/:cntrycmparetext" render={(props) => <ComparisonChart {...props}/>} />
                </Switch>
            </Router>
            {/* <MainView selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/> */}

            <FooterComponent />
        </div>
    )

}

export default LandingPage;