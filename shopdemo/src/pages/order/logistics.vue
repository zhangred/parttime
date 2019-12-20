<template>
    <div class="pages mologist">
        <div class="good">
            <van-image fit="cover" class="gi-img" src="./tempimg/0detail_item01.jpg" />
            <p class="gi-til c gb-c">已签收</p>
            <p class="gi-num">邮政快递包裹：9876443467899876</p>
            <p class="gi-sub">官方电话：88888888</p>
        </div>

        <div class="logs">
            <p class="ltil">
                <van-icon name="location-o" class="lico c gb-c" />
                【收货地址】湖南省 长沙市 岳麓区 随便神马街道没名字小区 A区1栋808
            </p>
            <div class="litem gb-after-bgc">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico active gb-bgc"><van-icon name="arrow-up" /></p>
                <div class="li-desc">
                    <p class="li-til">已签收</p>
                    <p class="li-text01">已签收，本人签收，投递员：熊本熊&ensp;13838383838</p>
                </div>
            </div>
            <div class="litem gb-after-bgc">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico active gb-bgc"><van-icon name="arrow-up" /></p>
                <div class="li-desc">
                    <p class="li-til">派送中</p>
                    <p class="li-text01">【中国邮政集团公司XX分公司XX分拣部】正在投递，投递员：熊本熊&ensp;13838383838</p>
                </div>
            </div>
            <div class="litem">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico"><van-icon name="arrow-up" /></p>
                <div class="li-desc">
                    <p class="li-til">运输中</p>
                    <p class="li-text01">【中国邮政集团公司湖南省XX市分公司XX分拣部】接收</p>
                </div>
            </div>

            <div class="litem sub">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico"></p>
                <p class="li-text02">到达【中国邮政集团公司湖南省XX市分公司XX分拣部】</p>
            </div>
            <div class="litem sub">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico"></p>
                <p class="li-text02">离开【长沙】，下一站【XX站点】</p>
            </div>
            <div class="litem sub">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico"></p>
                <p class="li-text02">已取件</p>
            </div>
            <div class="litem sub">
                <p class="li-time"><span class="li-tday">01-20</span><br />17:56</p>
                <p class="li-ico"></p>
                 <p class="li-text02">已出库</p>
            </div>     
        </div>
    </div>
</template>
<style lang="less">
    .mologist{
        padding: .1rem 0 .2rem; color: #444;
        .good{ position: relative; height: .9rem; background: #fff; padding: .1rem .14rem .06rem 1.06rem;}
        .gi-img{ position: absolute; left: .14rem; top: .06rem; height: .78rem; width: .78rem;}
        .gi-til{ font-size: .16rem;}
        .gi-num{ padding-top: .05rem; font-size: .12rem; line-height: .18rem;}
        .gi-sub{ font-size: .12rem; color: #999;}
        .logs{ margin-top: .1rem; padding: 0 .14rem .2rem 0; background: #fff; font-size: .12rem; line-height: .2rem;}
        .ltil{ position: relative; padding: .2rem 0 0 1.08rem;}
        .lico{ position: absolute; left: .84rem; top: .2rem; transform: translateX(-50%); font-size: .2rem;}
        .litem{ position: relative; overflow: hidden; padding-bottom: .2rem;}
        .litem:after{ content: ""; display: block; position: absolute; left: .84rem; top: 0; width: 1px; background: #ccc; height: 100%;}
        .li-time{ float: left; width: .6rem; text-align: right; font-size: .1rem; line-height: .18rem;}
        .li-tday{ font-size: .15rem;}
        .li-ico{ position: absolute; left: .84rem; top: 0; z-index: 2; margin-left: -.1rem; display: flex; display: -webkit-flex; align-items: center; justify-content: center; height: .21rem; width: .21rem; line-height: .21rem; color: #fff; background: #ccc; border-radius: 50%;}
        .li-ico.active{ background: @base}
        .li-desc{ width: 2.5rem; float: right;}
        .li-til{ font-size: .15rem;}
        .li-text01{ font-size: .12rem;}
        .sub .li-ico{ height: .09rem; width: .09rem; margin-left: -.04rem; top: .05rem}
        .sub .li-tday{ font-size: .1rem;}
        .sub .li-text02{width: 2.5rem; float: right;}
        .sub .li-time{ line-height: .16rem;}
    }
</style>
<script>
export default {
    data(){
        return {
        }
    },
    created(){
        this.Ob.$emit('changetitle','物流详情');
    },
    methods:{
    }
}
</script>
