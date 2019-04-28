var app = getApp();
var util = require('../utils/util.js');

Page({
	data: {
		list:[]
	},
	onLoad: function () {
        var that = this;
		wx.setNavigationBarTitle({
			title: '这就是街舞'
		});

        this.getlist();
		
	},
	// 获取留言
	getlist(){
		var that = this;
		wx.request({
			url: 'http://card.biaotu.net/callback.json',
			method: "GET",
			data: {},
			success (res) {
				if(res.data.code==0){
					//模拟数据
					res.data.list = [
                            {"id":2,"type":1},
                            {"id":5,"type":1},
                            {"id":6,"type":1},
                            {"id":7,"type":1},
                            {"id":8,"type":1},
                            {"id":3,"type":2},
                            {"id":9,"type":2},
                            {"id":10,"type":2},
                            {"id":11,"type":2},
                            {"id":4,"type":3}
                    ];
					that.setData({
						list:res.data.list
                    });
				}
			}
		})
	}

})
