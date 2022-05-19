import request from '@/utils/request'

// 查询工单配置规则列表
export function listWorkOrderRule(query) {
  return request({
    url: '/safety/workOrderRule/list',
    method: 'get',
    params: query
  })
}

// 查询工单配置规则详细
export function getWorkOrderRule(pkWorkOrderRule) {
  return request({
    url: '/safety/workOrderRule/' + pkWorkOrderRule,
    method: 'get'
  })
}

// 新增工单配置规则
export function addWorkOrderRule(data) {
  return request({
    url: '/safety/workOrderRule',
    method: 'post',
    data: data
  })
}

// 修改工单配置规则
export function updateWorkOrderRule(data) {
  return request({
    url: '/safety/workOrderRule',
    method: 'put',
    data: data
  })
}

// 删除工单配置规则
export function delWorkOrderRule(pkWorkOrderRule) {
  return request({
    url: '/safety/workOrderRule/' + pkWorkOrderRule,
    method: 'delete'
  })
}
