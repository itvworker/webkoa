const fs = require('fs');
const gm = require('gm').subClass({GraphicsMagick: true});
const path = require('path');

class User {
     constructor() {

     }
     async reg(){
        // this.ctx.response.status=404;
        //  gm(path.join(config.asset,'160905180451092.png'))
        // .resize(240, 240)
        // .write(path.join(config.asset,'250.png'), function (err) {
        //     console.log(err);
        // });

            this.ctx.body =  $.getid()
     }
     async login(){
         this.ctx.body = "login"
     }


}

module.exports = new User();
