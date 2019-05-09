import React from 'react'


var Store = {}
Store.pgdata = JSON.parse(localStorage.aritcle_data);
Store.idx = parseInt(localStorage.active_idx);

setTimeout(function(){
    Store.pgdata[2].content = '555444444'
},3000)

export default Store;