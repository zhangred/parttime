Vue.component('texttitle', { 
    data:function(){
        return {
            copy_css:{}
        }
    },
    props:{
        data:{
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: function () {
                return { message: 'hello' }
            }
        }
    },
    template: '<div class="easy-content easy-text-title" :style="[data.copy_css]"><div><div>{{data.content||"xx"}}</div></div></div>',
    created:function(){
        console.log(this)
    }
})

Vue.component('component-boxer', { 
    props:['easyData','easyName'],
    data:function(){
        return {
            content:''
        }
    },
    created:function(){
        console.log(this.easyData,this.easyName)
        this.copy_css = {
            fontSize:this.data.css.fontSize + 'px'
        }
    },
    render: function(h){
        return h(this.easyName.replace('_',''), {props:{data:this.easyData}})
    }

})

