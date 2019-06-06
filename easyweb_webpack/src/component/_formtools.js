import React from 'react';
import PropTypes from 'prop-types';
import { Chrome } from 'react-color';
import {Clone} from './_public'

class Togglebox extends React.Component {
    constructor(...args){
        super(...args);
        this.state = {
            show:this.props.show||false
        }
    }
    toggle(){
        this.setState({show:!this.state.show})
        var show = this.state.show,
            _this = this;
        this.setState({show:!show})
        _this.box.style.overflow = 'hidden';
        setTimeout(function(){
            if(show){
                _this.box.style.height = '0';
            }else{
                _this.box.style.height = _this.box.scrollHeight + 'px';
            }
        },10)
        setTimeout(function(){
            if(_this.state.show){
                _this.box.style.overflow = 'visible'
            }
        },300)
    }
    componentDidMount(){
        this.box.style.webkitTransition = "all 0.3s";
        this.box.style.height = this.box.scrollHeight + 'px';
        if(this.state.show){
            this.box.style.overflow = 'visible'
        }
    }
    render(){
        return (
            <div className="fs-togglebox">
                <div className="tb-til">
                    {this.props.title}
                    <p className="tb-do" onClick={this.toggle.bind(this)}>{this.state.show?'隐藏选项':'展开选项'}</p>
                </div>
                <div className="tb-box" ref={node=>(this.box=node)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


// 文本输入框
class Textarea extends React.Component {
    constructor(...args){
        super(...args)
        this.textchange = this.textchange.bind(this)
    }
    textchange(e){
        this.props.bindevent(e.target.value)
    }
    render(){
        return (
            <div className="form-eline form-eline-line">
                <p className="el-lado">{this.props.title||'文本内容'}</p>
                <p className="el-textareaer"><textarea className="el-textarea" onChange={this.textchange} value={this.props.data}></textarea></p>
            </div>
        )
    }
}

//下拉框
class Droplist extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            hover:false,
            tar:{}
        }

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    onMouseEnter(){
        this.setState({
            hover: true,
        });
    }
    
    onMouseLeave(){
        this.setState({
            hover: false,
        })
    }
    select(item){
        this.setState({
            hover: false,
            tar:item
        })
        if(this.props.bindevent){
            this.props.bindevent(item)
        }
    }
    componentDidMount(){
        var dt = this.props.data,
            value = this.props.value,
            tar = '',
            len = dt.length;

        for(var i=0;i<len;i++){
            if(value==dt[i].value){
                this.setState({tar:dt[i]})
                break;
            }
        }
    }
    render(){
        return (
            <div>
                <div className="el-dropmenu" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <p className={"el-dm-til "+(this.state.tar.name?'':'el-dm-til-dis')}>{this.state.tar.name||'请选择'}</p>
                    <div className={"el-dm-drop "+(this.state.hover?'el-dm-drop-hover':'')}>
                        {this.props.data.map((item,index)=>
                            <p key={index.toString()} onClick={this.select.bind(this,item)} className="el-dm-ls">{item.name}</p>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

// 字号
class Fontsize extends React.Component{
    constructor(props){
        super(props)
        // console.log(5,this.props)
        this.state = {
            list:[
                {id:1,name:'正文14',value:14,css:{fontSize:14}},
                {id:2,name:'标题18',value:18,css:{fontSize:18,fontWeight:'bold'}},
                {id:3,name:'副本12',value:12,css:{fontSize:12}},
                {id:6,name:'副标题16',value:16,css:{fontSize:16,fontWeight:'bold'}},
                {id:4,name:'大标题24',value:24,css:{fontSize:24,fontWeight:'bold'}},
                {id:5,name:'超大标题32',value:32,css:{fontSize:32,fontWeight:'bold'}}
            ]
        }
    }
    change(item){
        this.props.bindevent(item)
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <div className="form-eline">
                <p className="el-ado">{this.props.title||'设置'}</p>
                <Droplist data={this.state.list} value={this.props.value} bindevent={this.change.bind(this)} />
            </div>
        )
    }
}

// 文本样式
class Textfont extends React.Component{
    constructor(props){
        super(props)
        // console.log(this.props)
    }
    fontchange(type,val){
        this.props.bindevent(type,val)
    }
    render(){
        return (
            <div className="form-eline">
                <p className="el-ado">{this.props.title||'设置'}</p>
                <div className="el-textfont">
                    <div className={"el-tf-ls "+(this.props.css.textAlign=='left'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'textAlign','left')}><i className="icon zsh sh-zuoduiqi1"></i></div>
                    <div className={"el-tf-ls "+(this.props.css.textAlign=='center'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'textAlign','center')}><i className="icon zsh sh-fuhao-juzhongduiqi"></i></div>
                    <div className={"el-tf-ls "+(this.props.css.textAlign=='right'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'textAlign','right')}><i className="icon zsh sh-youduiqi1"></i></div>
                    <div className={"el-tf-ls "+(this.props.css.fontWeight=='bold'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'fontWeight','bold')}><i className="icon zsh sh-jiacu"></i></div>
                    <div className={"el-tf-ls "+(this.props.css.fontStyle=='italic'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'fontStyle','italic')}><i className="icon zsh sh-xieti"></i></div>
                    <div className={"el-tf-ls "+(this.props.css.textDecoration=='underline'?'el-tf-lsac':'')} onClick={this.fontchange.bind(this,'textDecoration','underline')}><i className="icon zsh sh-xiahuaxian"></i></div>
                </div>
            </div>
        )
    }
}


// 滑动条
class Sliderbar extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            left:0,
            val:0
        }
        this.inputcomm = this.inputcomm.bind(this);
        this.eventcomm = this.eventcomm.bind(this);
    }
    inputchange(e){
        var val = parseFloat((e.target.value||'').replace(/[^\d.-]/ig,''))||'';
        if(val<this.props.minvalue&&val!=''){
            val = this.props.minvalue;
        }
        if(val>this.props.maxvalue&&val!=''){
            val = this.props.maxvalue;
        }
        if(val!=''){
            val = parseInt(val*10)/10;
        }

        this.setState({val:val});
        this.inputcomm(val,true)
    }
    inputcomm(val,self){
        if(val<this.props.minvalue){
            val = this.props.minvalue;
        }
        if(val>this.props.maxvalue){
            val = this.props.maxvalue;
        }

        if(val!=''){
            val = parseInt(val*10)/10;
        }
        if(!self){
            this.setState({val:val});
        }
        this.setState({left:this.backleft(val||0)})
    
        this.props.bindevent(val||'')
    }
    backleft(val){
        var props = this.props,
            bar_oft = this.bar.getBoundingClientRect();
        return (val-props.minvalue)/(props.maxvalue-props.minvalue)*bar_oft.width;
    }
    eventcomm(e){
        var props = this.props,
            oft = this.pot.getBoundingClientRect().left + 7,
            bar_oft = this.bar.getBoundingClientRect(),
            left = e.clientX - bar_oft.left;

        var v = props.minvalue+(props.maxvalue-props.minvalue)*(left/bar_oft.width)
        v = parseInt(v*10)/10;
        this.inputcomm(v)
    }
    componentDidMount(){
        var _this = this,
            isdown = false;
        this.bar.addEventListener('mousedown',function(e){
            _this.eventcomm(e);
            isdown = true;
        })
        this.bar.addEventListener('mousemove',function(e){
            if(!isdown) return
            _this.eventcomm(e);
        })
        this.bar.addEventListener('mouseup',function(e){
            isdown = false;
        })
        this.bar.addEventListener('mouseout',function(e){
            isdown = false;
        })
        this.bar.addEventListener('mouseenter',function(e){
            if(e.which==1){
                isdown = true;
            }
        })

        this.setState({val:this.props.value||'',left:this.backleft(this.props.value||0)})

    }
    render(){
        return (
            <div className="form-eline">
                <p className="el-ado">{this.props.title||'设置'}</p>
                <div className="el-sliderbar">
                    <div className="el-sb-slider"><p className="el-sb-bg" ref={node=>(this.bar=node)}></p><p ref={node=>(this.pot=node)} className="el-sb-bar" style={{left:this.state.left}}></p></div>
                    <input type="number" className="el-sb-ctrol" value={this.state.val} onChange={this.inputchange.bind(this)} />
                </div>
            </div>
        )
    }
}



export {Togglebox,Textarea,Sliderbar,Textfont,Fontsize}
