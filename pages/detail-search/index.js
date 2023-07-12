// pages/detail-search/index.js
import { getSearchKey,getSearchSuggest,getSearchResult } from '../../service/api_search'
import debounce from '../../utils/debounce'
const debounceSearchChange = debounce(getSearchSuggest,300)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWords:[],
    searchValue:'',
    suggestSongs:[],
    resultSongs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSearchData()
  },
  getSearchData(){
    getSearchKey().then((res)=>{
      this.setData({hotKeyWords:res.result.hots})
    })
  },
  // 搜索框输入触发
  searchChange(event){
    let keywords = event.detail
    let type = "mobile"
    this.setData({searchValue:keywords})
    console.log(keywords)
    if(!keywords.length){
      this.setData({ suggestSongs:[],resultSongs:[] })
      debounceSearchChange.cancel()
      return
    }
    debounceSearchChange(keywords,type).then((res)=>{
      this.setData({suggestSongs:res.result.allMatch})
    })
  },
  // 点击确定按钮触发
  searchResult(){
    let keywords = this.data.searchValue
    getSearchResult(keywords).then((res)=>{
      this.setData({ resultSongs:res.result.songs })
    })
  },
  //搜索建议列表点击后触发
  handleSuggestItemClick(event){
    let keywords = event.currentTarget.dataset.item.keyword
    this.setData({searchValue:keywords})
    getSearchResult(keywords).then((res)=>{
      this.setData({ resultSongs:res.result.songs })
    })
  },
  // 热门搜索点击后触发
  handleHotSearchClick(event){
    let keywords = event.currentTarget.dataset.item.first
    this.setData({searchValue:keywords})
    getSearchResult(keywords).then((res)=>{
      this.setData({ resultSongs:res.result.songs })
    })
  }
})