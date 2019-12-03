<template>
    <div class="pages moredetail">
        <div class="topinfo">
            <p class="ti-line">订单编号：<span class="ti-num">334839483849</span></p>
            <p class="ti-line">
                取消/退款进度：
                <span class="c" v-if="state==1">退款处理中</span>
                <span class="c" v-if="state==2">已完成</span>
                <span class="c" v-if="state==3">已取消</span>
            </p>
            <p class="ti-hr"></p>
            <p class="ti-line">退款明细</p>
            <p class="ti-line">微信支付：￥68.00（1-3个工作日到账)</p>
            <p class="ti-tp">
                <van-icon name="info-o" class="ti-io" />
                退款将返退还您实际支付的金额，优惠券支付不退回，微信支付资产将原路返回，时效可在“客服服务”查询。
            </p>
        </div>
        <div class="goodinfo">
            <p class="gi-til">退款信息</p>
            <router-link to="/category/detail" class="good">
                <van-image fit="cover" class="gd-img" src="./tempimg/0detail_item01.jpg" />
                <p class="gd-til">麦兜包包女2018新款潮真皮女麦兜包包女2018新款潮真皮女包单肩斜挎包时尚锁扣牛包单肩斜挎包时尚锁扣牛</p>
                <p class="gd-sub">颜色：红色【少量现货】</p>
            </router-link>
            <div class="gi-lines">
                <p class="gi-line">退款方式：仅退款</p>
                <p class="gi-line">退款原因：其他</p>
                <p class="gi-line">退款金额：<span class="gi-price c">￥258.00</span>（含运费￥0.00）</p>
                <p class="gi-line">退款编号：201908190236780002</p>
                <p class="gi-line">申请时间：2019-08-19 10:36</p>
            </div>
        </div>

        <div class="linebtns">
            <a href="" class="linebtn flex flex-center"><van-icon name="chat-o" class="lb-ico c" />在修客服</a>
            <a href="tel:10086" class="linebtn flex flex-center"><van-icon name="phone-o" class="lb-ico c" />联系商家</a>
        </div>

        <div class="botline flex" v-if="state==1">
            <a href="javascript:;" @click="quxiao" class="cm-btn rd small">取消申请</a>
        </div>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">退款中</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">退款成功</p>
                <p :class="['otitem',{'otitem-ac':state==3}]" @click="state=3">已取消</p>
            </div>
        </over-touch>

    </div>
</template>
<style lang="less">
    .moredetail{
        padding: 0 0 .5rem 0; 
        .topinfo{ padding: .15rem 0; background: #fff; color: #666;}
        .ti-line{ padding-left: .14rem;}
        .ti-num{ color: #111;}
        .ti-hr{ border-top: 1px solid #eee; margin: .1rem 0;}
        .ti-tp{ position: relative; padding: .05rem .1rem 0 .3rem; font-size: .12rem; line-height: .16rem; color: #999;}
        .ti-io{ position: absolute; left: .14rem; top: .07rem}
        .goodinfo{ margin-top: .1rem; background: #fff;}
        .gi-til{ padding-left: .14rem; line-height: .4rem;}
        .good{ display: block; min-height: 1rem; position: relative; padding: .1rem .14rem .1rem 1rem; background: #f8f8f8; font-size: .12rem; line-height: .18rem;}
        .gd-img{ position: absolute; left: .1rem; top: .1rem; width: .8rem; height: .8rem;}
        .gd-til{display: -webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden; padding-right: .7rem;}
        .gd-sub{ padding-top: .05rem; color: #999;}
        .gi-lines{ padding: .1rem 0 .15rem .14rem; color: #666;}
        .linebtns{ position: relative; overflow: hidden; margin-top: .1rem; background: #fff; line-height: .44rem; text-align: center;}
        .linebtns:after{ content: ""; display: block; position: absolute; left: 50%; height: 60%; top: 20%; border-left: 1px solid #ddd;}
        .linebtn{ float: left; width: 50%;}
        .lb-ico{ font-size: .16rem; margin-right: .05rem;}
        .botline{ position: fixed; left: 0; bottom: 0; right: 0; z-index: 2; justify-content: flex-end; padding: .07rem .14rem; background: #fff; border-top: 1px solid #eee;}
    }
</style>
<script>
export default {
    data(){
        return {
            state:1
        }
    },
    created(){
        this.Ob.$emit('changetitle','取消/退款进度');
    },
    methods:{
        quxiao(){
            this.$dialog.confirm({
                title: '提示',
                message: '确认取消该退款？',
                beforeClose:(action, done)=>{
                    setTimeout(()=>{
                        done()
                        this.$toast.success('取消成功');
                        this.state = 3;
                    },500)
                }
            });
        }
    }
}
</script>
