import request from '@/utils/request'
// 园区列表不分页
export function listParkAll(data) {
  return request({
    url: '/safety/park/listNoPage',
    method: 'post',
    data: data
  })
}

// 查询园区列表
export function listPark(query) {
  return request({
    url: '/safety/park/list',
    method: 'get',
    params: query
  })
}

// 查询园区详细
export function getPark(pkPark) {
  return request({
    url: '/safety/park/' + pkPark,
    method: 'get'
  })
}

// 新增园区
export function addPark(data) {
  return request({
    url: '/safety/park',
    method: 'post',
    data: data
  })
}

// 修改园区
export function updatePark(data) {
  return request({
    url: '/safety/park',
    method: 'put',
    data: data
  })
}

// 删除园区
export function delPark(pkPark) {
  return request({
    url: '/safety/park/' + pkPark,
    method: 'delete'
  })
}
