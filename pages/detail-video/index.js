// pages/detail-video/index.js
import { getMvDetail, getMvUrl, getMvRelated } from '../../service/api_videos'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mvUrl:'',
    mvDetail:{},
    mvRelated:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id 
    this.getAllMvInterface(id)
  },
  getAllMvInterface(id){
    getMvDetail(id).then(res=>{
      this.setData({ mvDetail:res.data })
    })
    getMvUrl(id).then(res=>{
      this.setData({ mvUrl:res.data.url })
    })
    getMvRelated(id).then(res=>{
      this.setData({ mvRelated:res.data })
    })
  }
})