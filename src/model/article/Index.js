
class Index {
    constructor() {
        this.schema = new db.Schema({
            _id: {
                type: String,
                index: true
            },
            title: {
                type: String,
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
            cover: {
                type: Object,
                default: ''
            },
            views: {
                type: Number,
                default: 0
            },
            sort: {
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
            collection: 'news',
            versionKey: false
        });


        this.model = mdb.model('news', this.schema);
    }
}
