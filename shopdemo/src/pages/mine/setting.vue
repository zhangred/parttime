<template>
    <div class="pages">
        <div class="editlinebox editlinebox-nmt editlinebox-50">
            <div class="editline editline-select">
                <p class="el-ado">头像</p>
                <div class="el-head"><input type="file" accept="image/*" class="el-ctrol" placeholder="请输入" @change="getImage" ref="head" /><van-image fit="cover" class="el-headimg" :src="data.head" /></div>
            </div>
            <div class="editline">
                <p class="el-ado">姓名</p>
                <div class="el-input"><input type="text" class="el-ctrol" v-model="data.name" placeholder="请填写" /></div>
            </div>
            <div class="editline">
                <p class="el-ado">手机号</p>
                <div class="el-input"><input type="text" class="el-ctrol" v-model="data.phone" data-type="phone" placeholder="请填写" /></div>
            </div>
            <div class="editline editline-cover" @click="showpicker('sex')">
                <p class="el-ado">性别</p>
                <div class="el-input"><input type="text" class="el-ctrol" data-type="number" :value="{0:'女',1:'男'}[data.sex]" placeholder="请填写" /></div>
            </div>
            <div class="editline editline-cover" @click="showpicker('borthday')">
                <p class="el-ado">生日</p>
                <div class="el-input"><input type="text" v-model="data.borthday" class="el-ctrol" data-type="number" placeholder="请填写" /></div>
            </div>
            <div class="editline editline-cover" @click="showpicker('area')">
                <p class="el-ado">地区</p>
                <div class="el-input"><input type="text" v-model="area" class="el-ctrol" data-type="number" placeholder="请填写" /></div>
            </div>
            <div class="editline">
                <p class="el-ado">微信号</p>
                <div class="el-input"><input type="text" v-model="data.wx" class="el-ctrol" data-type="number" placeholder="请填写" /></div>
            </div>
        </div>

        <div class="btn" @click="checkoutData">{{locked?'正在保存···':'保存'}}</div>

        <van-popup v-model="popshow" position="bottom">
            <van-picker v-show="pickertype=='sex'" :columns="sex" show-toolbar title="选择性别" @cancel="popshow=false" @confirm="sexConfirm" />
            <van-datetime-picker v-show="pickertype=='borthday'" v-model="borthday" type="date" title="选择生日" :min-date="mindata" @cancel="popshow=false" @confirm="borConfirm"/>
            <van-area v-show="pickertype=='area'" title="选择地区" :area-list="areaList" @cancel="popshow=false" @confirm="areaConfirm" :value="data.area[2]" />
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-top: .1rem;}
    .btn{ width: 90%; margin: .2rem auto 0; line-height: .42rem; font-size: .16rem; text-align: center; background: #ff7021; color: #fff; border-radius: .04rem;}
</style>
<script>
import { Popup,Picker,DatetimePicker,Area } from 'vant';
import areaList from './area';
export default {
    components:{
        [Popup.name]:Popup,
        [Picker.name]:Picker,
        [DatetimePicker.name]:DatetimePicker,
        [Area.name]:Area
    },
    data(){
        return {
            popshow:false,
            data:{
                head:'/tempimg/head.jpg',
                name:'',
                phone:'',
                sex:0,
                borthday:'1989/10/08',
                area:['130000','130500','130581'],
                wx:''
            },
            sex:[{id:0,text:'女'},{id:1,text:'男'}],
            pickertype:'',
            mindata:new Date('1975/1/1'),
            borthday:new Date('1989/10/08'),
            areaList:areaList,
            area:'',
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','设置');
        console.log(5,areaList)
        this.setarea();
    },
    methods:{
        checkoutData(){
            if(this.locked) return;
            this.locked = true;
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                   this.$toast.success('保存成功');
                }
                this.locked = false;
            }).catch(()=>{
                this.locked = false;
            });
        },
        sexConfirm(rs){
            this.data.sex = rs.id;
            this.popshow = false;
        },
        //展开弹层
        showpicker(key){
            this.pickertype = key;
            this.popshow = true;
        },
        //生日
        borConfirm(res){
            this.data.borthday = res.getFullYear()+'/'+(res.getMonth()<9?'0'+(res.getMonth()+1):res.getMonth()+1)+'/'+(res.getDate()<10?'0'+res.getDate():res.getDate());
            this.borthday = res;
            this.popshow = false;
        },
        //地区
        areaConfirm(res){
            this.popshow = false;
            this.data.area = [res[0].code,res[1].code,res[2].code]
            this.setarea();
        },
        setarea(){
            let area = this.data.area;
            this.area = areaList.province_list[area[0]]+'/'+areaList.city_list[area[1]]+'/'+areaList.county_list[area[2]]
        },
        getImage(r){
            let inputDOM = this.$refs.head;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            this.data.head = this.getObjectURL(this.fil[0]);
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
        }
    }
}
</script>
