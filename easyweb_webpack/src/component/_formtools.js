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
        setTimeout(function(){
            if(show){
                _this.box.style.height = '0';
            }else{
                _this.box.style.height = _this.box.scrollHeight + 'px';
            }
        },10)
    }
    componentDidMount(){
        this.box.style.webkitTransition = "all 0.3s";
        this.box.style.height = this.box.scrollHeight + 'px';
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

//下拉框
class Droplist extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>sdfsdf</div>
        )
    }
}


// 文本输入框
class Textarea extends React.Component {
    constructor(...args){
        super(...args)
        this.textchangexx = this.textchangexx.bind(this)
    }
    textchangexx(e){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].content = e.target.value;
        this.context.toptarget.setState({data:state.data})
    }
    render(){
        return (
            <div className="form-eline form-eline-line">
                <p className="el-lado">{this.props.title||'文本内容'}</p>
                <p className="el-textareaer"><textarea className="el-textarea" onChange={this.textchangexx} value={this.props.data}></textarea></p>
            </div>
        )
    }
}
Textarea.contextTypes = {
    toptarget:PropTypes.object
}

// 滑动条
class Sliderbar extends React.Component{
    constructor(...args){
        super(...args)
        this.state = {
            left:0
        }
        this.inputcomm = this.inputcomm.bind(this);
        this.eventcomm = this.eventcomm.bind(this);
    }
    inputchange(e){
        this.inputcomm(parseFloat((e.target.value||'').replace(/[^\d.-]/ig,'')))
    }
    inputcomm(val){
        if(this.props.attra&&!this.props.attrb){
            
        }else{
            var state = this.context.toptarget.state,
                attra =state.data[state.active_idx][this.props.attra],
                v = val;
            
            if(v<this.props.minvalue){
                v = this.props.minvalue;
            }
            if(v>this.props.maxvalue){
                v = this.props.maxvalue;
            }

            if(v!=''){
                v = parseInt(v*10)/10;
            }

            attra[this.props.attrb] = v||'';
            

            state.data[state.active_idx][this.props.attra] = attra;
            this.context.toptarget.setState({data:state.data})
        }
    }
    eventcomm(e){
        var props = this.props,
            oft = this.pot.getBoundingClientRect().left + 7,
            bar_oft = this.bar.getBoundingClientRect(),
            left = e.clientX - bar_oft.left;

        this.setState({left:left})

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

    }
    render(){
        return (
            <div className="form-eline">
                <p className="el-ado">{this.props.title||'设置'}</p>
                <div className="el-sliderbar">
                    <div className="el-sb-slider"><p className="el-sb-bg" ref={node=>(this.bar=node)}></p><p ref={node=>(this.pot=node)} className="el-sb-bar" style={{left:this.state.left}}></p></div>
                    <input type="number" className="el-sb-ctrol" value={this.props.value||''} onChange={this.inputchange.bind(this)} />
                </div>
            </div>
        )
    }
}
Sliderbar.contextTypes = {
    toptarget:PropTypes.object
}


// 文本样式
class Textfont extends React.Component{
    constructor(props){
        super(props)
        // console.log(this.props)
    }
    fontchange(type,val){
        var state = this.context.toptarget.state,
            css =state.data[state.active_idx].css;

        css[type] = css[type]==val?'':val;
        this.context.toptarget.setState({data:state.data})
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
Textfont.contextTypes = {
    toptarget:PropTypes.object
}

// 字号
class Fontsize extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props)
    }
    render(){
        return (
            <div className="form-eline">
                <p className="el-ado">{this.props.title||'设置'}</p>
                <Droplist  />
            </div>
        )
    }
}
Fontsize.contextTypes = {
    toptarget:PropTypes.object
}


export {Togglebox,Textarea,Sliderbar,Textfont,Fontsize}
