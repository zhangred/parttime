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
                <div class="cols" v-for="(value,name) in dateList" v-bind:key="name"><slot name="cell" :data="value"></slot></div>
            </div>
        </div>`,
    data(){
        return {
            dateList:{}
        }
    },
    created(){
        console.log(5,this.time)

        var list = {};
        for(var i=0;i<30;i++){
            list[i] = {date:i}
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