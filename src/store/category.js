import firebase  from 'firebase/app';
export default {
    actions:{
            async fetchcategory({dispatch,commit}){
                try {
                    const uid= await dispatch('getUid')
                   const categoryes= (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}
                    const categs=[]
                    Object.keys( categoryes).forEach(cat => {
                        categs.push({
                            title:categoryes[cat].title,
                            limite:categoryes[cat].limite,
                            id:cat
                        })
                    })
                    return(categs)
                } catch (e) {
                    commit('setError',e)
                    throw e
                }
            },
            async fetchcategoribyid({dispatch,commit},id){
                try {
                    const uid= await dispatch('getUid')
                    const categori= (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {}
                    
                    return {
                        ...categori,id
                    }
                } catch (e) {
                    commit('setError',e)
                    throw e
                }
            },

            async updatecategory({dispatch,commit},{title,limite,id}){
                try {
                    const uid= await dispatch('getUid')
                    await firebase.database().ref(`users/${uid}/categories`).child(id).update({title,limite})
                } catch (e) {
                    commit('setError',e)
                    throw e
                }
            },


        async createcategory({dispatch,commit},{title,limite}){
            try {
                const uid= await dispatch('getUid')
               const category= await firebase.database().ref(`users/${uid}/categories`).push({title,limite})
                return {title,limite,id:category.key}
            } catch (e) {
                commit('setError',e)
                throw e
            }
        }
    }
}