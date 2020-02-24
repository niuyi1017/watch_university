const cheerio = require('cheerio')
const baseUrl = 'https://yz.chsi.com.cn'
const Utils = require('../Utils/Utils')
// getNewsList()
module.exports = {
    main: async () => {
        let newsListOld = await getNewsList(baseUrl)
        let compareTimes = 0
        while(1){
            await Utils.sleep(5000)
            let newsListNew = await getNewsList(baseUrl)

            console.log(newsListNew)
            let diffNews = Utils.compareNewsList(newsListNew,newsListOld)
            if(diffNews.length != 0){
                newsListOld = newsListNew
                console.log(diffNews)
            }else{
                compareTimes ++ 
                console.log(`研招网已对比${compareTimes}次，暂未发现有新动态`)
            }
        }
    }
}
async function getNewsList(url) {
    let html = await Utils.getHtml(url)
    let $ = cheerio.load(html)
    let $as = $('.index-hot a')
    let ret = []
    for(let i = 0;i < $as.length; i++ ){
        let $item = $($as[i])
        let node = {
            title: $item.text(),
            url: baseUrl + $item.attr('href')
        }
        ret.push(node)
    }
    let $hotListAs = $('.hot-list a')
    for(let i = 0;i < $hotListAs.length; i++ ){
        let $item = $($hotListAs[i])
        let node = {
            title: $item.text(),
            url: baseUrl + $item.attr('href')
        }
        ret.push(node)
    }
    return ret
}