import request from '@/utils/request'

// 查询工单列表
export function listWorkOrder(query) {
  return request({
    url: '/safety/workOrder/list',
    method: 'get',
    params: query
  })
}

// 查询工单详细
export function getWorkOrder(pkWorkOrder) {
  return request({
    url: '/safety/workOrder/' + pkWorkOrder,
    method: 'get'
  })
}

// 新增工单
export function addWorkOrder(data) {
  return request({
    url: '/safety/workOrder',
    method: 'post',
    data: data
  })
}

// 修改工单
export function updateWorkOrder(data) {
  return request({
    url: '/safety/workOrder',
    method: 'put',
    data: data
  })
}

// 删除工单
export function delWorkOrder(pkWorkOrder) {
  return request({
    url: '/safety/workOrder/' + pkWorkOrder,
    method: 'delete'
  })
}
