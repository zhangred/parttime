

// require('./src/lib/func');

// import Loading from './src/views/pages/loading';

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

// class App extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     render() {
//         return (
//             <HashRouter animate="scale">
//                 <div>
//                     <Route cache loading={Loading} path="/" loadComponent={Index} pagelevel={1} />
//                     <Route loading={Loading} pagelevel={1} path="/good_detail/:id" loadComponent={Gooddetail}/>
//                     <Route loading={Loading} pagelevel={99} path="/category/:id" loadComponent={CategoryList}/>
//                     <Route cache loading={Loading} pagelevel={3} path="/categoryall" loadComponent={Category}/>
//                     <Route cache loading={Loading} pagelevel={2} path="/recommend" loadComponent={Recommend}/>
//                     <Route cache loading={Loading} pagelevel={4} path="/cart" loadComponent={Cart} />
//                     <Route cache loading={Loading} pagelevel={5} path="/center" loadComponent={Center} data={{'name':'top-center'}} >
//                         <Route loading={Loading} pagelevel={3} path="/setting" loadComponent={Csetting}/>
//                         <Route loading={Loading} pagelevel={66} path="/ordercreate" loadComponent={Ordercreate}/>
//                         <Route loading={Loading} pagelevel={66} path="/orderresult" loadComponent={Orderresult}/>
//                         <Route cache loading={Loading} pagelevel={2} path="/orders" data={{'name':'orders'}} loadComponent={Orderlist}/>
//                         <Route loading={Loading} pagelevel={66} path="/orderdetail/:id" loadComponent={Orderdetail}/>
//                         <Route cache loading={Loading} pagelevel={1} data={{'name':'center'}} loadComponent={Cindex}/>
//                     </Route>
//                     {/* <Route path="/test" loadComponent={Test} /> */}
//                 </div>
//             </HashRouter>
//         )
//     }
// }

// ReactDOM.render(
//     <App/>,
//     document.getElementById('app')
// );

