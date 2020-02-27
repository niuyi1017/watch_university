const cheerio = require('cheerio')
const baseUrl = 'http://www.graduate.nuaa.edu.cn'
const newsListUrl = '/2109/list.htm'
const Utils = require('../Utils/Utils')
// getNewsList()
module.exports = {
    main: async () => {
        let url = baseUrl + newsListUrl
        return getNewsList(url)
        // let newsListOld = await getNewsList(url)
        // let compareTimes = 0
        // while (1) {
        //     await Utils.sleep(5000)
        //     let newsListNew = await getNewsList(url)
        //     console.log(newsListNew)
        //     let diffNews = Utils.compareNewsList(newsListNew, newsListOld)
        //     if (diffNews.length != 0) {
        //         newsListOld = newsListNew
        //         console.log(diffNews)
        //     } else {
        //         compareTimes++
        //         console.log(`南航已对比${compareTimes}次，暂未发现有新动态`)
        //     }
        // }
    }
}

async function getNewsList(url) {
    console.log('nuaa run1')
    let html = await Utils.getHtml(url)
    // console.log('nuaa run2')
    let $ = cheerio.load(html)
    let $trs = $('#news_list > tbody > tr')
    let ret = []
    for (let i = 0; i < $trs.length; i++) {
        let innerTr = $($trs[i]).find('tr')
        let tds = $(innerTr).find('td')
        let td1 = $(tds[1])
        let url = $(td1.find('a')[0]).attr('href')
        let title = $(tds[1]).text()
        let time = $(tds[2]).text()
        let node = {
            url: baseUrl + url,
            title,
            time
        }
        ret.push(node)
    }
    // return ret
    return new Error("粗大事了！")
}