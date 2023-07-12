const { HYEventStore } = require("hy-event-store")
import { getRankings } from '../service/api_music'
const rankingStore = new HYEventStore({
  state: {
    hotRankings:{}, //热歌榜
    newRankings:{}, //新歌榜
    originalRankings:{}, //原创榜
    upRankings:{}  //飙升榜
  },
  actions: {
    getRankingDataAction(ctx) {
      // 热歌 id=3778678
      getRankings(3778678).then(res => {
        ctx.hotRankings = res.playlist
      })
      // 新歌 id=3779629
      getRankings(3779629).then(res => {
        ctx.newRankings = res.playlist
      })
      // 原创 id=2884035
      getRankings(2884035).then(res => {
        ctx.originalRankings = res.playlist
      })
      // 飙升 id=19723756
      getRankings(19723756).then(res => {
        ctx.upRankings = res.playlist
      })
    }
  }
})

export default rankingStore