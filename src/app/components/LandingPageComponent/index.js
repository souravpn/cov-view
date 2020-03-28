import React,{useState} from 'react';
import MainView from '../MainViewComponent';
import SideViewComponent from '../SideViewComponent';
import FooterComponent from '../FooterComponent';
import Header from '../HeaderComponent';

const LandingPage = () => {

    const [selectedCountry, setSelectedCountry] = useState(undefined);

    console.log("Welcome to cov-view website. Designed to update you on covid-19.");

    return(
        <div>
            <SideViewComponent 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry}/>
            <Header />
            <MainView 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry}/>

            <FooterComponent />
        </div>
    )

}

export default LandingPage;