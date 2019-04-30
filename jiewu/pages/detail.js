var app = getApp();
var util = require('../utils/util.js');

var showpop = false;
Page({
	data: {
		showpop:false,
		datamsg:{list:[]}
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
	},
	//弹框展示
	togglepop(){
		showpop = !showpop;
		this.setData({showpop:showpop})
	},
	//绑定文案
    setdata(e){
        var val = e.detail.value,
            key = e.target.dataset.key,
            obj = {};
        obj['datamsg.'+key] = val;
        this.setData(obj);
	},
    //上传图片
    addimg(){
        var that = this;
        wx.chooseImage({
            count: 1,
            success(res) {
              const tempFilePaths = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在上传中···',
              })
              setTimeout(function(){
                wx.hideLoading();
                var dt = that.data.datamsg;
                dt.list.push(tempFilePaths);
                that.setData({datamsg:dt})
              },1000)
            //   wx.uploadFile({
            //     url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
            //     filePath: tempFilePaths[0],
            //     name: 'file',
            //     formData: {
            //       user: 'test'
            //     },
            //     success(res) {
            //       const data = res.data
            //       // do something
            //     }
            //   })
            }
          })
    },
    seeimg(e){
        var url = e.target.dataset.url,
            that = this;
        wx.previewImage({
            current: url,
            urls: that.data.datamsg.list
        })
    },
    delimg(e){
        var idx = e.target.dataset.idx,
            that = this;
        wx.showModal({
            title: '提示',
            content: '确认删除此图片？',
            success(res) {
                if (res.confirm) {
                    var dt = that.data.datamsg;
                    dt.list.splice(idx,1);
                    that.setData({datamsg:dt});
                }
            }
        })
    },
    senttopic(){
		var that = this;
        var data = this.data.datamsg;
        if(!data.content){
            wx.showToast({
                title: '请输入想说的内容',
                icon: 'none',
                duration: 2000
              })
            return;
        }
        wx.showLoading({
            title: '正在发送中···',
        })
        setTimeout(function(){
            wx.hideLoading();
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
			})
			that.togglepop();
        },1000)
    }
})
