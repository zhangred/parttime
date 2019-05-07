// var text_css = {

// }

// Vue.component('texttitle', { 
//     data:function(){
//         return {
//             copy_css:{}
//         }
//     },
//     props:{
//         data:{
//             type: Object,
//             // 对象或数组默认值必须从一个工厂函数获取
//             default: function () {
//                 return {
//                     id:null,
//                     type:'text_title',
//                     type_belong:'text',
//                     name:'文本模版',
//                     css:{fontSize:14,lineHeight:1.5,paddingLeft:14},
//                     animate:{},
//                     content:"常规文本"
//                 }
//             }
//         },
//         bindclick:{
//             type: Function,
//             default:function(){
                
//             }
//         }
//     },
//     template: '<div class="easy-content easy-text-title" @click="outclick" :style="[copy_css]"><div><div>{{data.content}}</div></div></div>',
//     created:function(){
//         var css = this.data.css;
//         this.copy_css = {
//             fontSize:css.fontSize + 'px',
//             lineHeight:css.lineHeight
//         }
//     },
//     methods:{
//         outclick:function(){
//             this.bindclick('text_title');
//         }
//     }
// })

// Vue.component('component-boxer', { 
//     props:['easyData','easyName','easyClick'],
//     data:function(){
//         return {
//         }
//     },
//     created:function(){

//     },
//     render: function(h){
//         return h(this.easyName.replace('_',''), {props:{data:this.easyData,bindclick:this.easyClick}})
//     }

// })


class Webtest extends React.Component{
    constructor(){
        super();

        this.state = {
        name: "菜鸟教程",
        site: "https://www.runoob.com"
        }
    }
    render() {
        return (
        <div>
            {this.state.name}
        </div>
        );
    }
}

