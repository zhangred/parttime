require('../lib/func');

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// const Index = (cb)=> {import('./src/views/pages/index'). then(({default:fnName}) =>{cb(fnName)});}
// const Gooddetail = (cb)=> {import('./src/views/pages/good_detail'). then(({default:fnName}) =>{cb(fnName)});}
// const CategoryList = (cb)=> {import('./src/views/category/category'). then(({default:fnName}) =>{cb(fnName)});}
// const Category = (cb)=> {import('./src/views/category/index'). then(({default:fnName}) =>{cb(fnName)});}
// const Ordercreate = (cb)=> {import('./src/views/orders/create'). then(({default:fnName}) =>{cb(fnName)});}
// const Orderresult = (cb)=> {import('./src/views/orders/result'). then(({default:fnName}) =>{cb(fnName)});}
// const Orderlist = (cb)=> {import('./src/views/orders/list'). then(({default:fnName}) =>{cb(fnName)});}
// const Orderdetail = (cb)=> {import('./src/views/orders/detail'). then(({default:fnName}) =>{cb(fnName)});}
// const Recommend = (cb)=> {import('./src/views/recommend/index'). then(({default:fnName}) =>{cb(fnName)});}
// const Cart = (cb)=> {import('./src/views/cart/index'). then(({default:fnName}) =>{cb(fnName)});}
// const Center = (cb)=> {import('./src/views/center/main'). then(({default:fnName}) =>{cb(fnName)});}
// const Cindex = (cb)=> {import('./src/views/center/index'). then(({default:fnName}) =>{cb(fnName)});}
// const Csetting = (cb)=> {import('./src/views/center/setting'). then(({default:fnName}) =>{cb(fnName)});}
// const Test = (cb)=> {import('./src/views/test/test'). then(({default:fnName}) =>{cb(fnName)});}

// const loginFilter = (cb, props)=> {
//     console.log('loginFilter',props)
//     setTimeout(function(){
//         cb();
//     }, 200);
// }

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'zhang'
        }
    }
    render() {
        return (
            <div>{this.state.name}</div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
var m = ReactDOM.render(
    <App/>,
    document.getElementById('appa')
);

console.log(m)


