import React from 'react'
import PropTypes from 'prop-types';
import {Togglebox,Textarea,Sliderbar,Textfont,Fontsize} from './_formtools'

class Textnormal extends React.Component {
    constructor(...args) {
        super(...args)
    }
    componentDidMount(){
        var _this = this;
    }
    //文本更新
    textareaChange(val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].content =val;
        this.context.toptarget.setState({data:state.data})
    }
    //字号大小
    fontsizeChange(val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css.fontSize = val.css.fontSize;
        state.data[state.active_idx].css.fontWeight = val.css.fontWeight||'';
        this.context.toptarget.setState({data:state.data})
    }
    //文本样式
    textfontChange(type,val){
        var state = this.context.toptarget.state,
            css =state.data[state.active_idx].css;

        css[type] = css[type]==val?'':val;
        this.context.toptarget.setState({data:state.data})
    }
    //杭高
    lineheightChange(val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css.lineHeight = val;
        this.context.toptarget.setState({data:state.data})
    }
    render(){
        return (
            <div>
                <Togglebox title="文本" show={true}>
                    <Textarea title="文本内容" data={this.props.data.content} bindevent={this.textareaChange.bind(this)} />
                    <Fontsize title="字号" value={this.props.data.css.fontSize} bindevent={this.fontsizeChange.bind(this)} />
                    <Textfont title="文本样式" css={this.props.data.css} bindevent={this.textfontChange.bind(this)} />
                    <Sliderbar title="行高" value={this.props.data.css.lineHeight} minvalue={1} maxvalue={3} bindevent={this.lineheightChange.bind(this)} />
                    {/* <div>xxxxxx</div> */}
                    {/* <div>xxxxxx</div> */}
                    {/* <div>xxxxxx</div> */}
                </Togglebox>
                <Togglebox title="文本b" show={true}>
                    <div>xxxxxx</div>
                    <div>xxxxxx</div>
                    <div>xxxxxx</div>
                    <div>xxxxxx</div>
                </Togglebox>
            </div>
        )
    }
}

Textnormal.contextTypes = {
    toptarget:PropTypes.object
}



var template = {};
template.text_normal = Textnormal;

export default template