const fs = require('fs');
const gm = require('gm').subClass({GraphicsMagick: true});
const path = require('path');
const os = require('os');
const userModel = $.model('user/user');
class User {
  async reg() {
    // let isHas =  await userModel.findOne({
    //     username: 'admin',
    //     pwd: $.md5(config.key + 'admin888888')
    //   });
    //   this.ctx.session.user = isHas.data;
    this.ctx.body = this.ctx.session.user;
  }
  async login() {
   //  let data = this.ctx.request.body;
   //  if (data.username) {
   //    this.ctx.body = $.dataJson(0, '用户名不能为空');
   //  }
   // let isHas =  await userModel.findOne({
   //    username: data.username,
   //    pwd: $.md5(config.key + data.pwd)
   //  })
   //  this.ctx.session.user = isHas.data;
    this.ctx.body = this.ctx.session.user;
    // this.ctx.body = isHas;

  }

  async add(ctx, next) {

    let a = await userModel.add({
      username: 'admin',
      pwd: $.md5(config.key + 'admin888888')
    });
    console.log(a);

    this.ctx.body = a;

  }
}

module.exports = new User();
