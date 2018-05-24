//app.js
App({
  onLaunch: function () {
   
  },
  globalData:{
    url:"https://www.ztlovesl.com.cn/SLZT/",
    userInfo:null,
    zx:null,
    sb:null,
    last_search:[],
  },
  setData_zx:function(data){
    this.globalData.zx=data;
  },
  setData_sb: function (data) {
    this.globalData.sb = data;
  },
  getUrl:function(){
    return this.globalData.url;
  },
  getUrlse:function(){
    return this.globalData.url_002;
  }
  })