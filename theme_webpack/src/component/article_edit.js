import React from 'react'
import PropTypes from 'prop-types';
import {Togglebox,Textarea,Sliderbar,Textfont,Fontsize} from './_formtools'

class Textnormal extends React.Component {
    constructor(...args) {
        super(...args)
    }
    componentDidMount(){
        // console.log(this.props)
        var _this = this;
    }
    //文本更新
    textareaChange(val){
        var state = this.context.toptarget.state;
        state.data[state.active_idx].content =val;
        this.context.toptarget.setState({data:state.data})
    }
    render(){
        return (
            <div>
                <Togglebox title="文本" show={true}>
                    <Textarea title="文本内容" data={this.props.data.content} bindevent={this.textareaChange.bind(this)} />
                    <Fontsize title="字号" value={this.props.data.css.fontSize} />
                    {/* <Sliderbar title="行高" value={this.props.data.css.lineHeight} minvalue={1} maxvalue={3} attra="css" attrb="lineHeight" /> */}
                    {/* <Textfont title="文本样式" css={this.props.data.css} /> */}
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