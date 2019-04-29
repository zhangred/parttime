var app = getApp();
var util = require('../utils/util.js');

Page({
	data: {
	},
	onLoad: function () {
		wx.setNavigationBarTitle({
			title: '解读舞者合影刷爆朋的的物联网定定位'
		});
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
