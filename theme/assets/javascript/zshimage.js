function zshImageCompress(opts){
    if(opts.file){
        var file = opts.file;
        var mopt = {}
        opts.width?mopt.width=opts.width:'';
        opts.height?mopt.height=opts.height:'';
        opts.maxWidth?mopt.maxWidth=opts.maxWidth:'';
        opts.maxHeight?mopt.maxHeight=opts.maxHeight:'';
        mopt.quality = opts.quality||1;
        EXIF.getData(file, function() {
            var Orientation = EXIF.getTag(this, 'Orientation');
            var mpImg = new MegaPixImage(file);
            var resImg = new Image;
            mopt.orientation = Orientation;
            mpImg.render(resImg, mopt,function(res){
                opts.success&&opts.success(res);
            })
        })
    }else if(opts.url){
        var nimg = new Image;
        nimg.src = opts.url;
        var mopt = {}
        opts.width?mopt.width=opts.width:'';
        opts.height?mopt.height=opts.height:'';
        opts.maxWidth?mopt.maxWidth=opts.maxWidth:'';
        opts.maxHeight?mopt.maxHeight=opts.maxHeight:'';
        mopt.quality = opts.quality||1;
        var mpImg = new MegaPixImage(nimg);
        var resImg = new Image;
        mpImg.render(resImg, mopt,function(res){
            opts.success&&opts.success(res);
        })
    }else{
        console.warn('请选择图片或者传入图片地址')
    }
}

function readImageInfo(opts){
    if(opts.file){
        var file = opts.file;
        var reader = new FileReader(); 
        reader.readAsDataURL(file); 
        reader.onload=function(e){
            var ni = new Image;
            ni.src = this.result;
            ni.onload = function(){
                opts.callback({width:ni.width,height:ni.height,size:file.size,type:file.type})
            }
        } 
    }
    if(opts.base64){
        var ni = new Image;
        ni.src = opts.base64;

        var str = opts.base64.substr(opts.base64.indexOf(',')),
            strlen = str.length,
            size = parseInt(strlen-(strlen/8)*2),
            type = opts.base64.substr(0,opts.base64.indexOf(',')).match(/(image\/\w*)/)[0];

        ni.onload = function(){
            opts.callback({width:ni.width,height:ni.height,size:size,type:type})
        }
    }
    if(opts.src){
        var ni = new Image;
        ni.src = opts.src;
        ni.onload = function(){
            opts.callback({width:ni.width,height:ni.height})
        }
    }
}

