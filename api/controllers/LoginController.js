/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var logicLayer = require("../logicLayer/logicLayer.js");
var ReturnVO = require("../vo/valueObjects.js").vos;
var messages = require("../CONST/messages");
var md5 = require('md5');

module.exports = {

    //TODO: login action receives username and md5(password)

    login:function(req,res){
        var resturnVO =new ReturnVO;
        var token,createdDate;
        var userLogin = {
            username:req.param("username"),
            password:md5(req.param("password"))
        };
        Admin.find(userLogin).then(function(admin){
            if(admin && admin.length>0){
                //TODO: if have a valid session
                if(admin[0].token && admin[0].token.createdDate){
                    if(logicLayer.validateTokenDate(admin[0].token.createdDate)){
                        resturnVO.success = {token:admin[0].token.tokenString};
                        return res.json(resturnVO);
                    }
                    else{
                        logicLayer.createToken(function(t,d){
                            token = t;
                            createdDate = d;
                        });
                        Admin.update({id:admin[0].id},{token:{tokenString:token,createdDate:createdDate}}).then(function(admin){
                            resturnVO.success = {token:admin[0].token.tokenString};
                            return res.json(resturnVO)
                        }).catch(function(err){
                            resturnVO.fail = err;
                            return res.json(resturnVO)
                        })
                    }
                }
                else{
                    logicLayer.createToken(function(t,d){
                        token = t;
                        createdDate = d;
                    });
                    Admin.update({id:admin[0].id},{token:{tokenString:token,createdDate:createdDate}}).then(function(admin){
                        resturnVO.success = {token:admin[0].token.tokenString};
                        return res.json(resturnVO)
                    }).catch(function(err){
                        resturnVO.fail = err;
                        return res.json(resturnVO)
                    })
                }
            }
            else{
                //TODO: if user not found
                resturnVO.fail = messages.errors.USER_NOT_FOUND;
                return res.json(resturnVO);
            }
        }).catch(function(err){
            //TODO:handle error here
        })

    },
    create:function(req,res){
        var userInfo = {
            username:req.param("username"),
            password:req.param("password")
        }
        Admin.create(userInfo).then(function(admin){
            return res.json(admin);
        }).catch(function(err){
            //TODO:handle error here!
        })
    },
    destroy :function(req,res){
        Admin.destroy().then(function(result){
            return res.json({result:result});
        }).catch(function(err){
            return res.json({err:err});
        })

    }

};

