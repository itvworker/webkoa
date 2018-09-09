
const path = require('path');
const root = path.join(__dirname, '../../');
module.exports  = {
        root: root,
        port: 9000,
        db: 'mongodb://localhost:27017/more',
        scret: 'moreapp_admin',
        html: path.join(root, 'src/html'),
        rsa: path.join(root, 'app/rsa/'),
        mid: path.join(root,' src/middleware/'),
        asset: path.join(root, 'public/'),
        images: path.join(root, 'public/images/'),
        model: path.join(root, 'src/model/'),
        key: 'itvwork-admin-webapp'
    }
