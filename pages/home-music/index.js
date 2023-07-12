// pages/home-music/index.js
import { getBannerMusic ,getSongSheet, getSongSheetCN } from '../../service/api_music'
import   queryRect   from '../../utils/query_rect'
import { rankingStore } from '../../store/index'
Page({ 
  data:{
    banners:[],
    swiperHeight:'',
    recommendSongs:[],
    hotSongSheet:[],
    hotSongSheetCN:[],
    rankings:[]
  },
  onLoad() {
    this.getPageData()
    rankingStore.dispatch('getRankingDataAction')
    rankingStore.onState('hotRankings',(value)=>{
      if(!value.tracks) return
      const recommendSongs = value.tracks.slice(0,6)
      this.setData({recommendSongs})
    })
    rankingStore.onState('newRankings',this.getRankingHandler)
    rankingStore.onState('originalRankings',this.getRankingHandler)
    rankingStore.onState('upRankings',this.getRankingHandler)
  },
  onUnload(){
    rankingStore.offState('hotRankings')
  },
  //获取页面信息
  getPageData(){
    getBannerMusic(1).then(res=>{
      this.setData({banners:res.banners})
    })
    getSongSheet().then(res=>{
      this.setData({ hotSongSheet:res.playlists })
    })
    getSongSheetCN().then(res=>{
      this.setData({ hotSongSheetCN:res.playlists })
    })
  },

  // 点击搜索跳转搜索页面
  handleSearchClick(){
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  //轮播图 图片加载完成时 计算高度使轮播图片高度与swiper高度相等
   handleSwiperImageLoaded(){
    queryRect(".image").then(res=>{
      this.setData({ swiperHeight:res[0].height })
    })
  },
  //获取巅峰榜所要展示的数据 进行初始化
  getRankingHandler(value){
      if(!value.tracks) return
      let name = value.name
      let coverImgUrl = value.coverImgUrl
      let songList = value.tracks.slice(0,3)
      let playCount = value.playCount
      let id = value.id
      const rankingObj = { name, coverImgUrl, songList, playCount,id }
      const originRankings = [...this.data.rankings]
      originRankings.push(rankingObj)
      this.setData({ rankings:originRankings })
  },
  handleRecommendSong(){
    this.navigateToDetailSongPage("热歌榜")
  },
  navigateToDetailSongPage(rankingName){
    wx.navigateTo({
      url: `../detail-songs/index?rankingName=${rankingName}&type=rank`,
    })
  },
  peakGo(event){
    let rankingName = event.target.dataset.item.name
    wx.navigateTo({
      url: `../detail-songs/index?rankingName=${rankingName}&type=rank`,
    })
  }
})