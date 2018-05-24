var navUtil = require('../../../utils/navUtil.js')
const HOST = getApp().globalData.HOST
Page({
  data: {
    hiddenLoading: false, //加载中，默认false，隐藏 
    onLoading: false, //下拉加载中，默认false，隐藏 
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏  
    nav2Item: [],
    class: 'c',//查询类型
    num_rec_per_page: 2,//每页个数
    page: 0,//查询第几页
  },
  onLoad: function (options) {
    var that = this
    if (wx.getStorageSync("nav2Item")) {// 本地如果有 nav2Item 缓存，提前渲染
      that.setData({
        nav2Item: wx.getStorageSync("nav2Item")
      })
    }
    navUtil.getNavItem(that.data.class, that.data.num_rec_per_page, ++that.data.page, function (data) {
      wx.setStorageSync("nav2Item", data) // 覆盖缓存数据
      that.setData({
        nav2Item: data
      })
    })
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });

  },

  /*下拉刷新*/
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      hiddenLoading: !that.data.hiddenLoading
    });
    that.setData({
      searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
      nav2Item: [],
      class: 'c',//查询类型
      num_rec_per_page: 2,//每页个数
      page: 0,//查询第几页
    });
    navUtil.getNavItem(that.data.class, that.data.num_rec_per_page, ++that.data.page, function (data) {
      wx.setStorageSync("nav2Item", data) // 覆盖缓存数据
      that.setData({
        nav2Item: data
      })
    })

    wx.stopPullDownRefresh()
    that.setData({
      hiddenLoading: !that.data.hiddenLoading
    });
  },
  //加载更多
  loadMore: function () {
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
    var that = this;
    //getNavItem(qclass, numeachpage, page,callback)
    navUtil.getNavItem(that.data.class, that.data.num_rec_per_page, ++that.data.page, function (data) {
      if (data != '') {
        console.log("新加载的数据", data);
      } else {
        console.log("没有数据了", data);
        that.setData({
          searchLoadingComplete: true //“没有数据”的变量，默认false，隐藏  
        });
      }
      that.setData({ // 再次渲染
        nav2Item: that.data.nav2Item.concat(data),
      })
    })
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    console.log("滚动到底部触发事件")
    var that = this;    
    that.setData({
      onLoading: true 
    });    
    if (!that.data.searchLoadingComplete) {
      that.loadMore();
    }
    that.setData({
      onLoading: false
    });
  },
  //跳转到详情页面
  goComDetails: function (e) {
    wx.navigateTo({
      url: '../comDetails/comDetails?com_id=' + e.currentTarget.dataset.com_id
    })
  }

})