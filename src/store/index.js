import {createStore} from "vuex";

export default createStore({
    state: () => ({
        isAuth: false,
        isAuthAdmin: false,
        clients: [],
        user: []
    }),
    getters: {
        getIsAuth(state){
            return state.isAuth
        },
        getIsAuthAdmin(state){
            return state.isAuthAdmin
        },
        getUser(state){
            return state.user
        }
    },
    mutations: {
        setClients(state, clients){
            state.clients = clients;
        },
        setUser(state, user){
            state.user = user;
        }
    },
    actions: {
        changeIsAuth(){
            this.state.isAuth = !this.state.isAuth
        },
        changeIsAuthAdmin(){
            this.state.isAuthAdmin = !this.state.isAuthAdmin
        },
        createUser(user){
            this.state.user = user
        }
    }
})

