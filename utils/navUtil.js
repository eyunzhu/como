/*
*navnum:导航id
*qclass:查询的类别
*numeachpage:每页数量
*page：第几页
*/
const HOST = getApp().globalData.HOST
function getNavItem(navnum, qclass, numeachpage, page,callback){
  wx.request({  
    url: HOST + 'api/index/getNavComItem.php',
    method: 'GET',
    data: {
      class: qclass,
      num_rec_per_page: numeachpage,
      page: page,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data);
      }
    },
    fail: function (e) {
      console.log("nav0Item 请求失败"),
        console.log(e)
    }
  })
}

module.exports = {
  getNavItem: getNavItem
}  