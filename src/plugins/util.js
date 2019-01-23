/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
    return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
        // put the copy into cache at first
        // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
    return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`)
}

/**
 *获取cookie
 *
 * @export
 * @param {*} name
 * @returns
 */
export function getCookie(name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr) {
        return arr[2]
    } else {
        return null
    }
}

/**
 *设置cookie
 *
 * @export
 * @param {*} cname
 * @param {*} value
 * @param {*} expiredays
 */
export function setCookie(cname, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

/**
 *删除cookie
 *
 * @export
 * @param {*} name
 */
export function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval !== null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
/**
 *时间格式化
 *
 * @export
 * @param {*} fmt
 * @param {*} date
 * @returns
 */
export function dateFtt(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
/**
 * 获取当前时间
 * 格式YYYY-MM-DD 00:00:00
 */
export function getNowFormatDate(heroZero, minuteZero, secondZero) {
    // let date = new Date(!!value ? value : null);
    let date = new Date();
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    if (h == '00') {
        h = 11;
    }
    h = heroZero == "00" ? "00" : h;
    m = minuteZero == "00" ? '00' : m;
    s = secondZero == "00" ? '00' : m;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
};
// 获取系统当前时间的上个月时间
export function perMonthtDate() {
    var date = new Date();
    var year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() === 0 ? "12" : date.getMonth();
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }

    var currentdate = year + seperator1 + month + seperator1 + strDate +
        " " + "00" + seperator2 + "00" +
        seperator2 + "00";
    return currentdate;
}

/**
 *px转rem
 * @export
 * @param {*} px
 * @returns
 */
export function px2rem(px) {
    return px / 100 + 'rem'
}
/**
 *rem转px
 * @export 
 * @param {*} rem
 * @returns
 */
export function rem2px(rem) {
    var w = document.documentElement.clientWidth
    var b = 1920
    var f = 100
    rem = parseFloat(rem)
    return rem * w / b * f
}

/**
 *获取随机数
 *
 * @export
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function random(min, max) {
    if (!max) {
        min = 0
        max = min
    }
    return Math.random() * (max - min) + min
}
/**
 *通过ID冒泡排序
 *
 * @export
 * @param {*} arr
 * @returns
 */
export function bubbleSortById(arr) {
    var i = arr.length
    var j
    var temp
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (arr[j].id > arr[j + 1].id) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
        i--
    }
    return arr
}
/**
 * 动态获取请求条数
 *
 * @export
 * @returns
 */
export function getPageSize() {
    var w = document.documentElement.clientWidth
        // var h = document.documentElement.clientHeight
    var s = 10
    if (w <= 1980) {
        s = 10
    } else if (w > 1980) {
        s = 15
    }
    return s;
}
/**
 * 获取table高度
 *
 * @export
 * @returns
 */
export function getTableHeight() {
    var w = document.documentElement.clientWidth
        // var h = document.documentElement.clientHeight
    var s = 520
    if (w <= 1366) {
        s = 500
    } else if (w > 1536) {
        s = 520
    }
    return s
}

// 普通菜单数组转化为树形菜单,暂未用
export function translateDataToTree(data) {
    let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null || value.parentId == "0")
    let menuList = data.filter(value => value.parentId !== 'undefined' && value.parentId != null && value.parentId !== "0")
    let translator = (parents, menuList) => {
        parents.forEach((parent) => {
            menuList.forEach((current, index) => {
                if (current.parentId === parent.id) {
                    let temp = JSON.parse(JSON.stringify(menuList))
                    temp.splice(index, 1)
                    translator([current], temp)
                    typeof parent.menuList !== 'undefined' ? parent.menuList.push(current) : parent.menuList = [current]
                }
            })
        })
    }

    translator(parents, menuList)

    return parents
}
/**
 * 对象的每一项转化为单独的数组
 * arrObj表示数组对象,key表示要转化的每一项的键值
 * @export
 * @returns
 */
export function Object2Array(arrObj, key) {
    var arr = [];
    for (var i = 0; i < arrObj.length; i++) {
        arr.push(arrObj[i][key]);
    }
    return arr;
}