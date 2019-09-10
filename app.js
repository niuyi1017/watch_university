const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'http://www.graduate.nuaa.edu.cn'
const newsListUrl = '/2109/list.htm'


// getNewsList()
main()
function main(){
    let diffNews = getDiffNews()
    if(diffNews.length != 0){
        
    }
}
async function getDiffNews(){
    let newsListOld = await getNewsList()
    await sleep(5000)
    let newsListNew = await getNewsList()
    let diffNews =  compareNewsList(newsListNew,newsListOld)
    return diffNews
}
function compareNewsList(newsListNew,newsListOld){
    let result = []
    for(let i = 0;i < newsListNew.length; i++) {
        if(newsListNew[i].title !== newsListOld[i].title){
            result.push(newsListNew[i])
        }
    }
    return result
}
async function sleep(time) {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,time)
    })
}

// 获取新闻列表json
async function getNewsList(){  
    let newsList = ''
    let html = await getHtml()
    newsList = filterHtml(html)
    return newsList
}
function getHtml(){
    return axios.get(baseUrl + newsListUrl)
         .then((res) => {
            return Promise.resolve(res.data)   
    })
}
function filterHtml(html){
    let $ = cheerio.load(html)
    let $trs = $('#news_list > tbody > tr')
    let ret = []
    for(let i = 0; i< $trs.length; i++){
        let innerTr =  $($trs[i]).find('tr')
        let tds = $(innerTr).find('td')
        let td1  = $(tds[1])
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
    return ret
}