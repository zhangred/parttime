import React from 'react';
import PropTypes from 'prop-types';
import { Chrome } from 'react-color';

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
            <div className="form-eline">
                <p className="el-lado">文本内容</p>
                <p className="el-textareaer"><textarea className="el-textarea" onChange={this.textchangexx} value={this.props.data}></textarea></p>
            </div>
        )
    }
}
Textarea.contextTypes = {
    toptarget:PropTypes.object
}

// 滑动条



export {Togglebox,Textarea}
