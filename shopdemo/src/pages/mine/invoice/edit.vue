<template>
    <div class="invoiceedit">
        <div class="editlinebox editlinebox-nmt editlinebox-alil">
            <div class="editline">
                <p class="el-ado el-ado-m">发票类型</p>
                <div class="el-input">
                    <van-radio-group v-model="data.type" class="ovh radios">
                        <van-radio class="radio" name="personal" :checked-color="gobal.color">个人</van-radio>
                        <van-radio class="radio" name="company" :checked-color="gobal.color">企业</van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="editline">
                <p class="el-ado">发票抬头</p>
                <div class="el-input"><input type="text" class="el-ctrol" v-model="data.name" placeholder="请填写" /></div>
            </div>
            <div class="editline" v-show="data.type=='company'">
                <p class="el-ado">企业税号</p>
                <div class="el-input"><input type="text" class="el-ctrol" v-model="data.number" placeholder="请填写" /></div>
            </div>
            <div class="editline">
                <p class="el-ado el-ado-m">发票内容</p>
                <div class="el-btns">
                    <van-button class="tbtn" round plain :color="(data.detail=='detail'?'@base':'#aaa')" @click="data.detail='detail'" size="small">商品明细</van-button>
                    <van-button class="tbtn" round plain :color="(data.detail=='kind'?'@base':'#aaa')" @click="data.detail='kind'" size="small">商品类别</van-button>
                </div>
            </div>
            <p class="btp"><span v-show="data.detail=='detail'">发票内容将显示详细的商品名称</span><span v-show="data.detail=='kind'">发票内容仅显示商品类别</span></p>
            <div class="editline">
                <p class="el-ado">发票邮箱</p>
                <div class="el-input"><input type="text" class="el-ctrol" v-model="data.email" placeholder="用于向你发送电子发票" /></div>
            </div>
        </div>

        <div class="botbtn"><van-button :color="gobal.color" class="save" @click="save">保存</van-button></div>

       
    </div>
</template>
<style lang="less">
    .invoiceedit{
        .editlinebox .editline{ padding-left: 1rem;}
        .radios{ padding: .15rem 0;}
        .radio{ float: left; margin-right: .3rem;}
        .el-btns{ padding: .1rem 0;}
        .tbtn{ margin-right: .14rem;}
        .btp{ font-size: .12rem; padding: 0 .14rem; background: #f6f6f6; color: #999; line-height: .32rem;}
        .save{ display: block; width: 100%; font-size: .16rem;}
        .botbtn{ padding: .3rem .14rem;}
    }
    
</style>
<script>
import { RadioGroup, Radio,Button } from 'vant';
export default {
    components:{
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
        [Button.name]:Button
    },
    data(){
        return {
            gobal:this.themes.setting,
            data:{
                type:'personal',
                name:'',
                number:'',
                detail:'detail',
                email:''
            },
            locked:false
        }
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = this.alive?true:false;
        next();
    },
    created(){
        this.Ob.$emit('changetitle','编辑发票');
    },
    methods:{
        save(){
            if(this.locked) return;
            if(!this.data.name){
                this.$toast.fail('请填写发票抬头');
                return;
            }
            if(this.data.type=="company"&&!this.data.number){
                this.$toast.fail('请填写企业税号');
                return;
            }
            if(this.data.email&&!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.data.email)){
                this.$toast.fail('邮箱格式不正确');
                return;
            }
            
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    this.$toast({
                        type:"success",
                        message:"保存成功",
                        onClose:()=>{
                            this.$router.back()
                        }
                    })
                }
            });
        }
    }
}
</script>
