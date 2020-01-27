import axios from 'axios';

const action = {

    fetchSearchResults({ commit, state }, payload) {
        return axios.get(`${process.env.baseUrl}/search?searchTerm=${payload}`);
    },
    findTorrentInfo({ commit, state }, payload) {
        const { url, torrentSource } = payload;
        return axios.get(`${process.env.baseUrl}/search/torrent?url=${url}&torrentSource=${torrentSource}`);
    },
    fetchFeeds({ commit, state }, payload) {
        return axios.get(`${process.env.baseUrl}/feed`);
    }
}

export default action;