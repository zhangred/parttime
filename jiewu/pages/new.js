var app = getApp();
var util = require('../utils/util.js');

Page({
	data: {
		data:{list:[]}
	},
	onLoad: function () {
		wx.setNavigationBarTitle({
			title: '发帖'
		});
    },
    //绑定文案
    setdata(e){
        var val = e.detail.value,
            key = e.target.dataset.key,
            obj = {};
        obj['data.'+key] = val;
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
                var dt = that.data.data;
                dt.list.push(tempFilePaths);
                that.setData({data:dt})
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
            urls: that.data.data.list
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
                    var dt = that.data.data;
                    dt.list.splice(idx,1);
                    that.setData({data:dt});
                }
            }
        })
    },
    senttopic(){
        var data = this.data.data;
        if(!data.title){
            wx.showToast({
                title: '请输入标题',
                icon: 'none',
                duration: 2000
              })
            return;
        }
        if(!data.content){
            wx.showToast({
                title: '请输入话题描述',
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
        },1000)
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
