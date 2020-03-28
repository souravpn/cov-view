import axios from 'axios';

class JhuServer {

    getHighLevelStats(){
        return axios.get(`https://corona.lmao.ninja/all`);
    }

    getStatsByAllCountry(){
        return axios.get(`https://corona.lmao.ninja/countries?sort=country`);
    }

    getStatsBySpecificCountry(country){
        return axios.get(`https://corona.lmao.ninja/countries/${country}`);
    }

    getStatsByUSStates(){
        return axios.get(`https://corona.lmao.ninja/states`);
    }

    getStatsByUSDetails(){
        return axios.get(`https://corona.lmao.ninja/jhucsse`);
    }

    getHistoricalStats(){
        return axios.get(`https://corona.lmao.ninja/v2/historical`);
    }
}

export default new JhuServer();