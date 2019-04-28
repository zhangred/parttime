var app = getApp();
var util = require('../utils/util.js');

var page = 1,
    locked = false;
Page({
	data: {
		newmsg:0,
		list:[]
	},
	onLoad: function () {
		wx.setNavigationBarTitle({
			title: '社区话题'
		});

        //虚拟获取新消息
        this.getnews();
        this.gettopic()
    },
    //获取新消息
    getnews(){
        var that = this;
        setTimeout(function(){
            that.setData({newmsg:5})
        },3000)
    },
	//话题列表
	gettopic(){
		var that = this;
		// 栏目id  this.data.actab
		wx.request({
			url: 'http://card.biaotu.net/callback.json',
			method: "GET",
			data: {},
			success (res) {
                console.log(res)
				if(res.data.code==0){
					//模拟数据
					res.data.data = [
						{},{},{},{},{},{},{},{},{},{},
                    ];
                    
					that.setData({
						list:that.data.list.concat(res.data.data)
                    })
                    locked = false;
				}
			}
		})
    },
    //分享
    getshare(){
        wx.updateShareMenu({
            withShareTicket: true,
            success() { 
                console.log(35454)
            }
        })
    },
    onReachBottom(){
        if(locked) return;
        locked = true;
        var that = this;
        setTimeout(function(){
            that.gettopic();
        },1000)
    }

})