function zshImgClip(opts){
    opts.width_show = opts.width_show||200;
    opts.height_show = opts.height_show||200;
    opts.width_clip = opts.width_clip||200;
    opts.height_clip = opts.height_clip||200;
    this.opts = opts;

    this.setting();
}
zshImgClip.prototype = {
    setting:function(){
        this.dom = document.createElement('div');
        this.dom.className = 'cm-clipimage';
        this.dom.innerHTML = '<img src="" style="width: 100%;" class="clipimage-img" id="J_ci_img">\
            <p class="clipimage-cover"><span class="clipimage-coverin"></span></p>\
            <p class="clipimage-touch"></p>\
            <div class="clipimage-btns">\
                <a href="javascript:;" class="J_cancel clipimage-btn">取消</a>\
                <p class="clipimage-btn">上传<input class="clipimage-file" type="file" accept="image/*"  ></p>\
                <a href="javascript:;" class="J_confirm clipimage-btn">确认裁剪</a>\
            </div>';
        document.body.appendChild(this.dom);

        if(this.opts.show){
            this.show();
        }
        
        this.cancel = this.dom.getElementsByClassName('J_cancel')[0];
        this.input = this.dom.getElementsByClassName('clipimage-file')[0];
        this.confirm = this.dom.getElementsByClassName('J_confirm')[0];

        this.cover = document.getElementsByClassName('clipimage-cover')[0];
		this.chuang = document.getElementsByClassName('clipimage-coverin')[0];

        this.sourcecode();
        this.bindEvents()
    },
    sourcecode:function(){
        this.hasimg = false;

        var that = this,
            winw = window.innerWidth,
            winh = window.innerHeight,
            opts = this.opts;

        var start_loc = [{"x":0,"y":0},{"x":0,"y":0}], // 开始移动坐标
	        end_loc = [{"x":0,"y":0},{"x":0,"y":0}], // 最后移动坐标
	        scale_loc = {"x":0,"y":0,"range":0,"ox":0,"oy":0}, //  缩放参数，
	        isscale = false, // 是否双指缩放
	        iszoom = false,
            ismove = false;
        
        var cover = this.cover;
        var box = this.dom,
			img = this.dom.getElementsByClassName('clipimage-img')[0],
            fileInput = this.input;
        
        this.img = img;

            
        cover.style.borderLeftWidth = (winw-opts.width_show)/2+'px';
        cover.style.borderRightWidth = (winw-opts.width_show)/2+'px';
        cover.style.borderTopWidth = ((winh-opts.height_show)/2 - 20 )+'px';
        cover.style.borderBottomWidth = ((winh-opts.height_show)/2 + 20)+'px';

        fileInput.onchange = function(){
			img.style.cssText = 'width:100%;';
			var file = fileInput.files[0];
			var reader = new FileReader(); 
		    //将文件以Data URL形式读入页面 
		    reader.readAsDataURL(file); 
		    reader.onload=function(e){
		    	img.setAttribute('src',this.result);
		    	var ni = new Image;
		    	ni.src = this.result;
		    	ni.onload = function(){
		    		that.hasimg = true;
		    		var oft = img.getBoundingClientRect();
		    		styletransform(img.style,'translateY('+((winh-oft.bottom)/2-20)+'px)');
		    		setTimeout(function(){
		    			initmobj();
		    		},30);
		    	}
		    } 
        }

        function styletransform(elm,css,time){
            if(time){
                elm.webkitTransition = time;
                elm.transition = time;
            };
            elm.webkitTransform = css;
            elm.transform = css;
        };

        /*重置图片元素*/
        function initmobj(){
            var bc = img.getBoundingClientRect();

            img.style.cssText = 'width:'+bc.width+'px;top:'+bc.top+'px;left:'+bc.left+'px;';
            start_loc = [{"x":0,"y":0},{"x":0,"y":0}];
        };

        box.addEventListener('touchstart',function(event){
	        var touches = event.targetTouches;
	        if(touches.length==2){
	            if(ismove){return;};
	            setstartloc(touches,1);
	            isscale = true;
	        }else{
	            setstartloc(touches,0);
	        };
	    },false);

	    box.addEventListener('touchmove',function(event){
	        var touches = event.targetTouches;
	        if(isscale){
	            elmscalefunc(touches[0],touches[1]);
	        }else{
	            ismove = true;
	        	elmtransfunc(touches[0]);
	        }
	        event.preventDefault();
	    },false);

    	box.addEventListener('touchend',function(event){
    		initmobj();
	        if(isscale){
	            if(event.touches[0]){
	                setstartloc(event.touches,0);
	            }
	            isscale = false;
	        };
	        if(event.touches.length==0){
	        	setTimeout(function(){
	        		setboders();
	        	},30);
	        };
	        ismove = false;
        },false);

        /*设置点击坐标*/
        function setstartloc(tc,idx){
            start_loc[idx].x = tc[idx].clientX;
            start_loc[idx].y = tc[idx].clientY;
            if(idx==1&&start_loc[0].x==0){
                setstartloc(tc,0);
            };
            if(start_loc[0].x&&start_loc[1].x){
                setcenter(tc);
            };
        };

        /*设置初始两点的坐标和间距*/
        function setcenter(tc){
            var bc = img.getBoundingClientRect(),
                cen = getcenter(start_loc[0],start_loc[1]);

            scale_loc.x = cen.x - bc.left;
            scale_loc.y = cen.y - bc.top;
            scale_loc.range = cen.range;
        };

        /*计算中心点和间距*/    
        function getcenter(a,b){
            var o = {};
            o.x = (a.x + b.x)/2;
            o.y = (a.y + b.y)/2;
            o.range = Math.sqrt(Math.pow(a.x - b.x,2)+Math.pow(a.y - b.y,2));
            return o;
        };
        
        /*图片缩放功能*/
        function elmscalefunc(tca,tcb){
            
            var o = Math.sqrt(Math.pow(tca.clientX - tcb.clientX,2)+Math.pow(tca.clientY - tcb.clientY,2)),
                scale_last = o/scale_loc.range,
                cs = 1 - scale_last,
                ox = cs*scale_loc.x + scale_loc.ox,
                oy = cs*scale_loc.y + scale_loc.oy;
            styletransform(img.style,"translate("+ox+"px,"+oy+"px) scale("+scale_last+","+scale_last+")");
        };

       /*图像移动*/
        function elmtransfunc(tc){
            var s = start_loc[0],e = end_loc[0];
            e.x = tc.clientX;
            e.y = tc.clientY;
            var cx = e.x - s.x,
                cy = e.y - s.y;

            styletransform(img.style,"translate("+cx+"px,"+cy+"px)");
        };

        /*图像边缘处理*/
        function setboders(){
            var imgbc = img.getBoundingClientRect(),
                seebc = that.chuang.getBoundingClientRect();

            if(imgbc.width>1800||imgbc.height>1800){
                if(imgbc.width>1800&&imgbc.width>imgbc.height){
                    img.style.width = '1800px';
                }else{
                    img.style.width = (1800*imgbc.width/imgbc.height)+'px';
                }
                var nimgbc = img.getBoundingClientRect();

                img.style.left = (nimgbc.left + (imgbc.width - nimgbc.width)*(winh/2 - imgbc.left)/imgbc.width) + 'px';
                img.style.top = (nimgbc.top + (imgbc.height - nimgbc.height)*((winh-40)/2 - imgbc.top)/imgbc.height) + 'px';
            }

            if(imgbc.width<opts.width_clip||imgbc.height<opts.height_clip){
                if(imgbc.width<opts.width_clip&&(imgbc.width/imgbc.height)<(opts.width_clip/opts.height_clip)){
                    img.style.width = opts.width_clip+'px';
                }else{
                    img.style.width = (opts.height_clip*imgbc.width/imgbc.height)+'px';
                }
                var nimgbc = img.getBoundingClientRect();
                img.style.left = (winw - nimgbc.width)/2 + 'px';
                img.style.top = ((winh-40) - nimgbc.height)/2 + 'px';
            }

            imgbc = img.getBoundingClientRect();
            var ani = false;
            if(imgbc.left>seebc.left){
                ani = true;
                img.style.left = seebc.left +'px';
            };
            if(imgbc.top>seebc.top){
                ani = true;
                img.style.top = seebc.top+'px';
            };
            if(imgbc.right<seebc.right){
                ani = true;
                img.style.left = (seebc.right-imgbc.width)+ 'px';
            };
            if(imgbc.bottom<seebc.bottom){
                ani = true;
                img.style.top = (seebc.bottom-imgbc.height)+ 'px';
            };
            if(ani){
                img.style.webkitTransition = "all .1s";
                setTimeout(function(){
                    img.style.webkitTransition = "none";
                },110)
            }
        }
    },
    show:function(){
        var that = this;
        this.dom.classList.add('cm-clipimage-ac');
        setTimeout(function(){
            that.dom.classList.add('cm-clipimage-show');
        },100)
    },
    hide:function(){
        var that = this;
        this.dom.classList.remove('cm-clipimage-show');
        setTimeout(function(){
            that.dom.classList.add('cm-clipimage-ac');
        },210)
    },
    bindEvents:function(){
        var that = this;
        this.cancel.addEventListener('click',function(){
            that.hide();
        })
        this.confirm.addEventListener('click',function(){
            if(!that.hasimg){
                alert('请上传图片')
            };
    
            var imgbc = that.img.getBoundingClientRect();
            var seebc = that.chuang.getBoundingClientRect();
            var file = that.input.files[0];

            zshImageCompress({
                file:file,
                width:imgbc.width*2,
                height:imgbc.height*2,
                quality:1,
                success:function(rs){
                    var img = new Image;
                    img.src = rs;
                    img.onload = function(){
                        var canvas = document.createElement("canvas");
                        canvas.width = that.opts.width_clip*2;
                        canvas.height = that.opts.height_clip*2;

                        canvas.getContext("2d").drawImage(
                            img,
                            (imgbc.left - seebc.left)*2,
                            (imgbc.top - seebc.top)*2,
                            imgbc.width*2,
                            imgbc.height*2
                        );
                        that.opts.confirm&&that.opts.confirm(canvas.toDataURL('image/jpeg'))
                        that.hide()
                    }
                }
            })
        })
    }
}
