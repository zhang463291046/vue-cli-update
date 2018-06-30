// 模拟后台接口数据
import Mock from 'mockjs'
const { mock, Random } = Mock
console.log(Random)
const { natural } = Random

const step = (length, [start, end]) => Array.from({length}, (item, i) => [`${i}:00-${i+1}:00`, natural(start, end)])
const point = (length, [start, end]) => Array.from({length}, (item, i) => [`${i}:00`, natural(start, end)])

mock('/index.php/device/get_list', {
  'code': 0,
  'msg': '',
  'data': {
    'list|10': [
      {
        'key1': natural(0, 100),
        'key2': natural(0, 100),
        'key3': natural(0, 100),
        'key4': natural(0, 100),
        'key5': natural(0, 100),
        'key6': natural(0, 100),
      }
    ],
    'page': 1,
    'total': natural(0, 100)
  }
})
