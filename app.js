//app.js
App({
  onLaunch: function () {
   
  },
  globalData:{
    url:"https://www.ztlovesl.com.cn/SMART/",
    url_002:"https://www.ztlovesl.com.cn/DataJ/",
    url_003:"http://localhost:8000/static/",
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