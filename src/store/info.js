import  firebase  from 'firebase/app';
export default {

    state:{
        info:{}
    },
    mutations:{
        setinfo(state,info){
            state.info=info
        },
        clearinfo(state){
            state.info={}
        }
    },
    
    actions:{

        async updateinfo({dispatch,commit,getters},toapdate){
            try {
                const uid= await dispatch('getUid')
                const updatedata={...getters.info,...toapdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updatedata)
                commit('setinfo',updatedata)
            
            } catch (e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchinfo({dispatch,commit}){
            try {
                const uid= await dispatch('getUid')
                const info=(await firebase.database().ref(`users/${uid}/info`).once('value')).val()
                commit('setinfo',info)  
            } catch (e) {
                commit('setError',e)
                throw e
            }
             
        }
    },
    getters:{
        info:s=>s.info
    }
}