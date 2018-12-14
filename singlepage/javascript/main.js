requirejs.config({
	urlArgs: "bust="+1,
	paths:{
		vue:'lib/vue.min',
		axios:'lib/axios.min',
		jquery:'lib/jquery.min',
		directive:'directive',
		cues:'lib/cues'
	}
})

requirejs(['vue',"axios","jquery","directive","cues"], function(vue,axios,jquery) {
	var app5 = new vue({
		el: '#app',
		data: {
			timespace:"每小时更新",
			ac_cate: 1,
			ac_tab:1,
			cate_name:"RFM",
			loading:{'tongji':true},
			catelist:[],
			stat:[],
			statcount:[],
			pagedata:{},
			setting:{'f':{'list':[]},'r':{'list':[]},'m':{'list':[]}},
			timeRange:'',
			setting_copy:{},
			setting_list:{'f':{'list':[]},'r':{'list':[]},'m':{'list':[]}},
			setting_show:false,
			minmax:{}
		},
		created: function () {
			// 获取初始分类数据
			var that = this;

            $.ajax({
            	type: "POST",
				url: "http://crm1.3tichina.com/proxy/segment/all?data[segmentId]=1",
				data: {data:{segmentId:1}},
				dataType: "json",
				success: function(res){
	                if(res.success){
	                	that.catelist = res.data.data;
	                	that.ac_cate = that.catelist[0].id;
	                	that.cate_name = that.catelist[0].name;

	                	//获取第一个数据
	                	that.getpagedata();
	                }
				}
			});
			
		},
		methods: {
			// 切换头部分类标签
			changetype: function (v,name) {
				this.ac_cate = v;
				this.cate_name = name;
				this.getpagedata();
			},
			//获取页面数据
			getpagedata(){
				var that = this;
				$.ajax({ 
					type: "POST",
					url: "http://crm1.3tichina.com/proxy/segment/one",
					data: {data:{segmentId:that.ac_cate}},
					dataType: "json",
					success: function(res){
						if(res.success){

							that.pagedata = res.data;
							var stat = JSON.parse(res.data.stat||'[]');

							// var arr = [
							// 	{
							// 		F_pos: 0.83731800766283528,
							// 		M_pos: 0.590743097498486,
							// 		RFM: "111",
							// 		R_pos: 0.890743097498486,
							// 		count: 50,
							// 		name: "一般挽留客户",
							// 		percent: 98
							// 	},
							// 	{
							// 		F_pos: 0.43731800766283528,
							// 		M_pos: 0.390743097498486,
							// 		RFM: "111",
							// 		R_pos: 0.390743097498486,
							// 		count: 50,
							// 		name: "一般挽留客户",
							// 		percent: 98
							// 	},
							// 	{
							// 		F_pos: -0.43731800766283528,
							// 		M_pos: 0.190743097498486,
							// 		RFM: "111",
							// 		R_pos: -0.290743097498486,
							// 		count: 50,
							// 		name: "一般挽留客户",
							// 		percent: 98
							// 	},
							// 	{
							// 		F_pos: -0.63731800766283528,
							// 		M_pos: -0.790743097498486,
							// 		RFM: "111",
							// 		R_pos: -0.790743097498486,
							// 		count: 50,
							// 		name: "xxxxxxxxx",
							// 		percent: 98
							// 	}
							// ]

							// stat = arr.concat(stat);

							var o = {"name":"用户总计","count":0,"percent":0};
							stat.map(function(item){
								o.count+=item.count;
								o.percent += item.percent;
								item.style = {};
								item.style.left = xiangw/2*(1+item.R_pos)+'px';
								item.style.top = ((item.M_pos>=0?180:540) - 180*item.F_pos) + 'px';
								return item;
							});

							that.stat = stat;
							that.statcount = [o].concat(stat);
							that.loading.tongji = false;

							var setting = JSON.parse(res.data.setting||'{"r":{"list":[]},"f":{"list":[]},"m":{"list":[]}}');

							// if(setting.timeRange=='0'){
							// 	that.timeRange = '不限'
							// }else if(setting.timeRange=='1'){
							// 	that.timeRange = '356天内'
							// }else{
							// 	that.timeRange = '范围'
							// }

							that.setting = setting;

							console.log(setting)

							var setting_copy = {};
							$.extend(true,setting_copy,setting);
							setting_copy.copy_time = that.$CUES.backtime(new Date(setting_copy.fromTime),'Y-M-D');
							that.setting_copy = setting_copy;
							that.changerange(setting.timeRange);

						}
					}
				});
			},
			//复制setting，用作弹层展示
			copysetting(){
				var that = this,
					setting_copy = {},
					minmax = this.minmax,
					setting_list = {};

				$.extend(true,setting_copy,that.setting_copy);

				setting_copy.f.list.reverse();
				setting_copy.m.list.reverse();

				console.log(setting_copy)


				this.initslist('r',setting_copy.r.list,minmax.r_min,minmax.r_max);
				this.initslist('f',setting_copy.f.list,minmax.f_min,minmax.f_max);
				this.initslist('m',setting_copy.m.list,minmax.m_min,minmax.m_max);
			},
			//初始列表
			initslist(type,list,min,max){
				var o = {},
					rlist = list,
					rlen = rlist.length,
					rmin = parseInt(min),
					rmax = parseInt(rlist[rlen-1].from)<parseInt(max)?parseInt(max):parseInt(rlist[rlen-1].from*1.3),
					span = rmax - rmin;

					// console.log(0,parseInt(rlist[rlen-1].from)+34)
				this.minmax[type+'_max'] = rmax;
				for(var ir=0;ir<rlen;ir++){
					var v = rlist[ir];

					v.from = parseInt(v.from);
					v.to = parseInt(v.to);
					// v.weight = parseInt(v.weight);
					v.span = span;
					if(ir==0){
						v.prev = false;
						v.next = true;
						// v.min = rmin;
						// v.max = rlist[1].to-1;
						v.from = rmin;
					}else if(ir==rlen-1){
						v.prev = true;
						v.next = false;
						// v.min = v.from+1;
						// v.max = rmax;
						v.to = rmax;
					}else{
						v.prev = true;
						v.next = true;
						// v.min = v.from+1;
						// v.max = rlist[ir+1].to-1;
					};
				}

				o.list = rlist;
				o.min = rmin;
				o.max = rmax;

				this.setting_list[type] = o;
			},
			//展开参数弹层
			toggleparam(){
				this.setting_show = !this.setting_show;
			},
			//立即更新数据
			updatanow(){
				alert('updatanow')
			},
			//改变更新时间
			upchange(e){
				alert('upchange')
			},
			// 切换tab
			changetab: function (v) {
				this.ac_tab = v;
			},
			//弹层-切换类型
			changerange(v){
				this.setting_copy.timeRange = v;

				var that = this,
					setting_copy = this.setting_copy;
				$.ajax({ 
					type: "POST",
					url: "http://crm1.3tichina.com/proxy/segment/getVRFMMinMax",
					data: {data:{fromDay:""+setting_copy.fromDay,fromTime:""+setting_copy.fromTime,web:'cms1.3tichina.com',timeRange:""+v}},
					dataType: "json",
					success: function(res){
						if(res.success){
							that.minmax = res.data;

							// that.minmax.m_max = that.minmax.m_max - 80*Math.random(); // 此行为测试

							that.setting_list = {'f':{'list':[]},'r':{'list':[]},'m':{'list':[]}};
							setTimeout(function(){
								that.copysetting(true);
							},10);

						}
					}
				})

			},
			//弹层-时间更新
			datachange(v){
				this.setting_copy.fromTime = v;
			},
			//弹层-删除区域
			bardel(item,type,index){
				var list = this.setting_list[type].list,
					tar = item.prev?list[index-1]:list[index+1],
					item_copy = {};

				if(tar){
					tar.from = item.prev?tar.from:item.from;
					tar.to = item.prev?item.to:tar.to;
					tar.max = item.prev?item.max:tar.max;
					tar.next = item.prev?item.next:tar.next;
					tar.prev = item.prev?tar.prev:item.prev;

					list.splice(item.prev?index-1:index,2,tar);
				}

			},
			//弹层-添加区域
			baradd(item,type,index){

				var list = this.setting_list[type].list,
					item_l = {},
					item_r = {};

				if(item.to-item.from<2){
					alert({"msg":"区间过小"})
					return;
				}

				$.extend(true,item_l,item);
				$.extend(true,item_r,item);

				// item_l.weight = Math.ceil(item.weight/2);
				// item_r.weight = Math.floor(item.weight/2);

				var mid = Math.ceil((item.to+item.from)/2);
				item_l.to = mid;
				item_r.from = mid;

				item_l.max = mid -1;
				item_r.min = mid +1;

				item_l.next = true;
				item_r.prev = true;
// 
				item_r.name = '';
				item_r.weight = null;

				list.splice(index,1,item_l,item_r);

			},
			//保存接口
			savedata(){

				var obj = {},
					that = this;

				$.extend(true,obj,that.setting_copy,that.setting_list);
				// $.extend(true,obj,);

				if(!this.isfulldata(obj.r.list)||!this.isfulldata(obj.f.list)||!this.isfulldata(obj.m.list)){
					alert('数据填写不完整，请查看')
					return;
				}

				obj.f.list.reverse();
				obj.m.list.reverse();

				// var rfmSetting = {
				//     "timeRange": "0",
				//     "fromTime": "2018-10-01",
				//     "fromDay": "365",
				//     "web": "cms1.3tichina.com",
				//     "r": {
				//         "min": "2",
				//         "max": "50",
				//         "list": [{
				//             "name": "活跃用户",
				//             "from": "0",
				//             "to": "15",
				//             "weight": "40"
				//         },
				//             {
				//                 "name": "沉默用户",
				//                 "from": "15",
				//                 "to": "30",
				//                 "weight": "30"
				//             },
				//             {
				//                 "name": "睡眠用户",
				//                 "from": "30",
				//                 "to": "45",
				//                 "weight": "20"
				//             },
				//             {
				//                 "name": "流失用户",
				//                 "from": "45",
				//                 "to": "100000",
				//                 "weight": "10"
				//             }
				//         ]
				//     },
				//     "f": {
				//         "min": "0",
				//         "max": "21",
				//         "list": [{
				//             "name": "忠实用户",
				//             "from": "10",
				//             "to": "100000",
				//             "weight": "8"
				//         },
				//             {
				//                 "name": "成熟用户",
				//                 "from": "5",
				//                 "to": "10",
				//                 "weight": "6"
				//             },
				//             {
				//                 "name": "老用户",
				//                 "from": "2",
				//                 "to": "5",
				//                 "weight": "4"
				//             },
				//             {
				//                 "name": "新用户",
				//                 "from": "0",
				//                 "to": "2",
				//                 "weight": "2"
				//             }
				//         ]
				//     },
				//     "m": {
				//         "min": "0",
				//         "max": "21",
				//         "list": [{
				//             "name": "高贡献用户",
				//             "from": "30",
				//             "to": "100000",
				//             "weight": "4"
				//         },
				//             {
				//                 "name": "中贡献用户",
				//                 "from": "10",
				//                 "to": "30",
				//                 "weight": "2"
				//             },
				//             {
				//                 "name": "低贡献用户",
				//                 "from": "0",
				//                 "to": "10",
				//                 "weight": "1"
				//             }
				//         ]
				//     }
				// }

				// console.log(obj)
				// return;

				$.ajax({ 
					type: "POST",
					url: "http://crm1.3tichina.com/proxy/segment/updateSetting",
					data: {data:{'segmentId':that.ac_cate,'setting':JSON.stringify(obj)}},
					dataType: "json",
					success: function(res){
						if(res.success){
							that.setting.r.list = obj.r.list; 
							that.setting.f.list = obj.f.list; 
							that.setting.m.list = obj.m.list;
							that.setting.fromTime = obj.fromTime;
							that.setting.timeRange = obj.timeRange;
							that.setting.fromDay = obj.fromDay;
							that.setting.web = obj.web;

							window.location.href = window.location.href;

							// that.setting_show = false;
						}
					}
				})


				

			},
			//是否填写完整
			isfulldata(list){
				var isfull = true,
					len = list.length;
				for(var i=0;i<len;i++){
					if(!list[i].name||!list[i].weight){
						console.log(list[i])
						isfull = false;
						break;
					}
				}
				return isfull;
			}

		}
	})
});