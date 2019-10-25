"use strict";
import './index.less';
const calendar = {
    name:'calendar',
    props:{
        textPrev:{
            type:String,
            default:'&lt;'
        },
        textNext:{
            type:String,
            default:'&gt;'
        },
        formatTitle:{
            type:String,
            default:'y年m月'
        },
        time:{
            type:Date,
            default:function(){
                return new Date()
            }
        },
        weekTitle:{
            type:Array,
            default:function(){
                return ['日','一','二','三','四','五','六']
            }
        }
    },
    template:`<div class="cm-calendar">
            <div class="cc-top">
                <div class="cc-tl" v-html="textPrev"></div>
                <div class="cc-ttime">{{time|formatTitle(formatTitle,timeFormat)}}</div>
                <div class="cc-tl" v-html="textNext"></div>
            </div>
            <div class="cc-mid"><p class="cols" v-for="text in weekTitle" v-bind:key="text">{{text}}</p></div>
            <div class="cc-table">
                <div :class="['cols',{'disable':value.disable}]" v-for="(value,name) in dateList" v-bind:key="name"><slot name="cell" :data="value"></slot></div>
            </div>
        </div>`,
    data(){
        return {
            dateList:{}
        }
    },
    created(){
        console.log(5,this.time)

        let len = this.getDateLen(this.time.getFullYear(),this.time.getMonth()+1),
            list = {},
            y = this.time.getFullYear(),
            m = this.time.getMonth()+1;

        var step_time = new Date(y+'/'+m+'/1'),
            first_day = step_time.getDay();
        if(first_day>0){
            step_time.setMonth(step_time.getMonth()-1);
            let plen = this.getDateLen(step_time.getFullYear(),step_time.getMonth()+1),
                py = step_time.getFullYear(),
                pm = step_time.getMonth()+1;
            for(var k=plen-first_day;k<plen;k++){
                list[pm+'_'+k] = {date:k,year:py,month:pm,key:pm+'_'+k,disable:true}
            }
        }
        
        for(let i=1;i<=len;i++){
            list[m+'_'+i] = {date:i,year:y,month:m,key:m+'_'+i};
        }

        let nday = 7 - Object.getOwnPropertyNames(list).length%7;
        if(nday){
            step_time.setMonth(step_time.getMonth()+2);
            let ny = step_time.getFullYear(),
                nm = step_time.getMonth()+1;
            for(let z=1;z<=nday;z++){
                list[nm+'_'+z] = {date:z,year:ny,month:nm,key:nm+'_'+z,disable:true};
            }
        }

        this.dateList = list;
        
    },
    mounted(){
    },
    filters:{
        formatTitle:(time,format,func)=>{
            return func(time,format)
        }
    },
    methods:{
        setCurMonth(){
            
        },
        //获取当月日期长度
        getDateLen(y,m){
            return new Date(parseInt(y),parseInt(m)-1,0).getDate();
        },
        timeFormat(time,format){    
            format = format.replace("y",time.getFullYear());
            format = format.replace("m",(time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1));
            format = format.replace("d",time.getDate()<10?'0'+time.getDate():time.getDate());
            format = format.replace("h",time.getHours()<10?'0'+time.getHours():time.getHours());
            format = format.replace("i",time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
            format = format.replace("s",time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds());
            return format;
        },
        bindEvent(){
            
        }
    }
}

export default calendar;