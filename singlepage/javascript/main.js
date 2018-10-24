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
			timeRange:''
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

							var arr = [
								{
									F_pos: 0.83731800766283528,
									M_pos: 0.590743097498486,
									RFM: "111",
									R_pos: 0.890743097498486,
									count: 50,
									name: "一般挽留客户",
									percent: 98
								},
								{
									F_pos: 0.43731800766283528,
									M_pos: 0.390743097498486,
									RFM: "111",
									R_pos: 0.390743097498486,
									count: 50,
									name: "一般挽留客户",
									percent: 98
								},
								{
									F_pos: -0.43731800766283528,
									M_pos: 0.190743097498486,
									RFM: "111",
									R_pos: -0.290743097498486,
									count: 50,
									name: "一般挽留客户",
									percent: 98
								},
								{
									F_pos: -0.63731800766283528,
									M_pos: -0.790743097498486,
									RFM: "111",
									R_pos: -0.790743097498486,
									count: 50,
									name: "一般挽留客户",
									percent: 98
								}
							]

							stat = arr.concat(stat);

							var o = {"name":"用户总计","count":0,"percent":0};
							stat.map(function(item){
								o.count+=item.count;
								o.percent += item.percent;
								item.style = {};
								item.style.left = xiangw/2*(1+item.R_pos)+'px';
								item.style.top = ((item.M_pos>=0?180:540) + 180*item.F_pos) + 'px';
								return item;
							});

							that.stat = stat;
							that.statcount = [o].concat(stat);
							that.loading.tongji = false;

							var setting = JSON.parse(res.data.setting||'{"r":{"list":[]},"f":{"list":[]},"m":{"list":[]}}');
							// timeRange：0是不限timeRange：1是天数timeRange：2是时间段
							if(setting.timeRange=='0'){
								that.timeRange = '不限'
							}else if(setting.timeRange=='1'){
								that.timeRange = '356天内'
							}else{
								that.timeRange = '范围'
							}

							that.setting = setting;
							console.log(setting)


						}
					}
				});
			},
			//展开参数弹层
			showparam(){

			},
			//立即更新数据
			updatanow(){

			},
			//改变更新时间
			upchange(e){
				console.log(e)
			},
			// 切换tab
			changetab: function (v) {
				this.ac_tab = v;
			},
		}
	})
});