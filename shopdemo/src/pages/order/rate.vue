<template>
    <div class="pages morate">
        <div class="bgcfff">
            <div class="title flex">
                <img src="~@/assets/images/rate.jpg" class="til-ico"/>
                <span class="til-ao">描述相符</span>
                <van-rate v-model="describe" class="star" size=".22rem" gutter=".1rem" color="#ff7021"/>
                <span class="sval">{{values[describe]}}</span>
            </div>
            <textarea class="textarea" v-model="message" placeholder="宝贝满足你的期待吗？说出你的想法"></textarea>
            <div class="pimgs">
                <p class="pimg" v-for="(item,index) in imgs" :key="item">
                    <a href="javascript:;" class="pdel flex" @click="deleteimg(index)"><van-icon name="delete" /></a>
                    <van-image fit="cover" @click="seeImg(index)" class="pimg-i" :src="item" />
                </p>
                <a href="javascript:;" class="padd"><input type="file" multiple class="pfile" accept="image/*" @change="getImage" ref="head" />添加图片</a>
            </div>
            <div class="anon flex flex-between">
                <van-checkbox v-model="anonymous" checked-color="#ff7021">匿名</van-checkbox>
                <p class="atp">您的评价将以匿名的形式展现</p>
            </div>
        </div>
        <div class="shop">
            <div class="title flex">
                <img src="~@/assets/images/rate.jpg" class="til-ico"/>
                <span class="til-ao">店铺评分</span>
            </div>
            <div class="srate">
                <div class="sline flex">
                    <span class="svao">物流服务</span>
                    <van-rate v-model="logs" class="star" size=".22rem" gutter=".15rem" color="#ff7021"/>
                    <span class="sval">{{values[logs]}}</span>
                </div>
                <div class="sline flex">
                    <span class="svao">商家态度</span>
                    <van-rate v-model="service" class="star" size=".22rem" gutter=".15rem" color="#ff7021"/>
                    <span class="sval">{{values[service]}}</span>
                </div>
            </div>
        </div>

        <van-button color="#ff7021" class="blbtn" @click="save">发布</van-button>
    </div>
</template>
<style lang="less">
    .morate{
        padding: .1rem 0 .2rem;
        .title{ padding: 0 .14rem; border-bottom: 1px solid #eee; line-height: .48rem; align-items: center;}
        .til-ico{ height: .33rem;}
        .star{ margin: 0 .1rem;}
        .sval{ color: #999;}
        .til-ao{ margin-left: .1rem;}
        .textarea{ display: block; height: .6rem; width: 100%; padding: .1rem .14rem 0; border:none;}
        .pic{ margin-top: .1rem;background: #fff;}
        .pimgs{ overflow: hidden; padding: .1rem 0 .01rem .14rem;}
        .pimg{ position: relative; float: left; margin: 0  .1rem .1rem 0; height: .96rem; width: .96rem;}
        .pdel{position: absolute; right: 0; top: 0; height: .24rem; width: .24rem; z-index: 2; background: rgba(0,0,0,.5); color: #fff; justify-content: center; align-items: center; }
        .pimg-i{ height: .96rem; width: .96rem;}
        .padd{ position: relative; display: block; float: left; height: .96rem; width: .96rem; margin-bottom: .1rem; padding-top: .58rem; border:.01rem dashed #ddd; background: url(~@/assets/images/photo.png) no-repeat center .26rem #f9f9f9; background-size: .34rem .28rem; font-size: .12rem; text-align: center; line-height: .18rem; color: #888;}
        .pfile{ position: absolute; left: 0; top: 0; z-index: 2; height: 100%; width: 100%; opacity: 0;}
        .anon{ padding: 0 .14rem; border-top: 1px solid #eee; line-height: .48rem;}
        .atp{ color: #999;}
        .shop{ margin-top: .1rem; background: #fff;}
        .srate{ padding: .1rem .14rem .3rem;}
        .sline{ padding: .06rem 0;}
        .svao{ margin-right: .1rem;}
        .blbtn{ display: block; width: 3.47rem; margin: .2rem auto 0; font-size: .14rem; }
    }
</style>
<script>
import { Rate,Checkbox,ImagePreview } from 'vant';
export default {
    components:{
        [Rate.name]:Rate,
        [Checkbox.name]:Checkbox,
        [ImagePreview.name]:ImagePreview
    },
    data(){
        return {
            values:{'1':'非常差','2':'差','3':'一般','4':'好','5':'非常好'},
            popshow:false,
            describe:0,
            logs:0,
            service:0,
            message:'',
            anonymous:false,
            imgs:[],
        }
    },
    created(){
        this.Ob.$emit('changetitle','发表评价');
    },
    methods:{
        //选取图片处理
        getImage(){
            let inputDOM = this.$refs.head,
                len = inputDOM.files.length+this.imgs.length>3?3-this.imgs.length:inputDOM.files.length;
            
            for(var i=0;i<len;i++){
                this.imgs.push(this.getObjectURL(inputDOM.files[i]));
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
            this.imgs.splice(idx,1);
        },
        seeImg(idx){
            ImagePreview({
                images: this.imgs,
                startPosition: idx
            });
        },
        //发布评论
        save(){
            if(!this.describe){
                this.$toast.fail('请对描述相符打分');
                return;
            }
            if(!this.logs){
                this.$toast.fail('请对物流服务打分');
                return;
            }
            if(!this.service){
                this.$toast.fail('请对商家态度打分');
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
        }
    }
}
</script>
