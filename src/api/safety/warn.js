import request from '@/utils/request'

// 查询告警中心列表
export function listWarn(query) {
  return request({
    url: '/safety/warn/list',
    method: 'get',
    params: query
  })
}

// 查询告警中心详细
export function getWarn(pkWarn) {
  return request({
    url: '/safety/warn/' + pkWarn,
    method: 'get'
  })
}

// 新增告警中心
export function addWarn(data) {
  return request({
    url: '/safety/warn',
    method: 'post',
    data: data
  })
}

// 修改告警中心
export function updateWarn(data) {
  return request({
    url: '/safety/warn',
    method: 'put',
    data: data
  })
}

// 删除告警中心
export function delWarn(pkWarn) {
  return request({
    url: '/safety/warn/' + pkWarn,
    method: 'delete'
  })
}
