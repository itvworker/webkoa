
class Index {
    constructor() {
        this.schema = new db.Schema({
            _id: {
                type: String,
                index: true
            },
            title: {
                type: String, //
                default: ""
            },
            update_time: {
                type: Number,
                default: 0
            },
            info:{
               type:String,
               default:''
            },
            source: {
                type: String,
                default: ''
            },
            author: {
                type: String,
                default: ''
            },
            pics:{
              type:Array,
              default:[]
            },
            cover: {
                type: Object,
                default: ''
            },
            views: {
                type: Number,
                default: 0
            },
            category: {
                type: String,
                default: ''
            },
            like: {
                type: Number,
                default: 0
            },
            content: {
                type: String,
                default: ''
            },
            add_time:{
                  type: Number,
                  defult:tool.time()
            }

        }, {
            collection: 'article',
            versionKey: false
        });
        this.model = mdb.model('news', this.schema);
    }

    async add(data) {
        data['add_time'] = tool.time();
        data['_id'] = tool.getid();
        data['update_time'] = data['add_time'];
        let arr = [];
        arr.push(data.cover);
        let err = await imgModel.useInc({
            path: arr
        }, 1);

        return new this.model(data).save().then(function(result) {
            return tool.dataJson(200, '保存成功', result);

        }, function(err) {
            return tool.dataJson(103, '保存失败', err);
        })

    }
    count(query) {
        return this.model.find(query).count(function(result) {
            return result;
        });
    }


}
