// pages/components/song-item-v1/index.js
Component({
  properties:{
    item:{
      type:Object,
      value:{}  
    }
  },
  methods:{
    handleItemV1Click(){
      let id = this.properties.item.id
      wx.navigateTo({
        url: `../music-player/index?id=${id}`,
      })
    }
  }
})