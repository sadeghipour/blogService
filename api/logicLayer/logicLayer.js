/**
 * Created by PC-Ali on 3/6/2016.
 */

var md5 = require('md5');
var configs = require("../CONST/messages").configs;
module.exports = {

    validateTokenDate:function(date){
        var isValid = false;
        var d = new Date();
        var now = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate()+" "+ d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
        var tokenDate = (date.replace(" ","-").replace(":","-").replace(":","-")).split("-");
        if(tokenDate[0]==d.getFullYear() && tokenDate[1]==(d.getMonth()+1) && tokenDate[2]==d.getDate()){
            tokenDate[3]+2>d.getHours() ? isValid=true : isValid=false;
        }
        else{
            isValid = false;
        }
        return isValid;
    },
    createToken:function(callback){
        var d = new Date();
        var createdDate = d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate()+" "+ d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
      var token = md5(md5(Date()+configs.tokenSecretKey));
        callback(token,createdDate);
    }
}