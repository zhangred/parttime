function zshcanvas(opt){
    this.opt = opt;
    this.baseinit();
}
zshcanvas.prototype = {
    baseinit:function(){
        var opt = this.opt;
        this.rem = opt.rem||1,
        this.rate = opt.rate||1,
        this.steps = opt.steps||[];
        this.width = opt.width;
        this.height = opt.height;
        this.id = opt.id;
        this.idx = 0;
        this.len = this.steps.length;

        this.elm = document.getElementById(this.id);
        this.elm.setAttribute('width',this.width*this.rate);
        this.elm.setAttribute('height',this.height*this.rate);
        
        var that = this;
        setTimeout(function(){
            that.canvas = that.elm.getContext("2d");
            that.setcanvas();
        },10);
    },
    //渲染画布
    setcanvas:function(){
        var that = this;
        if(this.idx>=this.len){
            setTimeout(function(){
                var imgdata = that.elm.toDataURL();
                that.opt.callback&&that.opt.callback({data:imgdata,canvas:that.canvas});
            },50)
        }else{
            var type = this.steps[this.idx].type;
            if(type=="img"){
              this.setcanvasImg();
            }else if(type=="text"){
              this.setcanvasText();
            }else if(type=="fillrect"){
              this.setcanvasFillRect();
            }else if(type=="line"){
                this.setcanvasLine();
            }
        }
    },
    // 渲染图片
    setcanvasImg:function(){
        var that = this,
            v = this.steps[this.idx],
            rate = this.rate;

        var img = new Image();
        img.setAttribute("crossOrigin",'Anonymous');
        img.src = v.url;
        img.onload = function(res){
            if(v.radius){
                that.canvas.save()
                that.canvas.beginPath()
                that.canvas.arc((v.left+v.width/2)*rate, (v.top+v.height/2)*rate, v.width*rate/2, 0, 2*Math.PI)
                that.canvas.clip()
                that.canvas.drawImage(img,v.left*rate, v.top*rate, v.width*rate, v.height*rate)
                that.canvas.restore()
            }else{
               that.canvas.drawImage(img,v.left*rate,v.top*rate,v.width*rate,v.height*rate); 
            }
            that.idx++;
            that.setcanvas();
        };
        img.onerror = img.onabort = function () {
            that.idx++;
            that.setcanvas()
        }
    },
    //填充矩形
    setcanvasFillRect:function(){
        var that = this,
            v = this.steps[this.idx],
            rate = this.rate;
        this.canvas.fillStyle = v.fillstyle;
        if(v.radius){
            var x = v.left*rate,
                y = v.top*rate,
                width = v.width*rate,
                height = v.height*rate,
                radius = v.radius*rate;

            this.canvas.beginPath();
            this.canvas.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
            this.canvas.lineTo(width - radius + x, y);
            this.canvas.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
            this.canvas.lineTo(width + x, height + y - radius);
            this.canvas.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
            this.canvas.lineTo(radius + x, height +y);
            this.canvas.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
            this.canvas.closePath();
            this.canvas.fill();
        }else{
            this.canvas.fillRect(v.left*rate,v.top*rate,v.width*rate,v.height*rate);
        };

        that.idx++;
        that.setcanvas()
    },
    //填充文字
    setcanvasText:function(){
        var that = this,
            v = this.steps[this.idx],
            rate = this.rate,
            line = 0,
            align = v.align||"left",
            text = v.text,
            fontsize = (v.fontsize||20)*rate,
            wight = v.weight||'',
            color = v.color||"#000000",
            lineheight = (v.lineheight||30)*rate,
            width = (v.width||750)*rate,
            left = (v.left||0)*rate,
            top = (v.top||0)*rate;

        left = align=='center'?left + width/2 : left;
        left = align=='right'?left + width : left;

        this.canvas.font= wight+' '+fontsize+"px Arial";
        this.canvas.textBaseline = "top";
        this.canvas.textAlign= align;
        this.canvas.fillStyle = color;

        this.cuttext(text,width,function(t,done){
            that.canvas.fillText(t,left,top+line*lineheight,width);
            line++;
            if(done){
                that.idx++;
                that.setcanvas();
            }
        })

        
    },
    //切割文字
    cuttext:function(text,width,cb){
        var that = this,
            len = text.length+1,
            ctx = this.canvas;

        for(var i=0;i<=len;i++){
            var t = text.substr(0,i);
            if(ctx.measureText(t).width>width&&i<len){
                t = text.substr(0,i-1);
                cb(t);
                text = text.substr(i-1);
                this.cuttext(text,width,cb)
                break;
            }else if(i>=len){
                cb(text,true)
            }
        }
    },
    //横线
    setcanvasLine:function(){
        var that = this,
            v = this.steps[this.idx],
            rate = this.rate,
            ctx = this.canvas,
            cap = v.cap||"butt";

        ctx.beginPath();
        ctx.lineCap=cap;
        if(v.dash){
            var dash = v.dash.map(function(item){
                return item*rate;
            })
            ctx.setLineDash(dash);
        }
        ctx.moveTo(v.left*rate,v.top*rate);
        ctx.lineTo((v.left+v.oftx)*rate,(v.top+v.ofty)*rate);
        ctx.lineWidth = v.width*rate;
        ctx.strokeStyle = v.color||"#000000";
        ctx.stroke();

        this.idx++;
        this.setcanvas();
    },
    //补充画布
    addsteps:function(arr){
        this.steps = this.steps.concat(arr);
        this.len = this.steps.length;
        this.setcanvas();
    },
    //重新渲染
    resetsteps:function(arr){
        this.steps = arr||[];
        this.len = this.steps.length;
        this.idx = 0;
        this.canvas.clearRect(0,0,this.width*this.rate,this.height*this.rate);
        this.setcanvas();
    }
}


