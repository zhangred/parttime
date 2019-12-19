<template>
    <div class="pages padredit">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
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
            areaList:areaList,
            searchResult:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','编辑地址');
    },
    methods:{
        //保存
        onSave(rs) {
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
