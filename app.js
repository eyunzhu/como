//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null,
     HOST: "https://wc2.bt.eyunzhu.com/"
  // HOST:"http://127.0.0.1/como-server",
  }
})