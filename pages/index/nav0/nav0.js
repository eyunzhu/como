
var navUtil = require('../../../utils/navUtil.js')
const HOST = getApp().globalData.HOST
Page({
  data: {
    hiddenLoading: false,
    nav0Item:[],
    class:'a',//查询类型
    num_rec_per_page: 2,//每页个数
    page:1,//查询第几页
  },
  onLoad: function (options) {
   navUtil.getNavItem("navnum", 'a', 2, 1, function(data){
     console.log("这是回调函数",data)
   })
    var that = this
    if (wx.getStorageSync(" nav0Item competitionInfo")) {// 本地如果有 nav0Item 缓存，提前渲染
      that.setData({
        nav0Item: wx.getStorageSync("nav0Item")
      })
    }
    this.getNav0Item();//从后端获取 nav0Item

    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
  },

  /*下拉刷新*/
  onPullDownRefresh: function () {
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
    this.getNav0Item();//从后端获取 nav0Item
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
    wx.stopPullDownRefresh()
  },

  getNav0Item: function () {
    var that = this;
    wx.request({
      url: HOST + 'api/index/getNavComItem.php',
      method: 'GET',
      data:{
        class: that.data.class,
        num_rec_per_page: that.data.num_rec_per_page,
        page:that.data.page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var nav0Item = res.data
          that.setData({ // 再次渲染
            nav0Item: nav0Item
          })
          console.log("覆盖 nav0Item 缓存数据")
          console.log(nav0Item)
          wx.setStorageSync("nav0Item", nav0Item) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("nav0Item 请求失败"),
          console.log(e)
      }
    })
  },
  //加载更多
  loadMore:function(){
    var that = this;
    wx.request({
      url: HOST + 'api/index/getNavComItem.php',
      method: 'GET',
      data: {
        class: that.data.class,
        num_rec_per_page: that.data.num_rec_per_page,
        page:++that.data.page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var nav0Item = res.data
          console.log("that.data.nav0Item.concat(nav0Item)", that.data.nav0Item.concat(nav0Item))
          that.setData({ // 再次渲染           
            nav0Item: that.data.nav0Item.concat(nav0Item),
          })
          console.log("覆盖 nav0Item 缓存数据")
          console.log("nav0Item", that.data.nav0Item)
          wx.setStorageSync("nav0Item", that.data.nav0Item) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("nav0Item 请求失败"),
          console.log(e)
      }
    })
  },
  goComDetails: function (e) {
    wx.navigateTo({
      url: '../comDetails/comDetails?com_id=' + e.currentTarget.dataset.com_id
    })
  }

})