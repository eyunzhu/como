//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
    
    imgUrls: [
      {        
        link: '/pages/index/index',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      }, {
        
        link: '/pages/logs/logs',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      }, {
       
        link: '/pages/test/test',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
    ],
    navIcon:[
      {
        title: '创业大赛',
        link: '/pages/index/index',
        imgUrl: '../../images/icon/edit.png',
        bgcolor: '#f98888'
      }, {
        title: '设计比赛',
        link: '/pages/logs/logs',
        imgUrl: '../../images/icon/discover.png',
        bgcolor: '#6acffc'
      }, {
        title: '科技大赛',
        link: '/pages/test/test',
        imgUrl: '../../images/icon/explore.png',
        bgcolor: '#c979e0'
      }, {
        title: '学科学术',
        link: '/pages/test/test',
        imgUrl: '../../images/icon/favor.png',
        bgcolor: '#ffd305'
      }, {
        title: '其他竞赛',
        link: '/pages/test/test',
        imgUrl: '../../images/icon/more.png',
        bgcolor: '#5cdbd7'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad test');
  }
})   