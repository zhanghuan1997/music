// pages/components/song-menu-area/index.js
Component({
  properties:{
    hotSongSheet:{
      type:Array,
      value:[]
    }
  },
  methods:{
    toDetailSong(event){
      let id = event.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${id}&type=menu`,
      })
    }
  }
})