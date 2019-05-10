require('../lib/func');

import React from 'react';
import ReactDOM from 'react-dom';

import Topline from '../component/topline'
import {Left,Content} from '../component/article'

function Addtemplate(opts){
    // console.log(456465,content,type,data)
    content.addTemplate(opts.type)
}

ReactDOM.render(
    <Topline/>,
    document.getElementById('J_topline')
);

ReactDOM.render(
    <Left addclick={Addtemplate} />,
    document.getElementById('J_pgleft')
)

var pgdata = JSON.parse(localStorage.aritcle_data||'[]');
var idx = parseInt(localStorage.active_idx||'0');

let content = ReactDOM.render(
    <Content data={pgdata} active_idx={idx} />,
    document.getElementById('J_pgcontent')
)


