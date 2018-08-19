const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request');
const CryptoJS = require('crypto-js');
class Tool{
    /**
     * 获取md5字符串ID
     * @return {String}
     * @api public
     */
    getid() {
        let time = new Date().getTime();
        let id = time + this.random(4) + this.random(5);
        return crypto.createHash('md5').update(id).digest('hex');

    };
    /**
     * 获取时间秒数
     * @return {Number}
     * @api public
     */
    time() {
        return parseInt(new Date().getTime() / 1000);
    };
    /**
     * 获取随机字符串
     * @param {Number} num 随机字符的位数
     * @return {String}
     * @api public
     */
    random(num) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var str = "";
        for (let i = 0; i < num; i++) {
            var len = parseInt(Math.random() * 36)
            str += chars[len];
        }
        return str;
    };
    /**
     * 去除脚本语言
     * @param {Stirng} str 字符串
     * @return {String}
     * @api public
     */
    script(str) {
        return str.replace(/<script.*?>.*?<\/script>/ig, '');
    };

    /**
     * 去除字符串指定的字符
     * @param {Stirng} str 过滤的字符串
     * @param {Stirng} wipe 要去除的字符
     * @return {String}
     * @api public
     */
    removeStr(str, wipe) {
        return str = str.replace(wipe, '');
    };

    /**
     * md5加密
     * @param {Stirng} str 要加密的字符串
     * @return {String}
     * @api public
     */
    md5(str) {
        return crypto.createHash('md5').update(str).digest('hex');
    };
    getInnerString(source, prefix, postfix) {
        let regexp = new RegExp(this.encodeReg(prefix) + '.+' + this.encodeReg(postfix), 'gi');
        let matches = String(source).match(regexp);
        let str1 = matches[0].replace(prefix, '');
        str1 = str1.replace(postfix, '');
        return str1;
    };
    encodeReg(source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    };
    dataJson(err_code, err_msg, data) {
        if (data) {
            return {
                err_code: err_code,
                err_msg: err_msg,
                data: data
            }

        } else {
            return {
                err_code: err_code,
                err_msg: err_msg,

            }
        }
    }
    aesData(data,key){
        if(!data.data) return data;
        data.data= CryptoJS.AES.encrypt(JSON.stringify(data.data), key).toString();
        return data;
    }
    /**
     * 获取字符串里的图片
     * @param {Stirng} str 要过滤的字符串
     * @return {Array}
     * @api public
     */
    getImgurl(str) {
        let regx = /\w{32}.(?:jpg|png|gif|jps|bmp|jpeg)/gi;
        let arr = [];
        str.replace(regx, function(value) {
            arr.push(value);
            return value;
        });
        return this.array_remove_repeat(arr);
    }
    /**
     * 数组去重，只支持String,Number数组
     * @param {Array} arr 要过滤的字符串
     * @return {Array}
     * @api public
     */
    array_remove_repeat(arr) {
       return [...new Set(arr)]
    }
    /**
     * 交集
     * @param {Array} a 数组1
     * @param {Array} b 数组2
     * @return {Array}
     * @api public
     */
    array_intersection(a, b) { // 交集
        var result = [];
        for (var i = 0; i < b.length; i++) {
            var temp = b[i];
            for (var j = 0; j < a.length; j++) {
                if (temp === a[j]) {
                    result.push(temp);
                    break;
                }
            }
        }
        return this.array_remove_repeat(result);
    }

    /**
     * 并集
     * @param {Array} a 数组1
     * @param {Array} b 数组2
     * @return {Array}
     * @api public
     */
    array_union(a, b) { // 并集
        return this.array_remove_repeat(a.concat(b));
    }
    /**
     * 差集
     * @param {Array} arr1 数组1
     * @param {Array} arr2 数组2
     * @return {Array}
     * @api public
     */
    array_difference(arr1, arr2) {
        var diff = [];
        var tmp = arr2;
        arr1.forEach(function(val1, i) {
            if (arr2.indexOf(val1) < 0) {
                diff.push(val1);
            } else {
                tmp.splice(tmp.indexOf(val1), 1);
            }
        });
        return this.array_remove_repeat(diff.concat(tmp));

    }

    pageurl(path, query) {
        var url = path + '?';
        for (let i in query) {
            if (i != 'page') {
                url += i + '=' + query[i] + '&'
            }
        }
        return url;
    }
    /**
     * 时间戳
     * @param {Array} arr1 数组1
     * @param {Array} arr2 数组2
     * @return {Array}
     * @api public
     */
    formatDate(arg, layout ="Y-M-D h:s") {
        var now = new Date(parseInt(arg) * 1000)
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        month = month >= 10 ?
            month :
            '0' + month;
        var date = now.getDate();
        date = date >= 10 ?
            date :
            '0' + date;
        var hour = now.getHours();
        hour = hour >= 10 ?
            hour :
            '0' + hour;
        var minute = now.getMinutes();
        minute = minute >= 10 ?
            minute :
            '0' + minute;
        var second = now.getSeconds();
        second = second >= 10 ?
            second :
            '0' + second;
       return layout.replace('Y', year)
                    .replace("M", month)
                    .replace("D", date)
                    .replace('h', hour)
                    .replace('m', minute)
                    .replace('s', second);

    }

    paramArr(path) {
        let arr = path.split('/');
        arr.splice(0, 1);
        return arr;
    }

    curl(url, data) {
        return new Promise(function(resolve, reject) {
            request.post({
                    url: url,
                    body: data,
                    encoding: 'utf8',
                    json: true
                },
                function(error, response, body) {
                    if (response.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        resolve(response);
                        console.log(response.statusCode);
                    }
                }
            );
        })

    }
    get(url) {
        return new Promise(function(resolve, reject) {
            request.get(url,
                function(error, response, body) {
                    if (response.statusCode == 200) {
                        resolve(body);
                    } else {
                        resolve(response);

                    }
                }
            );
        })
    }

    /**
     * 字符串字节数
     * @param {String} str 数组1
     * @return {Number}
     * @api public
     */
    strlen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    }
    /**
     * 获取对象类型
     * @param {Anyting}
     * @api public
     */
    dataType(data) {
        let type = Object.prototype.toString.call(data);
        return type.slice(8, -1).toLowerCase();
    }


}
module.exports = new Tool();
