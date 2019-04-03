import axios from 'axios';

const apiKey = require('../../secret/secret').riotApiKey;
const rootRiotApiLink = 'https://na1.api.riotgames.com';

export function getLeaguePositionsAllQueues(encSummonerId) {

    return axios.get(`${rootRiotApiLink}/lol/league/v4/positions/by-summoner/${encSummonerId}?api_key=${apiKey}`)
    
}