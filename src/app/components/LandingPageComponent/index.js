import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainView from '../MainViewComponent';
import ComparisonChart from '../MainViewComponent/ComparsionChart.jsx';
import HighLevelStats from '../MainViewComponent/HighLevelStats.jsx';
import Acknowledgement from '../MainViewComponent/Acknowledgement.jsx';
import HomeScreen from '../MainViewComponent/HomeScreen.jsx';

import ErrorPage from './ErrorPage.jsx';

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
                    {/* <Route exact path="/" render={(props) => <MainView {...props} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>} /> */}
                    <Route exact path="/" render={(props) => <HomeScreen/>} />
                    <Route exact path="/ack" render={(props) => <Acknowledgement/>} />
                    <Route exact path="/compare-countries/:cntrycmparetext" render={(props) => <ComparisonChart {...props}/>} />
                    <Route exact path="/country/:country" render={(props) => <MainView {...props} />} />
                    {/* <Route exact path="/error" render={(props) => <ErrorPage/>} /> */}
                </Switch>
            </Router>
            <FooterComponent />
        </div>
    )

}

export default LandingPage;