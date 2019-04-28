var app = getApp();
var util = require('../utils/util.js');

Page({
	data: {
		list:[]
	},
	onLoad: function () {
        var that = this;
		wx.setNavigationBarTitle({
			title: '消息'
		});

        setTimeout(function(){
            that.getlist();
        },2000)
		
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
                            {"id":3,"type":2},
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
