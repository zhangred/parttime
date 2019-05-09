import React from 'react'
import {Togglebox,Textarea} from './_formtools'

class Textnormal extends React.Component {
    constructor(...args) {
        super(...args)
        console.log(this.props)
        // this.state = {
        //     data:this.props.data
        // }
    }
    componentDidMount(){
        // console.log(this.props)
        var _this = this;
    }
    render(){
        return (
            <div>
                <Togglebox title="文本" show={true}>
                    <Textarea data={this.props.data.content} />
                    <div>{this.props.data.content}</div>
                    <div>xxxxxx</div>
                    <div>xxxxxx</div>
                    <div>xxxxxx</div>
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



var template = {};
template.text_normal = Textnormal;

export default template