var app = getApp();
var util = require('../utils/util.js');

Page({
	data: {
		tabs:[],
		actab:1,
		list:[]

	},
	onShow:function(){
		this.getlist();
	},
	onLoad: function () {
		wx.setNavigationBarTitle({
			title: '阅读打卡'
		});

		this.gettabs();
	},
	// 获取标签
	gettabs(){
		var that = this;
		wx.request({
			url: 'http://phocc11vv.bkt.clouddn.com/callback.json',
			method: "GET",
			data: {},
			success (res) {
				if(res.data.code==0){
					//模拟数据
					res.data = {
						"data":[
							{"id":2,"paixu":1,"timeCreate":"2018-11-12T03:34:13","timeUpdate":"2018-11-12T03:34:14","title":"灏变笟淇濋殰"},
							{"id":3,"paixu":2,"timeCreate":"2018-11-12T03:34:13","timeUpdate":"2018-11-12T03:34:14","title":"浼樿川鏁欒偛"}
						],
						"code":200,
						"msg":"OK",
						"success":true
					};

					res.data.data.map(function(item){
						item.created_at = util.formatTime(new Date(item.timeCreate));
						return item;
					})
					console.log(res.data.data)
					that.setData({
						tabs:res.data.data,
						actab:res.data.data[0].id
					});
					that.getlist();
				}
			}
		})
	},
	//切换标签
	changetab(e){
		this.setData({
			actab:e.currentTarget.dataset.id
		})
		this.getlist();
	},
	//文章列表
	getlist(){
		var that = this;
		// 栏目id  this.data.actab
		wx.request({
			url: 'http://phocc11vv.bkt.clouddn.com/callback.json',
			method: "GET",
			data: {},
			success (res) {
				if(res.data.code==0){
					//模拟数据
					res.data.data = [
						{"id":1,"head":"http://phocc11vv.bkt.clouddn.com/head02.jpg","title":"好消息！福田区区属事业单位招人啦，10月29日开始报名。","created_at":1541451584335,"checked":true},
						{"id":2,"head":"http://phocc11vv.bkt.clouddn.com/head02.jpg","title":"好消息！福田区区属事业单位招。","created_at":1541451584335},
						{"id":3,"head":"http://phocc11vv.bkt.clouddn.com/head02.jpg","title":"好消息！福田区区属事业单位招人啦，10月29日开始报名。","created_at":1541451584335},
					];

					res.data.data.map(function(item){
						item.created_at = util.formatTime(new Date(item.created_at));
						return item;
					})
					that.setData({
						list:res.data.data
					})
				}
			}
		})
	}

})
