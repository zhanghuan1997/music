// app.js
App({
  onLaunch(){
    const info = wx.getSystemInfoSync()
    console.log(info)
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.screenHeight = info.screenHeight
  },
  globalData:{
    statusBarHeight:0,
    navBarHeight:44,
    screenHeight:0
  }
})
