'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/


const user = {
    name : 'leo88w234234w88',
    password : '123ww678',
    nickname : 'hanwwqiang',
    email : '1621022@qq.com',
    //uid : {type : Integer},
    about : '测试时哥ww哥',
};

$.method('user.add').call({
    name : 'leo88w234234w88',
    password : '123ww678',
    nickname : 'hanwwqiang',
    email : '1621022@qq.com',
    //uid : {type : Integer},
    about : '测试时哥ww哥',
},console.log());
