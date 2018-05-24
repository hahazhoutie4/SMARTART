//app.js
App({
  onLaunch: function () {
   
  },
  globalData:{
    url:"http://localhost:8080/SLZT/",
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