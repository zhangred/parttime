var CUES = {
    loading:function(options){
        if(this.load_elm) return;
        this.load_elm = true;
        this.load_elm = this.createdom({"tag":"div","classname":"tippop_bg tippop_bga","msg":'<div class="tippop"><div class="text load"><p class="text-io"></p>'+options.msg+'</div></div></div>'})
        document.body.appendChild(this.load_elm);
    },
    loadingclose:function(){
        this.load_elm.remove();
        this.load_elm = null;
    },
    tip:function(options){
        var msg = options.msg;
        var type = options.type?options.type:'tip';
        var time = options.time?options.time:1000;
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
    alert:function(options){
        var msg = options.msg;
        var elma = this.createdom({"tag":"div","classname":"tippop_alert"});
        var elmb = this.createdom({"tag":"p","classname":"tippop_alert_t","msg":options.msg});
        var elmc = this.createdom({"tag":"a","classname":"tippop_alert_b","msg":options.suretext||"确定"});
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
        var a_cal = this.createdom({"tag":"a","classname":"tippop_confirm_btn","msg":options.canceltext||"取消"});
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
    input:function(options){
        var msg = options.msg;
        var elma = this.createdom({"tag":"div","classname":"tippop_alert"});
        var elmb = this.createdom({"tag":"p","classname":"tippop_input_t","msg":options.msg});
        var input = this.createdom({"tag":"input","classname":"input"});
        var elmm = this.createdom({"tag":"p","classname":"tippop_input_m"});
        var elmc = this.createdom({"tag":"div","classname":"tippop_alert_b"});
        var a_cal = this.createdom({"tag":"p","classname":"tippop_confirm_btn","msg":options.canceltext||"取消"});
        var a_sure = this.createdom({"tag":"p","classname":"tippop_confirm_btn","msg":options.suretext?options.suretext:"确定"});
        elmc.appendChild(a_cal),elmc.appendChild(a_sure);
        input.setAttribute('placeholder',options.placeholder?options.placeholder:'');
        elmm.appendChild(input);
        elma.appendChild(elmb),elma.appendChild(elmm),elma.appendChild(elmc);
        document.body.appendChild(elma);
        var elm_bg = this.createdom({"tag":"div","classname":"tippop_bg"});
        document.body.appendChild(elm_bg);
        a_cal.addEventListener('click',function(){
            elm_bg.remove();
            elma.remove();
            options.callback && options.callback();
        },false);
        a_sure.addEventListener('click',function(){
            var v = input.value.trim();
            if(v.length==0) return;
            elm_bg.remove();
            elma.remove();
            options.callback && options.callback(input.value);
        },false);
    },
    createdom:function(options){
        var dom = document.createElement(options.tag);
        dom.className = options.classname;
        if(options.msg){
            dom.innerHTML = options.msg;
        }
        return dom;
    }
};


window.cmtools = {
    createDom:function(options){
        var dom = document.createElement(options.tag);
        dom.className = options.classname;
        if(options.msg){
            dom.innerHTML = options.msg;
        }
        return dom;
    },
    setAttr:function(dom,attrs){
		for(k in attrs){
			dom.setAttribute([attrs[k][0]],attrs[k][1]);
		}
	},
    createPop:function(){
        this.pop = this.createDom({"tag":"div","classname":"cm-pop"});
        this.pop.innerHTML = '<a href="javascript:;" class="J_popclose cm-pop-bg" data-target="#J_pop_bottom"></a>\
            <div class="cm-pop-cont cm-pop-botcont">\
                <div class="cm-pop-otil"><a href="javascript:;" class="J_cal cp-btn">取消</a><a href="javascript:;" class="J_sure cp-btn cp-btna">确定</a><p class="J_til cp-til"></p></div>\
                <div class="J_slbox cm-slbox"></div>\
            </div>';
        this.boxer = this.pop.getElementsByClassName("J_slbox")[0];
        this.btn_cal = this.pop.getElementsByClassName("J_cal")[0];
        this.elm_til = this.pop.getElementsByClassName('J_til')[0];
        this.btn_sure = this.pop.getElementsByClassName("J_sure")[0];
        document.body.appendChild(this.pop);
    },
    createScroller:function(scroller,opts){
        scroller.datalist = opts.datalist;
        scroller.fieldshow = opts.fieldshow||'name';
        scroller.fieldvalue = opts.fieldvalue||'id';
        scroller.default_v = typeof(opts.default_v)!='undefined'?opts.default_v:null;
        scroller.unit = opts.unit?opts.unit:36;
        scroller.maxY = -(scroller.datalist.length-4)*scroller.unit;
        scroller.y = 4*scroller.unit;
        scroller.v = {};

        scroller.case = this.createDom({"tag":"div","classname":"cp-case"})
        scroller.roller = this.createDom({"tag":"ul","classname":"cp-ul"});
        scroller.case.appendChild(scroller.roller);
    },
    renderScroll:function(scroller){
        var len = scroller.datalist.length,
            fieldshow = scroller.fieldshow,
            default_v = typeof(scroller.default_v)!='undefined'?scroller.default_v:null,
            unit = scroller.unit,
            fieldvalue = scroller.fieldvalue,
            str = '';

        scroller.roller.style.webkitTransition = "all 0s";
        scroller.roller.style.webkitTransform = 'translateZ(0) translateY('+(4*scroller.unit)+'px)';
        
        scroller.maxY = -(len-4)*unit;
        for(var i=0;i<len;i++){
            var v = scroller.datalist[i];
            str += '<li class="cp-li">'+v[fieldshow]+'</li>';
            if(v[fieldvalue] == default_v){
                scroller.y = (3-i)*unit;
                this.v = v;
                scroller.roller.style.webkitTransform = 'translateZ(0) translateY('+((3-i)*unit)+'px)';
            };
        }
        scroller.roller.innerHTML = str;
        scroller.li = scroller.roller.getElementsByClassName('cp-li');
    },
    bindScroll:function(scroller){
        var that = this;
        var roller = scroller.roller,
            unit = scroller.unit,
            outer = scroller.case;

        var fy = ly = 0;

        outer.addEventListener('touchstart',function(event){
            roller.style.webkitTransition = "all 0s";
            var touches = event.targetTouches;
            fy = touches[0].pageY;
        },false);
        outer.addEventListener('touchmove',function(event){
            var touches = event.targetTouches;
            ly = touches[0].pageY;
            var cy =  ly - fy;
            roller.style.webkitTransform = 'translateZ(0) translateY('+(scroller.y+cy)+'px)';
            event.preventDefault();
        },false)
        outer.addEventListener('touchend',function(event){
            roller.style.webkitTransition = "all .3s";
            if(ly==0){
                fy = ly = 0;
                return false;
            }
            scroller.y = Math.round((scroller.y + ly - fy)/unit)*unit;
            if(scroller.y<=scroller.maxY){
                scroller.y = scroller.maxY;
            }else if(scroller.y>=3*unit){
                scroller.y = 3*unit;
            };
            roller.style.webkitTransform = 'translateZ(0) translateY('+(scroller.y)+'px)';
            fy =  ly = 0;

            var v = scroller.datalist[3-Math.floor(scroller.y/unit)];
            if(v[scroller.fieldvalue]!=that.v[scroller.fieldvalue]){
                that.v = v;
                that.selected&&that.selected(v); 
            }
        },false);
    },
    empty:function(){
        this.boxer.classList.add('cm-slbox-dis')
        this.datalist = null;
        this.default_v = null;
        this.roller.innerHTML = '';
    },
    reset:function(opts){
        this.datalist = opts.datalist?opts.datalist:[];
        this.default_v = opts.default_v!=null?opts.default_v:null;
        this.maxY = -(this.datalist.length-4)*this.unit;
        this.y = 4*this.unit;
        this.v = {};
        this.boxer.classList.remove('cm-slbox-dis')
        this.renderScroll(this)
    },
    timeFormat:function(time,format){
		format = format.replace("y",time.getFullYear());
		format = format.replace("m",(time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1));
		format = format.replace("d",time.getDate()<10?'0'+time.getDate():time.getDate());
		format = format.replace("h",time.getHours()<10?'0'+time.getHours():time.getHours());
		format = format.replace("i",time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
		format = format.replace("s",time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds());
		return format;
    },
    resety:function(){
        var idx = -1,
            dl = this.datalist,
            rid = this.rid;

        for(var i=0,len=dl.length;i<len;i++){
            if(dl[i].id==rid){
                idx = i;
                break;
            }
        };
        this.y = (3-idx)*this.unit;
        this.roller.style.webkitTransform = 'translateZ(0) translateY('+(this.y)+'px)';
    }
}
function applytools(keys){
    for(var i=0,len=keys.length;i<len;i++){
        this[keys[i]] = cmtools[keys[i]];
    }
};

function touchscroll(outer){
    applytools.call(this,['createDom','createPop','createScroller','renderScroll','bindScroll','empty','reset','resety']);
    this.boxer = outer.boxer;
    this.createScroller(this,outer.opts)
    this.boxer.appendChild(this.case);
    this.renderScroll(this);
    this.bindScroll(this);
    return this;
}

function dataSelect(option){
    this.opts = option;
    this.setting();
    return this;
}
dataSelect.prototype = {
    setting:function(){
        var opts = this.opts;
        this.target = opts.target;
        this.outer = opts.outer;
        this.fieldvalue = opts.fieldvalue||'id';
        this.selected = this.opts.selected ? this.opts.selected:null;
        this.title = opts.title||'';
        this.v = {};
        this.value = {};

        if(!this.outer&&!this.target){
            console.warn('请设置触发对象或者容器')
            return;
        }

        this.render();
    },
    render:function(){
        var that = this;
        if(this.target){
            applytools.call(this,['createDom','createPop']);
            this.createPop();
            this.scroller = new touchscroll(this);
            this.settil(this.title);
            this.bindTarget()
        }else{
            applytools.call(this,['createDom']);
            this.boxer = this.createDom({"tag":"div","classname":"cm-slbox"});
            this.boxer.classList.add('cm-slbox-nom')
            this.outer.appendChild(this.boxer)
            this.scroller = new touchscroll(this);
        }
        this.scroller.selected = function(rs){
            that.selected&&that.selected(rs);
            that.v = rs;
        }
    },
    settil:function(title){
        this.elm_til.innerHTML = title;
    },
    reset:function(opts){
        this.scroller.reset(opts);
    },
    empty:function(){
        this.v = {};
        this.scroller.empty();
    },
    bindTarget:function(){
        var that = this;
        this.target.addEventListener('click',function(){
            that.pop.classList.add('cm-pop-active');
        })
        this.btn_cal.addEventListener('click',function(){
            that.pop.classList.remove('cm-pop-active');
        })
        this.btn_sure.addEventListener('click',function(){
            if(typeof(that.v[that.fieldvalue])!='undefined'){
                that.opts.confirm&&that.opts.confirm(that.v,function(){
                    that.value = that.v;
                    that.pop.classList.remove('cm-pop-active');
                });
            }
        })
    }
};

function datePicker(opts){
    this.opts = opts;
    this.setting();
}
datePicker.prototype = {
    setting:function(){
        var opts = this.opts;
        this.targets = opts.targets;
        this.timegroups = ['y','m','d','h','i','s'];
        this.unit = opts.unit||36;
        this.format_all = 'y/m/d h:i:s';
        this.format = opts.format||'y/m/d h:i:s';
        this.confirm = opts.confirm||null;
        this.default_time = opts.default_time||new Date();
        this.minyear = opts.minyear||2000;
        this.render();
        this.bindTargets();
    },
    render:function(){
        var that = this;
        applytools.call(this,['createDom','createPop','timeFormat']);
        this.createPop();
        this.bindTarget();
        this.group = {y:{},m:{},d:{},h:{},i:{},s:{}};
        var opt = {
            y:{outer:this.group.y.boxer,datalist:this.getlistdata({start:this.minyear,end:2040,range:1,unit:'年'}), default_v:this.minyear},
            m:{outer:this.group.m.boxer,datalist:this.getlistdata({start:1,end:13,range:1,unit:'月'}), default_v:1},
            d:{outer:this.group.d.boxer,datalist:this.getlistdata({start:1,end:32,range:1,unit:'日'}), default_v:1},
            h:{outer:this.group.h.boxer,datalist:this.getlistdata({start:0,end:24,range:1,unit:'时'}), default_v:0},
            i:{outer:this.group.i.boxer,datalist:this.getlistdata({start:0,end:60,range:5,unit:'分'}), default_v:0},
            s:{outer:this.group.s.boxer,datalist:this.getlistdata({start:0,end:60,range:5,unit:'秒'}), default_v:0}
        }

        for(tp in this.group){
            this.group[tp].boxer = this.createDom({"tag":"div","classname":"cm-slbox-time"});
            this.boxer.appendChild(this.group[tp].boxer);
            this.group[tp].opts = opt[tp];
            this.group[tp].scroller = new touchscroll(this.group[tp]);
            if(tp=='y'||tp=='m'){
                this.group[tp].scroller.selected = function(rs){
                    that.changeday();
                }
            }
        }
    },
    getlistdata:function(opts){
        var arr = [];
        for(var i=opts.start;i<opts.end;i+=opts.range){
            arr.push({id:i,name:(i<10?'0'+i:i)+opts.unit})
        }
        return arr;
    },
    changeday:function(){
        var valy = this.group.y.scroller.v.id,
            valm = this.group.m.scroller.v.id,
            sd = this.group.d,
            li = this.group.d.scroller.li,
            date = new Date(valy+'/'+valm+'/01');
        
        date.setMonth(valm);
        date.setDate(0);

        var dmax = date.getDate();
        for(var i=27;i<31;i++){
            li[i].style.opacity = i<dmax?1:0;
        };
        sd.scroller.maxY = -(dmax-4)*this.unit;
        if(sd.scroller.v.id>dmax){
            sd.scroller.v = {id:dmax,name:dmax+'日'};
            sd.scroller.y = sd.scroller.maxY;
            sd.scroller.roller.style.webkitTransform = 'translateZ(0) translateY('+(sd.scroller.y)+'px)';
        }
    },
    settil:function(title){
        this.elm_til.innerHTML = title;
    },
    bindTarget:function(){
        var that = this;
        this.btn_cal.addEventListener('click',function(){
            that.pop.classList.remove('cm-pop-active');
        })
        this.btn_sure.addEventListener('click',function(){
            var group = that.group,
                time = new Date(group.y.scroller.v.id+'/'+group.m.scroller.v.id+'/'+group.d.scroller.v.id+' '+group.h.scroller.v.id+':'+group.i.scroller.v.id+':'+group.s.scroller.v.id);
            that.confirm&&that.confirm({time:time,time_str:that.timeFormat(time,that.format),target:that.target},function(){
                that.target.setAttribute('data-time',that.timeFormat(time,that.format_all))
                that.pop.classList.remove('cm-pop-active');
            })
        })
    },
    bindTargets:function(){
        var that = this;
        for(var i=0,len=this.targets.length;i<len;i++){
            (function(){
                var target = that.targets[i];
                target.addEventListener('click',function(){
                    that.settil(target.getAttribute('data-title'));
                    that.timegroup = (target.getAttribute('data-timegroup')||'y-m-d-h-i-s').split('-');
                    that.format = target.getAttribute('data-format')||'y/m/d h:i:s';
                    that.default_time = target.getAttribute('data-time')?new Date(target.getAttribute('data-time')):new Date();
                    that.default_time = that.resettime(that.default_time);
                    that.resetroller();
                    that.target = target;
                    that.pop.classList.add('cm-pop-active')
                })
            })()
        }
    },
    resettime:function(time){
        var i = parseInt(time.getMinutes()/5)*5;
        var s = parseInt(time.getSeconds()/5)*5;
        return new Date(time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate()+' '+time.getHours()+':'+i+':'+s);
    },
    resetroller:function(){
        var that = this,
            time = this.default_time,
            group = this.group,
            timegroup = this.timegroup;
        this.boxer.setAttribute('class','J_slbox cm-slbox cm-slbox'+timegroup.length)
        group.y.scroller.rid = time.getFullYear();
        group.m.scroller.rid = time.getMonth()+1;
        group.d.scroller.rid = time.getDate();
        group.h.scroller.rid = time.getHours();
        group.i.scroller.rid = time.getMinutes();
        group.s.scroller.rid = time.getSeconds();
        for(i in this.timegroups){
            group[this.timegroups[i]].scroller.boxer.style.display = (timegroup.indexOf(this.timegroups[i])>-1?'block':"none");
            group[this.timegroups[i]].scroller.resety();
        }
    }
}

function dateTable(opts){
    this.opts = opts;
    this.setting();
}
dateTable.prototype = {
    setting:function(){
        var that = this,
			opts = this.opts;

		this.targets = opts.targets;
		var gt = this.opts.defaultdate?new Date(this.opts.defaultdate.replace(/\-/ig,'/')):new Date();
		// this.settime(gt);
		this.prevtext = opts.prevtext?opts.prevtext:"&lt;";
		this.nexttext = opts.nexttext?opts.nexttext:"&gt;";
		this.monthtext = opts.monthtext?opts.monthtext:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        this.weektext = opts.weektext?opts.weektext:["日","一","二","三","四","五","六"];
        this.pb = opts.paddingBottom||0;
        this.default_time = opts.default_time||new Date();
        
        if(this.targets){
            applytools.call(this,['createDom','createPop']);
            this.createPop();
            this.pop.classList.add('cm-pop-active')
            this.boxer.classList.add('cm-slbox-table')
            this.settil(this.title);
        }else{
            this.boxer = this.opts.boxer;
        };

        this.boxer.innerHTML = '<div class="dateselect_table">\
                <div class="dp-btns">\
                    <a href="javascript:;" class="J_btn_prev dt-mbtn">&lt;</a>\
                    <a href="javascript:;" class="J_btn_next dt-mbtn dt-mbtna">&gt;</a>\
                    <a href="javascript:;" class="J_btn_year dt-btn"><span class="J_year">2012</span>年</a>\
                    <a href="javascript:;" class="J_btn_month dt-btn dt-btna"><span class="J_year">2012</span>月</a>\
                </div>\
                <table width="100%" cellspacing="0" cellpadding="0" class="J_table"></table>\
                <div class="dateselect_cont">\
                    <div class="cont-month cont-pop"></div>\
                    <div class="cont-year cont-pop">\
                        <div class="cont-yl"><p class="cont-ylrm">&lt;</p></div>\
                        <div class="cont-yr"><p class="cont-ylrm">&gt;</p></div>\
                        <div class="cont-yc"></div>\
                        <div class="cont-yx">取消年份选择</div>\
                    </div>\
                </div>\
            </div>';
        this.table = this.boxer.getElementsByClassName("J_table")[0];
        // this.dp_cal = this.boxer.getElementsByClassName("dp-cal")[0];
        // this.dp_til = this.boxer.getElementsByClassName('dp-til')[0];
        // this.dp_sure = this.boxer.getElementsByClassName("dp-sure")[0];
        // this.cont_month = this.boxer.getElementsByClassName('cont-month')[0];
        // this.cont_year = this.boxer.getElementsByClassName('cont-year')[0];
        // this.cont_year_c = this.boxer.getElementsByClassName('cont-yc')[0];
        // this.cont_year_l = this.boxer.getElementsByClassName('cont-yl')[0];
        // this.cont_year_r = this.boxer.getElementsByClassName('cont-yr')[0];
        // this.cont_year_x = this.boxer.getElementsByClassName('cont-yx')[0];

        this.resettable(this.default_time)
    },
    settil:function(title){
        this.elm_til.innerHTML = title||'';
    },
    rendertable:function(){
        // this.active = null;
		// var newdate = new Date(this.year+'/'+this.month+'/1');
		// var firstday = newdate.getDay();
		// var m = newdate.getMonth()+1,y = newdate.getFullYear();
		// var cm = this.selectdate.getMonth()+1,cy = this.selectdate.getFullYear(),cd = this.selectdate.getDate();
		// var daynum = new Date(y,m,0).getDate();
		// var trs = Math.ceil((firstday+daynum)/7);
		var str = '';
		// for(var i=0;i<trs;i++){
		// 	var stra = '';
		// 	for(var ii=1;ii<=7;ii++){
		// 		var cdstr = (y==cy&&m==cm&&(i*7+ii-firstday)==cd)?'selected':'';
		// 		if((i*7+ii>firstday) && (i*7+ii<=daynum+firstday)){
		// 			stra += '<td class="td"><a href="javascript:;" data-month="'+m+'" data-year="'+y+'" data-date="'+(i*7+ii-firstday)+'" class="a '+cdstr+'">'+(i*7+ii-firstday)+'</a></td>';
		// 		}else{
		// 			stra += '<td class="td"></td>';
		// 		}
		// 	}
		// 	str += '<tr>'+stra+'</tr>';
		// }
		return str;
    },
    resettable(time){
        
        this.table.innerHTML = this.rendertable();
    }
}