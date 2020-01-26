import axios from 'axios';

const action = {

    fetchSearchResults({ commit, state }, payload) {
        return axios.get(`${process.env.baseUrl}/search?searchTerm=${payload}`);
    },
    

}

export default action;