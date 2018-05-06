//index.js
//获取应用实例
var app = getApp()
const HOST = getApp().globalData.HOST

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    var that=this
    var centerNavInfo = wx.getStorageSync("centerNavInfo")
    var adverInfo = wx.getStorageSync("adverInfo")
    if (centerNavInfo) {// 本地如果有CenterNavInfo缓存，提前渲染
      that.setData({
        centerNavInfo: centerNavInfo,
        adverInfo: adverInfo
      })
    }

    this.getCenterNavInfo();//从后端获取centerNavInfo
    this.getAdverInfo();//从后端获取centerNavInfo
  },

  getCenterNavInfo: function () {
    var that = this;
    wx.request({
      url: HOST+'/api/index/getCenterNavInfo.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var centerNavInfo = res.data
          that.setData({ // 再次渲染
            centerNavInfo: centerNavInfo
          })
          console.log("覆盖centerNavInfo缓存数据")
          console.log(centerNavInfo)
          wx.setStorageSync("centerNavInfo", centerNavInfo) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getCenterNavInfo请求失败"),
        console.log(e)
      }
    })
  },
  getAdverInfo: function () {
    var that = this;
    wx.request({
      url: HOST+'/api/index/getAdverInfo.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var adverInfo = res.data
          that.setData({ // 再次渲染
            adverInfo: adverInfo
          })
          console.log("覆盖adverInfo缓存数据")
          console.log(adverInfo)
          wx.setStorageSync("adverInfo", adverInfo) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getAdverInfo请求失败"),
          console.log(e)
      }
    })
  },
})   