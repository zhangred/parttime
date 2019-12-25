<template>
    <div class="pages padredit">
        <van-address-edit
            ref="dom"
            :address-info="info"
            :area-list="areaList"
            show-postal
            :show-delete="showdel"
            show-set-default
            show-search-result
            save-button-text="确认"
            delete-button-text="删除地址"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>
<style lang="less">
    .padredit{
        .van-button--danger{ background: @base;}
        .van-switch--on{background: #4cdb45}
        .van-button{ border-radius: .02rem; height: .44rem; font-size: .16rem;}
    }

</style>
<script>
import areaList from '../area';
import { AddressEdit } from 'vant';
export default {
    components:{
        [AddressEdit.name]:AddressEdit
    },
    data(){
        return {
            info:{},
            aid:0,
            showdel:false,
            areaList:areaList,
            searchResult:[]
        }
    },
    created(){
        this.aid = this.$route.query.aid||0;
        this.Ob.$emit('changetitle',this.aid?'编辑地址':'新增地址');
        this.showdel = this.aid?true:false;
        if(this.aid){
            this.info = {
                id:123,
                name:'张小四',
                tel:'15821670480',
                addressDetail:'某某镇某某村某某大街某某号',
                areaCode:'130581',
                postalCode:'123456',
                isDefault:true
            }
        }
    },
    mounted(){
        this.$refs.dom.$el.getElementsByClassName('van-button--danger')[0].classList.add('gb-bgc-bdc')
    },
    methods:{
        //保存
        onSave(rs) {
            console.log(rs)
            return;
            this.rs = rs;
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
        },
        //删除
        onDelete() {
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    this.$toast({
                        type:"success",
                        message:"删除成功",
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
