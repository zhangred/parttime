//app.js
App({
  onLaunch: function (opts) {
    /*适配iPhone X*/
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (/iphone\S{0,2}\s*x{1}/i.test(res.model)) {
          that.globalData.isIphoneX = true
        }
      }
    })　
    
  },
  globalData: {
    userInfo: {
      avatarUrl: 'http://vcl-pictures.qiniucdn.com/Fj9vaILhuFQRFsf3b5eaPUNiXqVm',
      nickName: '匿名'
    },
    isIphoneX:false
  }
})