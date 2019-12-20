<template>
    <div class="pages psalebedit">
        <p class="tline">请绑定持卡人本人的银行卡</p>

        <div class="editlinebox editlinebox-nmt editlinebox-alil">
            <div class="editline">
                <p class="el-ado">持卡人</p>
                <div class="el-input"><input type="text l" class="el-ctrol" v-model="data.name" placeholder="输入持卡人姓名" /></div>
            </div>
            <div class="editline editline-cover editline-select" @click="popbank.show=true">
                <p class="el-ado">开户银行</p>
                <div :class="['el-text l',{'el-text-dis':!data.bank}]">{{data.bank&&data.bank.name||'请选择开户银行'}}</div>
            </div>
            <div class="editline">
                <p class="el-ado">银行卡号</p>
                <div class="el-input"><input type="number" v-model="data.number" class="el-ctrol" data-type="number" placeholder="输入银行卡号" /></div>
            </div>
            <div class="editline">
                <p class="el-ado">开户支行</p>
                <div class="el-input"><input type="text" v-model="data.child" class="el-ctrol" data-type="number" placeholder="请输入开户银行的支行分行" /></div>
            </div>
        </div>

        <div class="cm-btn btn gb-bgc-bdc" @click="save">保存</div>

        <van-popup v-model="popbank.show" position="bottom">
            <div class="popbank">
            <a href="javascript:;" class="pb-item" @click="choosebank(item)" v-for="item in popbank.list" :key="item.id">{{item.name}}</a>
            </div>
        </van-popup>
    </div>
</template>
<style lang="less">
    .psalebedit{
        .tline{ padding: 0 .14rem; line-height: .4rem; color: #666;}
        .btn{ margin: .3rem .14rem 0; border-color: @base; background: @base; color: #fff; border-radius: .04rem;}
        .popbank{ padding-bottom: .2rem;}
        .pb-item{ display: block; padding-left: .14rem; border-bottom: 1px solid #eee; line-height: .48rem;}
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
            popbank:{show:false,list:[]},
            data:{},
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','添加银行卡');

        this.popbank.list = [
            {id:1,name:'中国建设银行'},
            {id:2,name:'中国招商银行'},
            {id:3,name:'中国工商银行'},
            {id:4,name:'中国银行'},
            {id:5,name:'中国人民银行'},
        ]
    },
    methods:{
        choosebank(item){
            this.data.bank = item;
            this.popbank.show = false;
        },
        save(){
            if(this.locked) return;
            if(!this.data.name){
                this.$toast.fail('输入持卡人姓名');
                return;
            }
            if(!this.data.bank){
                this.$toast.fail('请选择开户银行');
                return;
            }
            if(!this.data.number){
                this.$toast.fail('输入银行卡号');
                return;
            }
            if(!this.data.child){
                this.$toast.fail('请输入开户银行的支行分行');
                return;
            }

            this.$toast.loading({
                message: '更新中...',
                forbidClick: true,
                duration:0
            });
            setTimeout(()=>{
                this.$toast.clear()
                this.locked = false;
                this.$router.back()
            },1500)
        }
    }
}
</script>
