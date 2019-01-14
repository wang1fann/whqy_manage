import * as API from '.'

export default {
    findDataRestoreList: params => {
        return API.POST('/syx/backup/getAllsql', params)
    },
    // /quartz/task/stop取消自动备份
    // 开启自动备份/quartz/task/start
    // startRestore: params => {
    //     // 192.168.0.108:9014/syx/backup/dbbackup
    //     return API.POST('/syx/quartz/task/start', params)
    // },
    //

    // 数据库还原-开始还原按钮请求
    dbRestore: params => {
        return API.POST('/syx/backup/reduction', params)
    },
    // 备份请求type:2 自动，1 手动（后台已做判断关闭自动）
    restore: params => {
        return API.POST('/syx/backup/dbbackup', params)
    },
    //查询自动备份当前状态
    searchAutoRestore: params => {
        return API.POST('/syx/backup/getdataschedulerstatus', params)
    },
    // n自动备份状态切换，开启或关闭
    backupturnon: params => {
        return API.POST('/syx/backup/backupturnon?status=' + params.status + '&type=' + params.type, params)
    },
    // 上传本地文件
    uploadFile: params => {
        return API.POST('/syx/file/multipleUpload', params)
    }
}