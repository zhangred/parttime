import React from 'react';

function RandomString(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789';
    var maxPos = chars.length;
    var token = '';
    for (var i = 0; i < len; i++) {
        token += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return token;
}

function Timeformat(time,format){
    format = format.replace("y",time.getFullYear());
    format = format.replace("m",(time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1));
    format = format.replace("d",time.getDate()<10?'0'+time.getDate():time.getDate());
    format = format.replace("h",time.getHours()<10?'0'+time.getHours():time.getHours());
    format = format.replace("i",time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
    format = format.replace("s",time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds());
    return format;
}

function Clone(tar){
    // Handle null or undefined or function
    // console.log(tar)
    if (null == tar || tar==undefined || tar==NaN )
        return tar;
    // Handle the 3 simple types, Number and String and Boolean
    if(typeof(tar)=='number'||typeof(tar)=="boolean"||typeof(tar)=="string")
        return tar.valueOf();
    // Handle Date
    if (tar instanceof Date) {
        var copy = new Date();
        copy.setTime(tar.getTime());
        return copy;
    }
    // Handle Array or Object
    if (tar instanceof Object || tar instanceof Array) {
        var copy = (tar instanceof Array)?[]:{};
        for (var attr in tar) {
            if(tar.hasOwnProperty(attr)){
                copy[attr] = tar[attr]?Clone(tar[attr]):tar[attr];
            }
        }
        return copy;
    }
    throw new Error("Unable to clone obj! Its type isn't supported.");
}

export {RandomString, Timeformat, Clone}
