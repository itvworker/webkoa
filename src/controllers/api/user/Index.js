class User {
     constructor() {

     }
     async reg(){
          this.ctx.body = "wwwwww";
     }
     async login(){
         this.ctx.body = "login"
     }
}

module.exports = new User();
