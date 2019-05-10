import React from 'react'
import PropTypes from 'prop-types';
import Template from './article_template'
import {RandomString, Timeformat, Clone} from './_public'
import Edittools from './article_edit'

class Outcomponent extends React.Component {
    constructor(...args) {
        super(...args)
    }
    componentDidMount(){

    }
    render(){
        return React.createElement(Template[this.props.proto.type], {...this.props.proto}, null);
    }
}


class Left extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            type_active:'text',
            template_text:[]
        }
    }
    componentDidMount(){
        var that = this;
        this.getdata();
    }
    //获取模板列表
    getdata(){
        var list = ['text_normal'];
        this.setState({template_text:list})
    }
    //切换类型
    change(type){
        if(type==this.state.type_active) returnl
        this.setState({type_active:type})
    }
    //模板点击事件
    template_click(type,data){
        if(this.props.addclick){
            this.props.addclick(type,data)
        }
    }
    render() {
        return (
            <div>
                <div className="left">
                    <div className={"lls "+(this.state.type_active=="text"?"lls-active":"")} onClick={this.change.bind(this,'text')}><i className="icon zsh sh-xiahuaxian"></i>文本模板</div>
                    <div className={"lls "+(this.state.type_active=="pic"?"lls-active":"")} onClick={this.change.bind(this,'pic')}><i className="icon zsh sh-tupian"></i>图片模板</div>
                    <div className={"lls "+(this.state.type_active=="text_pic"?"lls-active":"")} onClick={this.change.bind(this,'text_pic')}><i className="icon zsh sh-tuwen_o"></i>图文模板</div>
                    <div className={"lls "+(this.state.type_active=="shape"?"lls-active":"")} onClick={this.change.bind(this,'shape')}><i className="icon zsh sh-xingzhuang-jianxing"></i>形状模板</div>
                    <div className={"lls "+(this.state.type_active=="music"?"lls-active":"")} onClick={this.change.bind(this,'music')}><i className="icon zsh sh-yinyue"></i>音乐</div>
                </div>

                <div className={"cont "+(this.state.type_active=="text"?"cont-active":"")}>
                    {this.state.template_text.map((item,index)=>
                        <div className="exps" key={index.toString()}><Outcomponent proto={{type:item,eventclick:this.template_click.bind(this),data:Template[item+'_data'],key:null}} /></div>
                    )}
                </div>
            </div>
        )
    }
}


class OutEditComponent extends React.Component {
    constructor(...args){
        super(...args);
    }
    render(){
        // return (<div>asdfasdfa</div>)
        if(this.props.proto.data){
            return React.createElement(Edittools[this.props.proto.data.type||'text_normal'], {...this.props.proto}, null);
        }else{
            return (<div></div>)
        }
        
    }
}

class Content extends React.Component {
    constructor(...args){
        super(...args)
        this.state = {
            data:Clone(this.props.data)||[],
            active_idx:this.props.active_idx||0
        }
        this.addTemplate = this.addTemplate.bind(this);

        // console.log(Template)
    }
    addTemplate(type){
        var dt = this.state.data;
        var data = Clone(Template[type+'_data']);
        data.id = Timeformat(new Date(),'ymdhis')+RandomString(4);
        dt.push(data);
        this.setState({data:dt})
    }
    componentDidMount(){
        var _this = this;
        setInterval(function(){
            localStorage.aritcle_data = JSON.stringify(_this.state.data);
            localStorage.active_idx = _this.state.active_idx;
        },3000)
    }
    changeactive(opts){
        this.setState({active_idx:opts.idx})
    }
    //传递上下文
    getChildContext() {
        return {
            toptarget: this
        };
    }
    render() {
        return (
            <div>
                <div className="pg-articlebox">
                    <div className="pg-article">
                        {this.state.data.map((item,index)=>
                            <Outcomponent proto={{type:item.type,data:item,idx:index,eventclick:this.changeactive.bind(this)}} key={index.toString()} />
                        )}
                    </div>
                </div>
                <div className="pg-formset noselect">
                    <OutEditComponent proto={{data:this.state.data[this.state.active_idx]}} />
                </div>
            </div>
        )
    }
}

Content.childContextTypes = {
    toptarget:PropTypes.object
}


export {Left,Content}

