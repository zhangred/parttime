<template>
    <div class="pages moreapply">
        <p class="til">下单时间：2019-12-12 9:34:34</p>
        <router-link to="/category/detail" class="good">
            <van-image fit="cover" class="gd-img" src="./tempimg/0detail_item01.jpg" />
            <p class="gd-til">麦兜包包女2018新款潮真皮女麦兜包包女2018新款潮真皮女包单肩斜挎包时尚锁扣牛包单肩斜挎包时尚锁扣牛</p>
            <p class="gd-sub">颜色：红色【少量现货】</p>
            <div class="gd-pri">
                <p>¥258.00</p>
                <p class="gd-num">x4</p>
            </div>
        </router-link>

        <div class="reason">
            <div class="rs-til flex flex-between">
                <p class="rs-ad">退款原因</p>
                <p :class="['rs-select arr-ra l0',{'dis':!data.reason||!data.reason.id}]" @click="pop_reason.show=true">{{(data.reason&&data.reason.id)?data.reason.name:'请选择'}}</p>
            </div>
            <div class="rs-msg">
                <textarea class="rs-ctrol" v-model="data.desc" placeholder="退款说明（选填）"></textarea>
                <p class="rs-last">{{data.desc.length}}/500</p>
            </div>
            <div class="rs-money flex flex-between">
                <p class="rs-ad">退款金额：<span class="c">¥167.00</span></p>
                <p class="rs-mnum">商品¥159.00  含邮费8.00</p>
            </div>
        </div>

        <div class="pic">
            <p class="ptil">上传凭证：</p>
            <div class="pimgs">
                <p class="pimg" v-for="(item,index) in data.imgs" :key="item">
                    <a href="javascript:;" class="pdel flex" @click="deleteimg(index)"><van-icon name="delete" /></a>
                    <van-image fit="cover" @click="seeImg(index)" class="pimg-i" :src="item" />
                </p>
                <a href="javascript:;" class="padd" v-show="data.imgs.length<3"><input type="file" multiple class="pfile" accept="image/*" @change="getImage" ref="head" />上传凭证<br />最多3张</a>
            </div>
        </div>

        <a href="javascript:;" class="btn" @click="save">提交</a>

        <van-action-sheet  v-model="pop_reason.show" :actions="pop_reason.list" :round="false" @select="rsselect" cancel-text="取消" />

        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less">
    .moreapply{
        padding: .1rem 0 .2rem;
        .til{ padding-left: .14rem; background: #fff; border-bottom: 1px solid #eee; line-height: .4rem; color: #999; font-size: .12rem;}
        .good{ display: block; min-height: 1rem; position: relative; padding: .1rem .14rem .1rem 1rem; background: #fff; font-size: .12rem; line-height: .18rem;}
        .gd-img{ position: absolute; left: .1rem; top: .1rem; width: .8rem; height: .8rem;}
        .gd-til{display: -webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden; padding-right: .7rem;}
        .gd-sub{ padding-top: .05rem; color: #999;}
        .gd-pri{ position: absolute; right: .14rem; top: .1rem; text-align: right; font-size: .15rem;}
        .gd-num{ font-size: .12rem; color: #666;}
        .reason{ background: #fff; margin-top: .1rem;}
        .rs-til,.rs-money,.ptil{ padding: 0 .14rem; line-height: .4rem;}
        .rs-select{ position: relative; padding-right: .1rem;}
        .rs-select.dis{ color: #999;}
        .rs-msg{ position: relative; padding: 0 .14rem .1rem; border-bottom: 1px solid #eee;}
        .rs-ctrol{ display: block; width: 100%; height: 1rem; padding: .1rem .1rem .2rem; border:none; background: #f2f2f2; font-size: .12rem; line-height: .18rem;}
        .rs-last{ position: absolute; right: .24rem; bottom: .1rem; font-size: .12rem; color: #888}
        .rs-mnum{ color: #999; font-size: .12rem;}
        .pic{ margin-top: .1rem;background: #fff;}
        .pimgs{ overflow: hidden; padding: 0 0 .01rem .14rem;}
        .pimg{ position: relative; float: left; margin: 0  .1rem .1rem 0; height: .96rem; width: .96rem;}
        .pdel{position: absolute; right: 0; top: 0; height: .24rem; width: .24rem; z-index: 2; background: rgba(0,0,0,.5); color: #fff; justify-content: center; align-items: center; }
        .pimg-i{ height: .96rem; width: .96rem;}
        .padd{ position: relative; display: block; float: left; height: .96rem; width: .96rem; margin-bottom: .1rem; padding-top: .48rem; border:.01rem dashed #ddd; background: url(~@/assets/images/photo.png) no-repeat center .16rem #f9f9f9; background-size: .34rem .28rem; font-size: .12rem; text-align: center; line-height: .18rem; color: #888;}
        .btn{ display: block; margin: .2rem .2rem 0; border-radius: .03rem; background: #ff7021; text-align: center; line-height: .4rem; color: #fff;}
        .pfile{ position: absolute; left: 0; top: 0; z-index: 2; height: 100%; width: 100%; opacity: 0;}
    }
</style>
<script>
import { Popup,ActionSheet,ImagePreview } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [ActionSheet.name]:ActionSheet,
        [ImagePreview.name]:ImagePreview
    },
    data(){
        return {
            pop_reason:{show:false,list:[
                {id:1, name: '不想买了' },
                {id:2, name: '下错订单了' },
                {id:3, name: '质量有问题' },
                {id:4, name: '发现家里有了，不想买了' },
                {id:5, name: '价格高了' },
                {id:6, name: '其他' },
            ]},
            popshow:false,
            data:{imgs:[],desc:''}
        }
    },
    created(){
        this.Ob.$emit('changetitle','申请退款');
    },
    methods:{
        //选择退款原因
        rsselect(item){
            this.data.reason = item;
            this.pop_reason.show = false;
        },
        //保存
        save(){
            if(!this.data.reason){
                this.$toast.fail('请选择退款原因');
                return;
            }

            this.$toast.loading({
                duration: 0,
                message: '提交中...',
                forbidClick: true,
                loadingType: 'spinner'
            });
            setTimeout(()=>{
                this.$toast.clear()
                this.$router.back();
            },1000)
            

        },
        getImage(){
            let inputDOM = this.$refs.head,
                len = inputDOM.files.length+this.data.imgs.length>3?3-this.data.imgs.length:inputDOM.files.length;
            
            for(var i=0;i<len;i++){
                this.data.imgs.push(this.getObjectURL(inputDOM.files[i]));
            }
        },
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },
        deleteimg(idx){
            this.data.imgs.splice(idx,1);
        },
        seeImg(idx){
            ImagePreview({
                images: this.data.imgs,
                startPosition: idx
            });
        }
    }
}
</script>
