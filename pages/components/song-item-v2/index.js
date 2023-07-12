// pages/components/song-item-v2/index.js
Component({
  properties:{
    item:{
      type:Object,
      value:{} 
    },
    index:{
      type:Number,
      value:0
    }
  },
  methods:{
    handleItemV2Click(){
      let id = this.properties.item.id
      wx.navigateTo({
        url: `../music-player/index?id=${id}`,
      })
    }
  }
})