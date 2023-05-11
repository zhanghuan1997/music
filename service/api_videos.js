import zhRequest from './index'
//获取视频页面列表
export function getTopMV(offset,limit=10){
  return zhRequest.get('top/mv',{
    offset,
    limit
  })
}
//获取点击点个视频对应的mv数据
export function getMvDetail(mvid){
  return zhRequest.get('/mv/detail',{
    mvid
  })
}
//获取视频播放地址
export function getMvUrl(mvid){
  return zhRequest.get('/mv/url',{
    id
  })
}
//获取相关视频信息
export function getMvRelated(mvid){
  return zhRequest.get('/related/allvideo',{
    id
  })
}