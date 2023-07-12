import zhRequest from './index'
//获取轮播图
export function getBannerMusic(type){
  return zhRequest.get('banner',{
    type
  })
}
//获取推荐歌曲（热门）
export function getRankings(id){
  return zhRequest.get('playlist/detail',{
    id
  })
}
//获取歌单
export function getSongSheet(cat="全部",limit=6,offset=0){
  return zhRequest.get('top/playlist',{
    cat,
    limit,
    offset
  })
}
//华语歌单
export function getSongSheetCN(cat="华语",limit=6,offset=0){
  return zhRequest.get('top/playlist',{
    cat,
    limit,
    offset
  })
}
// 根据歌单id 获取歌单歌曲列表
export function getSongSheetDetail(id){
  return zhRequest.get('playlist/detail',{
      id
  })
}