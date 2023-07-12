// 匹配正则
let timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString){
  const lyricStrings = lyricString.split("\n")
  const lyricInfos = []
  for(let lineString of lyricStrings){
    let timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    // 获取时间
    let minute = timeResult[1] * 60 * 1000 
    let second = timeResult[2] * 1000
    let millsecoundTime = timeResult[3]
    let millsecond = millsecoundTime.length === 2 ? millsecoundTime * 10: millsecoundTime * 1
    let time = minute + second + millsecond
    //获取歌词
    let text = lineString.replace(timeRegExp,"")
    lyricInfos.push({ time, text })
  }
  return lyricInfos
}