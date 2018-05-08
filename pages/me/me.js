
var app = getApp()
const HOST = getApp().globalData.HOST

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
    session3rd: wx.getStorageSync('session3rd'),
    userInfo: wx.getStorageSync('userInfo')
  },
  onHide: function () {
    //wx.setStorageSync('session3rd', '');
    // this.setData({
    //  session3rd: ''
    //})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //判断本地缓存session3rd是否为空并验证是否有效
    var session3rd = wx.getStorageSync('session3rd')
    if (session3rd != '') {
      console.log(session3rd)
      var that = this
      wx.request({
        url: HOST + 'api/login/judgeSession3rd.php',
        data: {
          session3rd: session3rd
        },
        success: function (e) {
          console.log(e)
          if (!e.data) {
            console.log("本地缓存 session3rd无效")
            //本地缓存 session3rd无效时将其赋空
            wx.setStorageSync('session3rd', '');
            that.setData({
              session3rd: ''
            })
          } else
            console.log("本地缓存 session3rd验证成功")
        }
      })
    } else
      console.log("本地缓存 session3rd为空")

  },
  getUserInfo: function (e) {
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });

    console.log(e),
      wx.setStorageSync('userInfo', e.detail.userInfo);
    this.setData({
      userInfo: e.detail.userInfo,
    })
    var that = this;//把this对象复制到临时变量that.
    wx.login({
      success: function (res) {
        console.log(res),
          console.log("login函数"),
          wx.request({

            url: HOST + 'api/login/login.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
            data: {
              code: res.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res1) {
              console.log("请求成功"),
                console.log(res1.data);
              console.log(res1)
              console.log(res1.data.openId);
              wx.setStorageSync('session3rd', res1.data.session3rd);//将session3rd写入本地缓存  
              that.setData({
                session3rd: res1.data.session3rd,
                is_login: true,
                hiddenLoading: !that.data.hiddenLoading
              })
            },
            fail: function (e) {
              console.log("请求失败"),
                console.log(e)
            }
          })
      }
    })
  },
  getUserResMsg: function () {
    var that = this;
    var session3rd = wx.getStorageSync('session3rd');
    wx.request({
      url: HOST + 'api/login/getUserResMsg.php',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
      data: {
        session3rd: session3rd
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("session3rd请求成功"),
          console.log(res.data);
        console.log(res.data.createDate);
        that.setData({
          userResMsg: res.data
        })
      },
      fail: function (e) {
        console.log("请求失败"),
          console.log(e)
      }
    })

  },
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh();
    /*
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        wx.stopPullDownRefresh();
      }
    })*/
  },
  /*用户详细信息*/
  goUserInfo:function(e){
    wx.navigateTo({
      url: 'userinfo/userinfo?com_id=' + e.currentTarget.dataset.com_id
    })
  }


})