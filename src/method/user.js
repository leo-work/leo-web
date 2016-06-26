'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/
import validator from 'validator';

module.exports = function(done){
  $.method('user.add').check({
    name:{required:true, validate:(v) => validator.isLength(v,{min:4,max:20}) && /^[a-zA-Z]/.test(v)},
    email:{required:true, validate:(v) => validator.isEmail(v)},
    password:{required:true, validate:(v) => validator.isLength(v,{min:6})}
   });

  $.method('user.add').register(async function(params){
    //callback(params);

    //用户名不区分大小写 先转化为小写
  //  console.log(params);
    params.name = params.name.toLowerCase();
    {
      //通过用户名判断用户是否已经存在
      console.log(params.name);
      const user = await $.method('user.get').call({name:params.name});
      if(user) throw new Error(`user ${params.name} already exists !`);
    }
    {
      //通过邮箱判断用户名是否存在
      const user = await $.method('user.get').call({email:params.email});
      if(user) throw new Error(`user ${params.email} already exists !`);
    }
    params.password = $.utils.encryptPassword(params.password.toString());
    console.log(params.password);
    //console.log(params);
    const user = new $.model.User(params);

    return user.save();
  });

  $.method('user.get').check({
    _id:{validate:(v) => validator.isMongoId(v)},
    name:{validate:(v) => validator.isLength(v,{min:4,max:20}) && /^[a-zA-Z]/.test()},
    email:{validate:(v) => validator.isEmail(v)},
   });

  $.method('user.get').register(async function(params){
    const query = {};
    if(params._id){
      query._id = params._id;
    }else if(params.name){
      query.name = params.name;
    }else if(params.email){
      query.email = params.email;
    }else {
      return callback(new Error('miss: _id|name|email is check!'));
    }

    return $.model.User.findOne(query);
  });

  $.method('user.update').check({
    _id:{validate:(v) => validator.isMongoId(v)},
    name:{validate:(v) => validator.isLength(v,{min:4,max:20}) && /^[a-zA-Z]/.test(v)},
    email:{validate:(v) => validator.isEmail(v)},
   });
   $.method('user.update').register(async function(params){

    const user = await $.method('user.get').call(params);
    if(!user){
      throw new Error('user does not exists!');
    }

    const update = {};
    if (params.name && user.name !== params.name) {
      update.name = params.name;
    }
    if (params.email && user.email !== params.email) {
      update.email = params.email;
    }
    if (params.password) {
      update.password = params.password;
    }
    if (params.nickname) {
      update.nickname = params.nickname;
    }
    if (params.about) {
      update.nickname = params.nickname;
    }
    return $.model.User.update({_id:user._id},{$set:update});
   });
  done();
};
