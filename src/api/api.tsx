import service from './axios'
const icode = '13926EAFCAA16CC3'
function screenData() {
  return service({
    url: '/screen/data',
    method: 'get',
    params: { icode }
  })
}


export default {
    screenData
}