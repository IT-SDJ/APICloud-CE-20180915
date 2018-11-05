/********************************************************************************
* Service for APICloud Certification Examination
* Version: 0.0.1
* APICloud 认证考试 Demo App 使用服务类
* created by SDJ at 2018
* description:
* - 针对本次APICloud 9月15日认证考试，专门封装的本应用服务类，目的为了方便开发者学习参考。
* - 本服务类在方法封装时，【简化/弱化】了部分方法封装逻辑的通用性，目的是为了方便新手开发者理解
* - 关于APICloud官方建议反馈邮箱：developer-service@apicloud.com
* - 关于技术方面的建议探讨，可Emal个人邮箱: developer@apicloud.club
* - APICloud官方Github地址：https://github.com/apicloudcom
*********************************************************************************/

!function(ctx){
    'use strict';
    // 定义全局常量
    var DEBUG_MODE = true;   // 是否开启调试模式日志打印的控制开关
    var UIWIDTH = 375;       // 原UI设计稿的页面宽度尺寸，如页面设计尺寸为720*1280，则设定UIWIDTH=720

    var HOST = 'https://pwd.apicloud.com';   // Ajax请求服务端的域名地址
    var ROOT = HOST + '/ks/20180915/';       // Ajax API接口请求的根路径地址

    /**************************
          JS原生辅助方法封装
    **************************/
    var _toString = Object.prototype.toString;
    function toRawType(value) {
        return _toString.call(value).slice(8, -1)
    }
    function type(value,typeName) { // 获取参数类型，如输入2个参数，则判断参数1是否为参数2类型
        if(2 === arguments.length) {
            return toRawType(value) === typeName;
        }
        return toRawType(value);
    }
    // 类型快速判断函数方法
    function isArray(param) {
        return '[object Array]' === _toString.call(param);
    }
    function isJSON(param) {
        return '[object Object]' === _toString.call(param);
    }
    function isString(param) {
        return 'string' === typeof param;
    }
    function isNumber(param) {
        return 'number'=== typeof param;
    }
    function isFunction(param) {
        return 'function' === typeof param;
    }
    function isBoolean(param) {
        return '[object Boolean]' === _toString.call(param);
    }
    function isRegExp(param) {
        return '[object RegExp]' === _toString.call(param);
    }
    function isDate(param) {
        return '[object Date]' === _toString.call(param);
    }
    function isError(param) {
        return '[object Error]' === _toString.call(param);
    }
    function isNull(param) {
        return '[object Null]' === _toString.call(param);
    }
    function isUndefined(param) {
        return '[object Undefined]' === _toString.call(param);
    }
    /**
     * 转化字符串方法
     */
    function toString(val) {
        return val == null ?
            '' :
            typeof val === 'object' ?
            JSON.stringify(val, null, 2) :
            String(val)
    }
    /**
     * 转化数值方法
     */
    function toNumber(val) {
        var n = parseFloat(val);
        return isNaN(n) ? val : n
    }

    /**************************
          App辅助方法封装
    **************************/
    /**
     * 日志打印(普通方式)
     * [DEBUG_MODE 参数为true时，控制台方可显示打印内容]
     * @param  {JSON|Array|String} params 打印的内容参数,支持数组，JSON对象，字符串，支持单一参数或多参数输入
     * @return {Void}
     */
    function log(params) {
        if(!DEBUG_MODE) {
            return;
        }
        var tSign = '【' + new Date().getTime() + '】'; // 前置提示标识信息变量
        if(ctx.api) { // 防止api对象未加载
            if(ctx.api.frameName) { // 区分当前页面
                tSign += '【win:' + ctx.api.winName + '】【frame:' + ctx.api.frameName + '】:';
            }else {
                tSign += '【win:' + ctx.api.winName + '】:';
            }
        } else {
            tSign += ':';
        }

        // 拼装日志打印内容
        if(1 === arguments.length) {
            tSign += toString(params);
        }
        else if( arguments.length > 1) {
            Array.prototype.forEach.call(arguments,function(param){
                tSign += toString(param);
            });
        }
        console.log(tSign);
    }
    // 日志打印（警告方式）
    function warn(params) {
        if(!DEBUG_MODE) {
            return;
        }
        var tSign = '【' + new Date().getTime() + '】'; // 前置提示标识信息变量
        if(ctx.api) { // 防止api对象未加载
            if(ctx.api.frameName) { // 区分当前页面
                tSign += '【win:' + ctx.api.winName + '】【frame:' + ctx.api.frameName + '】:';
            }else {
                tSign += '【win:' + ctx.api.winName + '】:';
            }
        } else {
            tSign += ':';
        }

        // 拼装日志打印内容
        if(1 === arguments.length) {
            tSign += toString(params);
        }
        else if( arguments.length > 1) {
            Array.prototype.forEach.call(arguments,function(param){
                tSign += toString(param);
            });
        }
        console.warn(tSign);
    }

    // 根据移动端设备的实际宽度，动态计算修正页面rem的设置尺寸
    // 修复后，页面的开发尺寸为设计尺寸/100,如 元素设计宽度为50px,则填写为0.5rem
    function fixRem() {
        var tFontSize = parseInt(document.body.clientWidth / UIWIDTH * 100) + 'px';
        log('【REM模式】设置页面HTML的fontSize=',tFontSize);
        document.documentElement.style.fontSize =  tFontSize// 根据rem进行页面动态适配
    }

    /**************************************
              UI处理逻辑封装
     **************************************/
    /**
     * 显示进度提示
     * @param  {JSON} params 进度提示内容参数对象
     * @return {Void}
     */
    function showProgress(params) {
        var tParam = '[object Object]' === Object.prototype.toString.call(params) ? params:{};
        log('showProgress执行了')
        ctx.api.showProgress(tParam);

    }
    // 隐藏进度提示
    function hideProgress() {
        ctx.api.hideProgress();
    }
    /**
     * toast提示信息封装
     * @param  {JSON|String} params 显示的内容相关参数
     * @return {void}
     */
    function toast(params) {
        var tParams = {
            msg: '这个家伙很懒～～～',
            duration: 2000,
            location: 'bottom',
            global: false
        }
        if('string' === typeof params) { // 兼容便利化字符串参数
            tParams.msg = params;
        } else if(isJSON(params)) {
            for(var key in params) {
                tParams[key] = params[key];
            }
        } else {
            return;
        }
        if(ctx.api) {
            ctx.api.toast(tParams);
        } else { // 兼容api对象不存在的情况
            alert(params.msg)
        }
    }
    /**
     * alert提示封装
     * @param  {JSON|String} params 显示的内容相关参数
     * @param  {Function} cb     回调函数
     * @return {Void}
     */
    function alert(params,cb) {
        var tParams = {
            title: '系统提示',
            msg: '',
            buttons: ['确定']
        }
        if('string' === typeof params) { // 兼容便利化字符串参数
            tParams.msg = params;
        } else if(isJSON(params)) {
            for(var key in params) {
                tParams[key] = params[key];
            }
        } else {
            return;
        }
        if(ctx.api) {
            ctx.api.alert(tParams, function(ret, err){
                if('function' === typeof cb) {
                    cb(ret,err);
                }
            });
        } else { // 兼容api对象不存在的情况
            alert(params.msg)
            if('function' === typeof cb) {
                cb(ret,err);
            }
        }
    }

    /**
     * 设置下拉刷新方法
     * @param {Function} cb 回调函数
     */
    function addHeaderRefreshMethod(cb){
        ctx.api.setCustomRefreshHeaderInfo({
            bgColor: '#eee',
            image: {
                pull: 'widget://image/loading/pull.png',
                transform: [
                    'widget://image/loading/up.png'
                ],
                load: [
                    'widget://image/loading/01.png',
                    'widget://image/loading/02.png',
                    'widget://image/loading/03.png',
                    'widget://image/loading/04.png',
                    'widget://image/loading/05.png',
                    'widget://image/loading/06.png',
                    'widget://image/loading/07.png',
                    'widget://image/loading/08.png',
                    'widget://image/loading/09.png',
                    'widget://image/loading/10.png'
                ]
            }
        },function(){
            if(isFunction(cb)) {
                cb();
            }
        })
    }
    function setHeaderRefreshing() {
        ctx.api.refreshHeaderLoading();
    }
    // 停止下拉刷新
    function stopHeaderRefresh() {
        ctx.api.refreshHeaderLoadDone();
    }
    /**
     * 设置上拉监听方法
     * @param {Function} cb  回调函数
     * @param {Number}   val 上拉监听距离值，默认50
     */
    function addScrollToBottomListener(cb,val) { //
        var tVal = 'number' === typeof(val) ? val:50;
        ctx.api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: 50
            }
        }, function(ret, err) {
            if(isFunction(cb)) {
                cb()
            }
        });
    }

    /**************************************
              Ajax请求逻辑封装(精简版)
     **************************************/

    /**
     * Ajax请求统一错误响应处理逻辑
     * @param  {JSON} ret 服务端返回的内容信息
     * @param  {JSON} err 请求返回的错误信息
     * @return {void}
     */
    function handleResErr(ret, err) {
        log('执行统一错误处理逻辑！')
        if (err) {
            if (0 === err.code) {
                toast('网络请求失败：连接错误，请检查网络是否连接！');
            } else if (1 === err.code) {
                toast('网络请求失败：请求超时，请稍后再试！');
            } else if (2 === err.code) {
                toast('网络请求失败：授权错误！')
            } else if (3 === err.code) {
                toast('网络请求失败：返回数据类型错误！');
            } else if (400 === err.statusCode) {
                toast('网络请求失败：请求参数存在错误，服务端无法正确解析执行');
            } else if (401 === err.statusCode) {
                toast('网络请求失败：认证失败，未能通过服务端认证');
            } else if (403 === err.statusCode) {
                toast('网络请求失败：无访问权限');
            } else if (404 === err.statusCode) {
                toast('网络请求失败：请求资源不存在');
            } else if (500 === err.statusCode) {
                toast('网络请求失败：服务器故障,请稍后再试！');
            } else if (503 === err.statusCode) {
                toast('网络请求失败：服务器忙，请稍后再试!');
            } else {
                toast('网络请求失败：未知错误！');
            }
        } else if(ret) {
            // 处理服务端返回的API接口定义中的通用错误代码标识
            if(1 != ret.status) {
                var errInfo = ret.msg ? ret.msg:'网络请求失败：服务端返回未知错误！'
                switch (ret.code) {
                  case 10001:
                      alert(errInfo,function(){
                          // 对于没有系统访问权限错误的处理，
                          // 开发者应根据具体项目逻辑灵活运用，
                          // 不要生搬硬套当前DEMO的处理方式
                          ctx.api.closeWin();
                      })
                      break;
                  default:
                      toast(errInfo);
                }
            }
        }
    }

    /**
     * Ajax通用请求封装
     * @param  {JSON} ajaxObj Ajax参数JSON对象，具体参数同api.ajax中的参数对象
     * api.Ajax
     * @return {void}
     */
    function ajaxRequire(ajaxObj,cb) {
        if ('[object Object]' !== Object.prototype.toString.call(ajaxObj)) {
            warn('ajax请求错误：Ajax对象不存在');
            return;
        }
        // 处理统一请求头headers(本次请求头部处理相对简单，就不单独封装函数了)
        ajaxObj.headers = {
            "Content-Type": "application/json",
            "token" : "14052ae98d89b4570b8f8842c17fa971a1b844e7"
        }
        ctx.api.ajax(ajaxObj, function(ret, err) {
            //请求报文日志
            log('【AJAX请求发送参数】：', ajaxObj,'【服务端返回响应数据】：【ret】：' ,ret,'【err】：',err);
            var isNeedHandleErr = false;
            if ('function' === typeof cb) { // 请求回调处理
                // 优先级：先处理页面内用户编译的业务逻辑，如用户返回true，则执行统一回调处理，否则不触发统一回调
                isNeedHandleErr = cb(ret, err)
            }
            if(isNeedHandleErr) {
                handleResErr(ret, err); // 调用统一错误逻辑处理方法
            }
        });
    }

    // ，根据本项目实际接口，删除了部分通用逻辑封装，主要是方便新手开发者理解
    /**
     * Ajax POST请求快速请求构造方法
     * @param  {String}   partUrl Api请求的相对路径地址
     * @param  {String|JSON}   params  请求参数，字符串或JSON对象格式
     * @param  {Function} cb      回调函数
     * @return {Void}
     */
    function post(partUrl,params,cb) {
        var tAjax = {
            url: ROOT + partUrl,
            method: 'post',
            data: {  // 此data中的参数封装逻辑由api接口交互方式确定
                body: params
            }
        }
        ajaxRequire(tAjax,cb);
    }
    /**
     * Ajax GET请求快速请求构造方法
     * 说明：本方法删除了部分通用逻辑封装，主要是方便新手开发者理解
     * @param  {String}   partUrl Api请求的相对路径地址
     * @param  {JSON}     params  【可选参数】GetUrl后面追加的参数
     * @param  {Function} cb      回调函数
     * @return {Void}
     */
    function get(partUrl,cb) {
        var tCB;
        if(arguments.length>2 && !isFunction(cb)) {
            partUrl = addParamsToUrl(partUrl,cb);
            tCB = arguments[arguments.length-1];
        } else {
            tCB = cb;
        }
        var tAjax = {
            url: ROOT + partUrl,
            method: 'get'
        }

        ajaxRequire(tAjax,tCB);
    }

    function addParamsToUrl(url,params) {
        if('string' !== typeof url || !isJSON(params)) { return; }
        var addStr = '';
        for(var key in params) {
            var sign = addStr.length ? '&':'?';
            addStr += sign + key + '=' + params[key];
        }
        return url + addStr;
    }

    function isFunction(param) {
        return 'function' === typeof param;
    }
    function isBoolean(param) {
        return '[object Boolean]' === _toString.call(param);
    }
    function isRegExp(param) {
        return '[object RegExp]' === _toString.call(param);
    }
    function isDate(param) {
        return '[object Date]' === _toString.call(param);
    }
    function isError(param) {
        return '[object Error]' === _toString.call(param);
    }
    function isNull(param) {
        return '[object Null]' === _toString.call(param);
    }
    function isUndefined(param) {
        return '[object Undefined]' === _toString.call(param);
    }
    /*********************************
            对外暴露的函数方法
     *********************************/

    // 如开发者觉得每次都打$S不方便，也可以直接将下面的 "ctx.$S=" 修改为  "ctx=" ,
    // 修改后开发者应注意存在污染window变量的问题
    ctx.$S = {
        toString: toString, // 任意变量转字符串
        isJSON: isJSON,     // 类型判断，是否JSON对象类型
        isArray: isArray,
        isString: isString,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isRegExp: isRegExp,
        isDate: isDate,
        isError: isError,
        isNull: isNull,
        isUndefined: isUndefined,
        log: log,                   // 日志打印（普通方式）
        warn: warn,                 // 日志打印 (警告方式)
        showProgress: showProgress, // 显示状态提示
        hideProgress: hideProgress, // 隐藏状态提示
        toast: toast,               // toast提示
        alert: alert,               // alert提示（支持回调）
        addHeaderRefreshMethod: addHeaderRefreshMethod,         // 设置下拉事件逻辑方法
        setHeaderRefreshing: setHeaderRefreshing,               // 设置header开始刷新状态
        stopHeaderRefresh: stopHeaderRefresh,                   // 停止下拉刷新
        addScrollToBottomListener: addScrollToBottomListener,   // 设置上拉动作监听
        handleResErr: handleResErr, // 请求错误的统一处理逻辑
        getHost: function() {       // 获取请求服务器的根路径
            return HOST;
        },
        POST: post,                 // Ajax POST快速请求
        GET: get                    // Ajax GET快速请求
    }

    /*********************************
            window.onload自动执行方法
     *********************************/
    // 重写window.onload事件，页面加载后程序自动执行rem修复
    if('function' == typeof ctx.onload) {
        var _fun = ctx.onload;
        ctx.onload = function() {
            fixRem();
            _fun();
        }
    } else {
        ctx.onload = function() {
            fixRem();
        }
    }
}(this)
