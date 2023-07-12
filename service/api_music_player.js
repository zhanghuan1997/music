import zhRequest from './index'
//根据歌曲id 获取歌曲详情
export function getMusicPlayerDetail(ids){
  return zhRequest.get('song/detail',{
    ids
  })
}

//根据id获取对应的歌词
export function getMusicPlayerLyric(id){
  return zhRequest.get('lyric',{
    id
  })
}