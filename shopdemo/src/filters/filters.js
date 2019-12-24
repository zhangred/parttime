import Vue from 'vue';

Vue.filter('timeFormat',function(value,format){
    if(typeof(value)!='object'){
        var time = value?new Date(value):new Date();
    }else{
        time = value;
    }
    
    
    format = format.replace("y",time.getFullYear());
    format = format.replace("m",(time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1));
    format = format.replace("d",time.getDate()<10?'0'+time.getDate():time.getDate());
    format = format.replace("h",time.getHours()<10?'0'+time.getHours():time.getHours());
    format = format.replace("i",time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
    format = format.replace("s",time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds());
    return format;
})

Vue.filter('tofix',function(value,fixed){
    value = value||0;
    var v = Math.round(value*Math.pow(10,fixed))/Math.pow(10,fixed)+'',
        nar = v.split('.');
    if(!nar[1]){
        v = v+'.00';
    }else if(nar[1].length==1){
        v = v+'0';
    }
    return v;
})