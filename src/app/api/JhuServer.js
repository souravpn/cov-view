import axios from 'axios';

class JhuServer {

    getHighLevelStats(){
        return axios.get(`https://corona.lmao.ninja/v2/all`);
    }

    getStatsByAllCountry(){
        return axios.get(`https://corona.lmao.ninja/v2/countries?sort=country`);
    }

    getStatsBySpecificCountry(country){
        return axios.get(`https://corona.lmao.ninja/v2/countries/${country}`);
    }

    getStatsByUSStates(){
        return axios.get(`https://corona.lmao.ninja/v2/states`);
    }

    getStatsByUSDetails(){
        return axios.get(`https://corona.lmao.ninja/v2/jhucsse`);
    }

    getHistoricalStats(){
        return axios.get(`https://corona.lmao.ninja/v2/historical`);
    }

    getHistoricalStatsByCountry(){
        return axios.get(`https://pomber.github.io/covid19/timeseries.json`);
    }
}

export default new JhuServer();
