require('../lib/func');

import React from 'react';
import ReactDOM from 'react-dom';

// import Topline from '../component/topline'
// import {Left,Content} from '../component/article'

// function Addtemplate(opts){
//     // console.log(456465,content,type,data)
//     content.addTemplate(opts.type)
// }

// ReactDOM.render(
//     <Topline/>,
//     document.getElementById('J_topline')
// );

// ReactDOM.render(
//     <Left addclick={Addtemplate} />,
//     document.getElementById('J_pgleft')
// )

// var pgdata = JSON.parse(localStorage.aritcle_data||'[]');
// var idx = parseInt(localStorage.active_idx||'0');

// let content = ReactDOM.render(
//     <Content data={pgdata} active_idx={idx} />,
//     document.getElementById('J_pgcontent')
// )

var st = {fontSize:12}

class Fonttest extends React.Component {
    constructor(...args) {
        super(...args)
        console.log(6,this.props.data)
    }
    render(){
        return (
            <div>
                {/* <p >{this.props.data.css.fontSize}</p>34545 */}
            </div>
        )
    }
}

class Topline extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            data:{}
        }
    }
    componentDidMount(){
        var data = [
            {id:2,css:{fontSize:20}},
            {id:3,css:{}},
        ]
        
        this.setState({data:data[0]})
        var _this = this;
        setTimeout(function(){
            // var dt = _this.state.data;
            // dt = {id:2,css:{fontSize:30}}
            // _this.setState({data:dt})
            st.fontSize = 20
        },200)
    }
    render() {
        return (
            <div>
                <p className="">EASY</p>
                <p className="" style={st}>长文本模版</p>
                {/* <Fonttest data={this.state.data} /> */}
            </div>
        )
    }
}

ReactDOM.render(
    <Topline />,
    document.getElementById('J_topline')
);