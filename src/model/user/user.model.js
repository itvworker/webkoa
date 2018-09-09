//const imgModel = require(path.join(webconfig.v1, 'images.js'));
class User {
  constructor() {
    this.schema = new db.Schema({
      _id: {
        type: String,
        index: true
      },
      username: {
        type: String,
        default: ''
      },
      pwd: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
        default: 1
      },
      power: {
        type: Object,
        default: ''
      },
      role: {
        type: Number,
        default: 0
      },
      openid: {
        qq: {
          type: String,
          default: ''
        },
        weixin: {
          type: String,
          default: ''
        },
        weibo: {
          type: String,
          default: ''
        }
      },
      user_msg: {
        nickname: {
          type: String,
          default: ''
        },
        header: {
          type: String,
          default: ''
        },
        level: {
          type: Number,
          default: ''
        },
        integral: {
          type: Number,
          default: 0
        }
      },
      add_time: {
        type: Number,
        default: $.time()
      }
    }, {
      collection: 'user',
      versionKey: false
    });
    this.model = db.model('uesr', this.schema);
    return this;
  }

  async add(data) {
    data['add_time'] = $.time();
    data['_id'] = $.getid();
    let ishas = await this.findOne({username: data.username});
    if(ishas.code===1){
      return $.dataJson(0, '帐号已存在');
    }
     return  this.model(data).save().then(function(result) {
         return $.dataJson(1, '添加成功', result);
      }, function(err) {
          return $.dataJson(0, '添加失败', result);
      })

  }

  async findOne(data) {
    return this.model.findOne(data).then(function(result) {
      if (result) {
        return $.dataJson(1, '查询成功', result)
      } else {
        return $.dataJson(0, '没有数据');
      }
    }, function(err) {
      return $.dataJson(500, '错误', err);
    })
  }

  async updataPerson(condition, data) {
    let arr = {}
    for (let i in data) {
      arr['marterial.person.' + i] = data[i];
    }

    return this.model.update(condition, {$set: arr}).then(function(result) {
      return {err_code: 200, err_msg: '修改成功'}
    }, function(err) {
      return $.dataJson(104, '数据库错误');
    });
  }

}

module.exports = new User();
