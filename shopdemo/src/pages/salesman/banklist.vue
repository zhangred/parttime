<template>
    <div class="pages psaleblist">
        <div class="list">
            <div class="item" v-for="item in list" v-bind:key="item.id" :style="'background:'+item.background">
                <p class="iname">{{item.name}}</p>
                <p class="itype">储值卡</p>
                <p class="inum flex"><span class="isp flex">****</span><span class="isp flex">****</span><span class="isp flex">****</span><span class="">3433</span></p>
            </div>
            <router-link to="/salesman/bankedit" class="btn flex">
                <van-icon name="add-o" class="ico" />
                添加银行卡
            </router-link>
        </div>
    </div>
</template>
<style lang="less">
    .psaleblist{
       padding: .1rem .14rem;
        .item{ margin-bottom: .1rem; padding: .1rem 0 .15rem .3rem; color: #fff; border-radius: .08rem; box-shadow: 0 0 .02rem rgba(0,0,0,.1)}
        .iname{ font-size: .16rem;}
        .itype{ font-size: .12rem; line-height: .16rem;}
        .inum{ font-size: .3rem; line-height: .4rem; align-items: center;}
        .isp{  margin-right: .1rem; position: relative; top: .06rem;}
        .btn{ height: 1rem; background: #fff; justify-content: center; align-items: center; font-size: .18rem;box-shadow: 0 0 .02rem rgba(0,0,0,.1)}
        .ico{ margin-right: .1rem;}
    }
</style>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','我的银行卡');
        this.getlist(true)
    },
    methods:{
        //提现列表
        getlist(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                //延时处理 模拟请求延时
                this.$tools.delay(500).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        let list = [
                            {id:Math.random()*1000,background:'#c90300',name:'中国招商银行'},
                            {id:Math.random()*1000,background:'#009888',name:'中国农业银行'},
                            {id:Math.random()*1000,background:'#f05821',name:'平安银行'},
                            {id:Math.random()*1000,background:'#063f97',name:'中国建设银行'},
                        ]

                        this.list = list;
                    }
                })
                
            });
        },
    }
}
</script>
