// import VuexPersist from 'vuex-persist';

// const vuexLocalStorage = new VuexPersist({
//     key: 'nuxt-ideas',
//     storage: window.localStorage,
//     reducer: state => ({
//         user: state.user,
//         jwt: state.jwtToken,
//         isLoggedIn: state.isLoggedIn
//     })
// })

import state from './state.js'
import mutation from './mutations.js'
import action from './actions.js'

export default {
    state,
    mutation,
    action,
    // plugins: [vuexLocalStorage.plugin]
}