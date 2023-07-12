// pages/components/area-header/index.js
Component({
  properties:{
    title:{
      type:String,
      value:"默认标题"
    },
    rightText:{
      type:String,
      value:'更多'
    },
    showRightMore:{
      type:Boolean,
      value: true
    }
  },
  methods:{
    handleRight(){
      this.triggerEvent("click")
    }
  }
})