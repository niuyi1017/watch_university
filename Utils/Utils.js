const axios = require('axios')

module.exports = {
    sleep : async (time) => {
        return new Promise((resolve,reject) => {
            setTimeout(resolve,time)
        })
    },
    getHtml( url ){
        return axios.get(url)
             .then((res) => {
                return Promise.resolve(res.data)   
        })
    },
    compareNewsList: (newsListNew,newsListOld) => {
        let result = []
        for(let i = 0;i < newsListNew.length; i++) {
            if(newsListNew[i].title !== newsListOld[i].title){
                result.push(newsListNew[i])
            }
        }
        return result
    },
    

    
}