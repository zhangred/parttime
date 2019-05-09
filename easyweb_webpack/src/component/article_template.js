import React from 'react'

class Textnormal extends React.Component {
    constructor(...args) {
        super(...args)
        console.log(44,this.props)
    }
    componentDidMount(){
    }
    //元素点击
    boxclick(){
        if(this.props.eventclick){
            this.props.eventclick('text_normal',this.props)
        }
    }
    render(){
        return (<div className="easy-content easy-text-title" onClick={this.boxclick.bind(this)}><div style={this.props.data.css}><div>{this.props.data.content}</div></div></div>)
    }
}



var template = {};
template.text_normal = Textnormal;
template.text_normal_data = {content:'常规文本', id:null,type:'text_normal',type_belong:'text',name:'文本模版',
        css:{fontSize:14,lineHeight:1.5,paddingLeft:14,paddingRight:14,paddingTop:14,paddingBottom:14},
        animate:{}
}

export default template