import React from 'react'
import PropTypes from 'prop-types';
import {Togglebox,Textarea,Sliderbar,Textfont,Fontsize,Colorpicker,Paddingbox,Marginbox,Borderstyle} from './_formtools'

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
    //单个css更新
    onecssChange(type,val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css[type] = val;
        this.context.toptarget.setState({data:state.data})
    }
    paddingchange(padding){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css.paddingTop = padding[0]||0;
        state.data[state.active_idx].css.paddingRight = padding[1]||0;
        state.data[state.active_idx].css.paddingBottom = padding[2]||0;
        state.data[state.active_idx].css.paddingLeft = padding[3]||0;
        this.context.toptarget.setState({data:state.data}) 
    }
    marginchange(margin){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css.marginTop = margin[0]||0;
        state.data[state.active_idx].css.marginRight = margin[1]||0;
        state.data[state.active_idx].css.marginBottom = margin[2]||0;
        state.data[state.active_idx].css.marginLeft = margin[3]||0;
        this.context.toptarget.setState({data:state.data}) 
    }
    borderstyleChange(val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].css.borderStyle = val.value;
        this.context.toptarget.setState({data:state.data})
    }
    render(){
        return (
            <div>
                <Togglebox title="文本" show={true}>
                    <Textarea title="文本内容" data={this.props.data.content} bindevent={this.textareaChange.bind(this)} />
                    <Fontsize title="字号" value={this.props.data.css.fontSize} bindevent={this.fontsizeChange.bind(this)} />
                    <Textfont title="文本样式" css={this.props.data.css} bindevent={this.textfontChange.bind(this)} />
                    <Sliderbar title="行高" value={this.props.data.css.lineHeight} minvalue={1} maxvalue={3} bindevent={this.onecssChange.bind(this,'lineHeight')} />
                    <Colorpicker title="文本颜色" value={this.props.data.css.color||'#333'} bindevent={this.onecssChange.bind(this,'color')} />
                    <Colorpicker title="背景颜色" value={this.props.data.css.backgroundColor||'#fff'} bindevent={this.onecssChange.bind(this,'backgroundColor')} />
                    <Sliderbar title="缩进" value={this.props.data.css.textIndent} minvalue={0} maxvalue={100} bindevent={this.onecssChange.bind(this,'textIndent')} />
                </Togglebox>
                <Togglebox title="边距" show={false}>
                    <Paddingbox title="内边距" value={{left:this.props.data.css.paddingLeft,top:this.props.data.css.paddingTop,right:this.props.data.css.paddingRight,bottom:this.props.data.css.paddingBottom,}} bindevent={this.paddingchange.bind(this)} />
                    <Marginbox title="外边距" value={{left:this.props.data.css.marginLeft,top:this.props.data.css.marginTop,right:this.props.data.css.marginRight,bottom:this.props.data.css.marginBottom,}} bindevent={this.marginchange.bind(this)} />
                </Togglebox>
                <Togglebox title="边框" show={false}>
                    <Borderstyle title="样式"  value={this.props.data.css.borderStyle||'none'} bindevent={this.borderstyleChange.bind(this)} />
                    <Sliderbar title="宽度" value={this.props.data.css.borderWidth} minvalue={1} maxvalue={20} bindevent={this.onecssChange.bind(this,'borderWidth')} />
                    <Colorpicker title="颜色" value={this.props.data.css.borderColor||'#fff'} bindevent={this.onecssChange.bind(this,'borderColor')} />
                    <Sliderbar title="圆角" value={this.props.data.css.borderRadius} minvalue={1} maxvalue={200} bindevent={this.onecssChange.bind(this,'borderRadius')} />
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