const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
]

function arrayToTree(items) {
  const result = []
  const itemMap = {} //每个值的对象  id : 值

  for (const item of items) {
    const id = item.id
    const pid = item.pid

    if (!itemMap[id]) {
      itemMap[id] = {
        ...item,
        children: []
      }
    }

    console.log('item', item, itemMap[id], itemMap[id]['children'])

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    console.log('itemMap[id]', itemMap[id])

    const treeItem = itemMap[id]

    if (pid === 0) {
      //根节点 直接放到数组里
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }

      //当前节点放到他的父节点上
      itemMap[pid].children.push(treeItem)
    }
  }

  return result
}

console.log('arrayToTree', JSON.stringify(arrayToTree(arr), '\n'))
