import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
    key: 'torrents-app',
    // storage: window.localStorage,
    reducer: state => ({
        torrentToSearch: state.torrentToSearch
    })
})

import state from './state.js'
import mutation from './mutations.js'
import action from './actions.js'

export default {
    state,
    mutation,
    action,
    // plugins: [vuexLocalStorage.plugin]
}