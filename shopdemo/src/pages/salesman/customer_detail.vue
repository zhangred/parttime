<template>
    <div class="pages salecdetail">
        <div class="topbox">
            <img :src="head" class="tb-head" />
            <div class="tb-name flex"><span>Mary-Dream</span><p class="tb-tp gb-c-bdc">微信号</p></div>
            <p class="tb-sub">绑定时间：2019.08.27 12:30:08</p>
        </div>

        <div class="editlinebox">
            <div class="editline editline-cover">
                <p class="el-ado">订单数量</p>
                <div class="el-text">89</div>
            </div>
            <div class="editline">
                <p class="el-ado">成交金额</p>
                <div class="el-text">56.88元</div>
            </div>
            <div class="editline editline-cover">
                <p class="el-ado">最近下单时间</p>
                <div class="el-text">无</div>
            </div>
        </div>

        <div class="editlinebox">
            <div class="editline editline-cover">
                <p class="el-ado">客户关系更新时间</p>
                <div class="el-text">019.02.15 09:30:08</div>
            </div>
            <div class="editline">
                <p class="el-ado">保护期剩余</p>
                <div class="el-text">永久</div>
            </div>
            <div class="editline editline-cover">
                <p class="el-ado">有效期剩余</p>
                <div class="el-text">关系长久有效</div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .salecdetail{
        padding: .1rem 0 .2rem;
        .topbox{ position: relative; height:.8rem; padding: .2rem 0 0 .9rem; background: #fff;}
        .tb-head{ position: absolute; left: .14rem; top: 50%; margin-top: -.3rem; width: .6rem; height: .6rem; border-radius: 50%; border:1px solid #eee;}
        .tb-name{ font-size: .18rem; align-items:center;}
        .tb-tp{ margin-left: .1rem; padding: 0 .05rem; border: 1px solid @base; color: @base; border-radius: .1rem; line-height: .16rem; font-size: .1rem;}
        .tb-sub{ padding-top: .06rem; color: #999; font-size:.12rem; }
        .editlinebox .el-ado{ color:#999;}
    }
</style>
<script>
import { Popup } from 'vant';
export default {
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            popshow:false,
            head:'./tempimg/head01.jpg'
        }
    },
    created(){
        this.Ob.$emit('changetitle','客户详情');
    },
    methods:{
    }
}
</script>
