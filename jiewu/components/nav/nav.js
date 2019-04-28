var app = getApp();
Component({
  options: {
    multipleSlots: true
  },
  data: {
    isipx:app.globalData.isIphoneX
  },
  properties:{
    actab: String,
    cartnumber: { 
      type: Number, 
      value: 0
    },
  },
  ready:function(){
  },
  methods:{
    
  }
})

