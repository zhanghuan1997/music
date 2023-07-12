// pages/detail-songs/index.js
import { rankingStore } from '../../store/index'
import { getSongSheetDetail } from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingName:'',
    songRanks:[],
    songInfo:{},
    title:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRankingSongs(options)
    this.setData({ type:options.type })
    this.setData({ title:options.rankingName })
  },
  getRankingSongs(options){
    if(options.rankingName === "热歌榜"){
      this.setData({rankingName:'hotRankings'})
      rankingStore.onState(this.data.rankingName,this.getRankingDataHanlder)
    }else if (options.rankingName === "新歌榜"){
      this.setData({rankingName:'newRankings'})
      rankingStore.onState(this.data.rankingName,this.getRankingDataHanlder)
    }else if(options.rankingName === "原创榜"){
      this.setData({rankingName:'originalRankings'})
      rankingStore.onState(this.data.rankingName,this.getRankingDataHanlder)
    }else if(options.rankingName === "飙升榜"){
      this.setData({rankingName:'upRankings'})
      rankingStore.onState(this.data.rankingName,this.getRankingDataHanlder)
    }else if(options.type === "menu"){
      getSongSheetDetail(options.id).then(res=>{
        this.setData({songRanks:res.playlist.tracks})
        this.setData({songInfo:res.playlist})
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // rankingStore.offState(this.data.rankingName,this.getRankingDataHanlder)
  },
  getRankingDataHanlder(value){
    this.setData({songRanks:value.tracks})
  }
})