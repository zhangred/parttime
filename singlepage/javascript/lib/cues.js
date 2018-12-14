//Created by zsh on 2018/3/2.
define(["vue"], function(vue) {
	vue.prototype.$CUES = {
		tip:function(options){
			var msg = options.msg;
			var type = options.type?options.type:'info';
			var time = options.time?options.time:2000;
			var elma = this.createdom({"tag":"div","classname":"tippop","msg":'<div class="text '+type+'">'+msg+'</div></div>'});
			document.body.appendChild(elma);
			setTimeout(function(){
				elma.style.opacity = 0;
				elma.style.webkitTransition = 'all 1.5s';
				setTimeout(function(){
					options.callback && options.callback();
					elma.remove();
				},1000);
			},time);
		},
		showload:function(options){
			var msg = options.msg;
			var elma = this.createdom({"tag":"div","classname":"J_tippopload tippop","msg":'<div class="text loading"><img src="/lib/images/loading.gif" class="tipload">'+msg+'</div></div>'});
			document.body.appendChild(elma);
		},
		closeload:function(){
			document.getElementsByClassName('J_tippopload')[0].remove();
		},
		alert:function(options){
			var msg = options.msg;
			var elma = this.createdom({"tag":"div","classname":"tippop_alert"});
			var elmb = this.createdom({"tag":"p","classname":"tippop_alert_t","msg":options.msg});
			var elmc = this.createdom({"tag":"a","classname":"tippop_alert_b","msg":"确定"});
			elma.appendChild(elmb),elma.appendChild(elmc);
			document.body.appendChild(elma);

			var elm_bg = this.createdom({"tag":"div","classname":"tippop_bg"});
			document.body.appendChild(elm_bg);

			elmc.addEventListener('click',function(){
				elm_bg.remove();
				elma.remove();
				options.callback && options.callback();
			},false);
		},
		confirm:function(options){
			var msg = options.msg;
			var elma = this.createdom({"tag":"div","classname":"tippop_alert"});
			var elmb = this.createdom({"tag":"p","classname":"tippop_alert_t","msg":options.msg});
			var elmc = this.createdom({"tag":"p","classname":"tippop_alert_b"});
			var a_cal = this.createdom({"tag":"a","classname":"tippop_confirm_btn","msg":options.caltext||"取消"});
			var a_sure = this.createdom({"tag":"a","classname":"tippop_confirm_btn","msg":options.suretext||"确定"});
			elmc.appendChild(a_cal),elmc.appendChild(a_sure);
			elma.appendChild(elmb),elma.appendChild(elmc);
			document.body.appendChild(elma);
			var elm_bg = this.createdom({"tag":"div","classname":"tippop_bg"});
			document.body.appendChild(elm_bg);
			a_cal.addEventListener('click',function(){
				elm_bg.remove();
				elma.remove();
				options.callback && options.callback(0);
			},false);
			a_sure.addEventListener('click',function(){
				elm_bg.remove();
				elma.remove();
				options.callback && options.callback(1);
			},false);
		},
		createdom:function(options){
			var dom = document.createElement(options.tag);
			dom.className = options.classname;
			if(options.msg){
				dom.innerHTML = options.msg;
			}
			return dom;
		},
		backtime:function(date,geshi){
		    var dd = date;
		    geshi = geshi.replace("Y", dd.getFullYear());
		    geshi = geshi.replace("M", dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1);
		    geshi = geshi.replace("D", dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate());
		    geshi = geshi.replace("h", dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours());
		    geshi = geshi.replace("m", dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes());
		    geshi = geshi.replace("s", dd.getSeconds() < 10 ? '0' + dd.getSeconds() : dd.getSeconds());
		    return geshi;
		}
	};
})