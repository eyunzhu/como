// pages/index/comDetails/comDetails.js
var app = getApp()
const HOST = getApp().globalData.HOST
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.currentTarget.dataset.url,)
    }
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    comDetails:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      com_id: options.com_id
    })
    that.getComDetails(options.com_id)
  },

/*复制到剪切板*/
  setClipboardData:function(data){
    //console.log(data.currentTarget.dataset)    
    wx.setClipboardData({
      data:"http://"+ data.currentTarget.dataset.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log("成功复制内容",res.data) // data
            wx.showToast({
              title: "复制成功",
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  


  //获取竞赛详情
  getComDetails: function (com_id) {
    var that = this;
    wx.request({
      url: HOST + 'api/index/comDetails/getComDetails.php',
      method: 'GET',
      data:{
        comId: com_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var comDetails = res.data
          console.log(comDetails)
          that.setData({ // 渲染
            comDetails: comDetails
          })
         
        }
      },
      fail: function (e) {
        console.log("competitionInfo请求失败"),
          console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})