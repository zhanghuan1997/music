// pages/music-player/index.js
import { getMusicPlayerDetail,getMusicPlayerLyric  } from '../../service/api_music_player'
import { audioContext } from '../../store/player_store'
import { parseLyric } from '../../utils/parse_lyric'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    songDetail:{},
    lyricInfos:[],
    currentLyricText:'',
    lyricScrollTop:0,
    currentLyricIndex:0,
    durationTime:0,
    currentTime:0,
    sliderValue:0,
    currentPage:0,
    contentHeight:0,
    isSliserChanging:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    // this.setData({ id:options.id })
    this.getPageData(options.id)
    
    // 动态获取内容高度
    let screenHeight = getApp().globalData.screenHeight
    let statusBarHeight = getApp().globalData.statusBarHeight
    let navBarHeight = getApp().globalData.navBarHeight
    let contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({contentHeight})
f
    //创建播放器
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // audioContext.autoplay = true
    // audioContext.onCanplay(()=>{
    //   audioContext.play()
    // })
    audioContext.onTimeUpdate(()=>{
      let currentTime = audioContext.currentTime * 1000
      let sliderValue = currentTime / this.data.durationTime * 100
      if(!this.data.isSliserChanging)
      this.setData({sliderValue,currentTime})

      //根据当前时间曲查找播放的歌词
      for(let i = 0;i < this.data.lyricInfos.length; i++){
        const lyricInfo = this.data.lyricInfos[i]
        if(currentTime < lyricInfo.time){
          const currentIndex = i - 1
          if(this.data.currentLyricIndex !== currentIndex){
            const currentLyricInfo = this.data.lyricInfos[currentIndex]
            this.setData({ 
              currentLyricText:currentLyricInfo.text,
              currentLyricIndex:currentIndex,
              lyricScrollTop:currentIndex * 35
            })
          }
          break
        }
      }
    })
  },
  getPageData(id){
    getMusicPlayerDetail(id).then((res)=>{
      this.setData({ songDetail:res.songs[0],durationTime:res.songs[0].dt })
    })
    getMusicPlayerLyric(id).then(res=>{
      let lyricString = res.lrc.lyric
      let lyrics = parseLyric(lyricString)
      this.setData({ lyricInfos:lyrics })
    })
  },
  handleBindChange(event){
    let currentPage = event.detail.current
    this.setData({currentPage})
  },
  //滑动slider触发的事件
  handleSliderChange(event){
    //先暂停音乐
    audioContext.pause()
    //设置sliderValue值
    let sliderValue = event.detail.value
    //播放滑动到指定位置的音乐
    let currentTime =  this.data.durationTime * sliderValue / 100
    audioContext.seek(currentTime/1000)
    //设置最新的slider值
    this.setData({sliderValue,isSliserChanging:false})
  },
  // 滑块拖动过程
  handleSlderChanging(event){
    console.log(event.detail.value)
    let sliderValue = event.detail.value
    let currentTime = this.data.durationTime * sliderValue / 100
    this.setData({isSliserChanging:true,currentTime,sliderValue})
  }
})