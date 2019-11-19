<template>
    <div class="pages">
        <div class="lines"><textarea class="textarea" v-model="desc" placeholder="请描述你的问题"></textarea></div>
        <p class="numbc">{{desc.length}}/240</p>
        <p class="til">请提供相关问题的照片或截图{{fileList.length}}/4(最多上传4张)</p>
        <div class="imgs">
            <van-uploader
            v-model="fileList"
            multiple
            :max-count="4"
            :after-read="afterRead"
            />
        </div>
        <p class="tila">微信号<span class="trd">*</span></p>
        <div class="lines"><input type="text" class="ctrol" v-model="wx" placeholder="请填写正确的微信号，以便联系" /></div>
        <p class="btn" @click="save">立即提交</p>
    </div>
</template>
<style lang="less"  scoped>
    .lines{ background: #fff;}
    .textarea{ display: block; width: 100%; height: 2rem; border: none; padding: .14rem;}
    .numbc{ padding-right: .15rem; line-height: .3rem; background: #fff; color: #999; text-align: right;}
    .til{ background: #fff; border-top: 1px solid #eee; line-height: .44rem; padding-left: .14rem;}
    .imgs{ background: #fff; padding: 0 .14rem .05rem;}
    .tila{ padding-left: .14rem; line-height: .4rem;}
    .trd{ color: red;}
    .btn{ width: 3.55rem; margin: .3rem auto 0; line-height: .44rem; background: #ff7021; border-radius: .06rem; font-size: .18rem; text-align: center; color: #fff;}
    .ctrol{ display: block; height: .44rem; width: 100%; padding-left: .14rem; border: none; }
</style>
<script>
import { Uploader } from 'vant';
export default {
    components:{
        [Uploader.name]:Uploader
    },
    data(){
        return {
            desc:'',
            fileList:[],
            wx:'',
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','问题反馈');
    },
    methods:{
        afterRead(res){
            console.log(res)
        },
        save(){
            if(this.locked) return;
            if(!this.desc.trim()){
                this.$toast.fail('请填写描述')
                return;
            }
            if(!this.wx.trim()){
                this.$toast.fail('请填写微信')
                return;
            }
            this.locked = true;
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                   this.$toast.success('提交成功');
                }
                this.locked = false;
            }).catch(()=>{
                this.locked = false;
            });
        }
    }
}
</script>
