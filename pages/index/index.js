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
    userInfo: {},
  },
  onLoad: function () {
    var that=this
    if (wx.getStorageSync("centerNavInfo")) {// 本地如果有CenterNavInfo缓存，提前渲染
      that.setData({
        centerNavInfo: wx.getStorageSync("centerNavInfo"),
        adverInfo: wx.getStorageSync("adverInfo"),
        competitionInfo: wx.getStorageSync("competitionInfo")
      })
    }

    this.getCenterNavInfo();//从后端获取centerNavInfo
    this.getAdverInfo();//从后端获取centerNavInfo
    this.getCompetitionInfo();//从后端获取competitionInfo
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
  getCompetitionInfo: function () {
    var that = this;
    wx.request({
      url: HOST + 'api/index/getCompetitionInfo.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var competitionInfo = res.data
          that.setData({ // 再次渲染
            competitionInfo: competitionInfo
          })
          console.log("覆盖competitionInfo缓存数据")
          console.log(competitionInfo)
          wx.setStorageSync("competitionInfo", competitionInfo) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("competitionInfo请求失败"),
          console.log(e)
      }
    })
  },
  goComDetails:function(e){
   // console.log("弹出框", e.currentTarget.dataset)
    wx.navigateTo({
      url: 'comDetails/comDetails?com_id=' + e.currentTarget.dataset.com_id
    })
  },
})   