define(["vue"], function(vue) {
	vue.directive('back',{
		inserted:function(el){
			el.addEventListener('click',function(){
				window.history.go(-1);
				// console.log('4654654')
			})
		}
	});

	vue.directive('dragmove',{
		bind:function(el){
			
		},
		inserted:function(el,banding){
			var tar = $(el);

			

			var outer = $('<div class="out-move-hide"></div>');
			// var elm = $('<p class="sbar-ls-move-hide"></p>');
			// outer.append(elm);
			$('body').append(outer);	
			

			var x = 0,
				left = 0,
				lastx = 0;


			var canmove = false,
				win = $(window),
				callback = banding.value.callback,
				obj = banding.value.obj,
				index = banding.value.index,
				unit = 980/(obj.max - obj.min);

				// var canmove = false,
				// win = $(window),
				// callback = banding.value.callback,
				// type = banding.value.type,
				// index = banding.value.index,
				// unit = banding.value.unit,
				// prev = ;


			var morm_to = 0,
				morm_from = 0,
				minspan = 0,
				maxspan = 0,
				prev = '';
				next = '';

			tar.on('mouseenter',function(e){
				var wtop = win.scrollTop(),
					oft = tar.offset();
				
				// elm.css({'position':'fixed','top':oft.top - wtop,'left':oft.left,'z-index':20})
			}).on('mousedown',function(e){
				x = e.clientX;
				canmove = true;
				outer.show();
				prev = obj.list[index];
				next = obj.list[index+1];
				morm_to = prev.to;
				morm_from = next.from;
				minspan = prev.from - prev.to + 1;
				maxspan = next.to - next.from - 1;
			})

			outer.on('mousemove',function(e){
				if(!canmove){ return}
				
				var cx = Math.floor((e.clientX - x)/unit);
				lastx = cx;

				if(cx<=minspan){
					cx = minspan;
				};
				if(cx>=maxspan){
					cx = maxspan;
				};
				lastx = cx;
				prev.to = morm_to + cx;
				next.from = morm_from + cx;

			}).on('mouseup',function(){
				morm_to = prev.to;
				morm_from = next.from;

				outer.hide();
				
			})
			// console.log(9,banding)
			// banding.value.callback('r',4,987)
		}
	})


	vue.filter("hidemobile", function(value) {
		var v = value||'',
			reg_mobile = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
		if (reg_mobile.test(v)) {
			return v.substr(0, 3) + '****' + v.substr(7, 4);
		} else {
			return v;
		}
	});
	vue.filter("initmoney", function(value, fixed, isz) {
		var fixed = fixed||1;
		if(isz){
			value = parseInt(value||0);
		};
		return value/fixed;
	});
	vue.filter("timeFilter", function(value, geshi) {
	    if (typeof(value) == "string") {
	        var dd = new Date(value);
	    } else {
	        var dd = new Date(value);
	    };
	    geshi = geshi.replace('Y', dd.getFullYear());
	    geshi = geshi.replace("M", dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1);
	    geshi = geshi.replace("D", dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate());
	    geshi = geshi.replace("h", dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours());
	    geshi = geshi.replace("m", dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes());
	    geshi = geshi.replace("s", dd.getSeconds() < 10 ? '0' + dd.getSeconds() : dd.getSeconds());
	    return geshi;
	});
	vue.filter("timeback", function(value) {
	    return value/100;
	});
	vue.filter('numsplite',function(value){
		var str = '',
			arr = [];

		// 获取小数点后面的值
		var last = (Math.round(value*100)%100)/100;

		value_str = "" + parseInt(value);

		if(value_str.length<=3){
			str = value_str + (last==0?'':(""+last).substr(1));
		}else{
			var f = value_str.length%3,
				len = Math.floor(value_str.length/3);

			for(var i=0;i<len;i++){
				arr.push(value_str.substr(f+i*3,3));
			}

			str = (f>0?value_str.substr(0,f)+',':'')+arr.join(',')+(last==0?'':(""+last).substr(1));
		}

	

		return str;
	})

	vue.component('banner', {
		props: ['bndata'],
		template: '<div class="swipe" :class="[bndata.class]" :id="bndata.id">\
				<div class="swipe_warp">\
					<a v-for="(item,index) in bndata.list" :key="item.id" class="swipe_ls" :class="dataindex==index?\'swipe_ls_ac\':\'\'" :href="item.url" :style="\'background-image:url(\'+item.imgUrl+\')\'"></a>\
				</div>\
				<div class="swipe_pos"><span class="swipe_po" :class="dataindex==index?\'swipe_po_ac\':\'\'"  @mouseenter="showbn(index)" v-for="(item,index) in bndata.list.length"></span></div>\
			</div>',
		data: function() {
			return {
				dataindex: 0,
				inter:'',
				datalen:1
			}
		},
		watch:{
			'bndata.list':function(){
				this.binddom();
			}
		},
		methods:{
			showbn:function(index){
				this.dataindex = index;
			},
			binddom: function() {
				this.datalen = this.bndata.list.length||0;
				clearInterval(this.inter);
				this.setinter();
			},
			setinter:function(){
				var that = this;
				this.inter = setInterval(function(){
					var di = that.dataindex;
					di++;
					di = di%that.datalen;
					that.dataindex = di;
				},4000);
			}
		},
		destroyed:function(){
			clearInterval(this.inter);
		}

	});

})

// vue.component('timepicker',{
// 	template:""
// })