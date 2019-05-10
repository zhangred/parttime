import React from 'react'
import {Clone, Timeformat} from './_public'

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    console.log(e.childNodes)
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

class Textnormal extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            css:{
                fontSize:this.props.data.css.fontSize
            }
        }
    }
    componentDidMount(){
        // console.log(this.props)
    }
    //元素点击
    boxclick(){
        if(this.props.eventclick){
            // console.log(this.props)
            this.props.eventclick({type:'text_normal',idx:this.props.idx})
        }
    }
    render(){
        var css = Clone(this.props.data.css)
        return (<div className="easy-content easy-text-title" onClick={this.boxclick.bind(this)}><div style={css}><div dangerouslySetInnerHTML = {{__html:this.props.data.content}}></div></div></div>)
    }
}



var Template = {};
Template.text_normal = Textnormal;
Template.text_normal_data = {content:'常规文本', id:null,type:'text_normal',type_belong:'text',name:'文本模版',
        css:{fontSize:14,lineHeight:1.5,paddingLeft:14,paddingRight:14,paddingTop:14,paddingBottom:14},
        animate:{}
}

export default Template