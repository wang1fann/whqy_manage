import * as API from '.'

export default {
    findDataRestoreList: params => {
        return API.POST('/syx/quartz/search/' + params.page + '/' + params.size, params)
    },
    // /quartz/task/stop取消自动备份
    // 开启自动备份/quartz/task/start
    // startRestore: params => {
    //     // 192.168.0.108:9014/syx/backup/dbbackup
    //     return API.POST('/syx/quartz/task/start', params)
    // },
    // 数据库还原
    dbRestore: params => {
        return API.POST('/syx/backup/reduction', params)
    },
    // 备份请求192.168.0.108:9014/syx/backup/dbbackup，type:2 自动，1 手动（后台已做判断关闭自动）
    restore: params => {
        return API.POST('/syx/backup/dbbackup/' + params.type, params)
    },
}