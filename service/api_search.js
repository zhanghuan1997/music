import zhRequest from './index'
//搜索关键词接口
export function getSearchKey(){
  return zhRequest.get('search/hot')
}

//获取搜索建议列表
export function getSearchSuggest(keywords,type){
  return zhRequest.get('search/suggest',{
    keywords,
    type
  })
}
//根据关键字获取搜索结果
export function getSearchResult(keywords){
  return zhRequest.get('search',{
    keywords
  })
}
