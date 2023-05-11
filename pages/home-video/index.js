// pages/home-video/index.js
import { getTopMV } from '../../service/api_videos'
Page({
  data: {
    mvList:[],
    hasMore:true
  },
   onLoad() {
    this.getMvList(0)
  },
   onReachBottom(){
    this.getMvList(this.data.mvList.length)
  },
   onPullDownRefresh(){
    this.getMvList(0)
  },
  async getMvList(offset){
  if(!this.data.hasMore) return
  wx.showNavigationBarLoading()
  const res = await getTopMV(offset)
   if(offset===0){
    this.setData({ mvList:res.data })
    wx.stopPullDownRefresh()
   }else{
    this.setData({mvList:this.data.mvList.concat(res.data)})
    this.setData({ hasMore : res.hasMore})
   }
   wx.hideNavigationBarLoading()
  },
  handleVideoItemClick(event){
    let id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url:`../detail-video/index?id=${id}`
    })
  }
})