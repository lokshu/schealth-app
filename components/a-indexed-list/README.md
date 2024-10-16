### 

### IndexedList 索引列表

##### 使用

- 数据 list
- 事件 on Select

```html
<a-indexed-list  :list="list" @onSelect="onSelect"></a-indexed-list>

<!-- <a-indexed-list :list="list1" @onSelect="onSelect" :fileds="['text', 'name']" :multiple="true">
</a-indexed-list> -->

<!-- <a-indexed-list :list="list1" @onSelect="onSelect">
    <template #default="item">
        {{item.text}}
    </template>
</a-indexed-list> -->
```

```js
import airport from './airport.js'
    export default {
        data() {
            return {
                list: airport.list,
                list1: [{
                        letter: 'a',
                        data: [{
                            text: 1,
                            name: 'a',
                            checked: true
                        }]
                    },
                    {
                        letter: 'b',
                        data: [{
                            text: 2,
                            name: 'b',
                            disabled: true
                        }]
                    },
                    {
                        letter: 'c',
                        data: [{
                            text: 3,
                            name: 'c',
                        }]
                    },
                    {
                        letter: 'd',
                        data: [{
                            text: 4,
                            name: 'd',
                        }]
                    },
                ]
            }
        },
        methods: {
            onSelect(item, index, cindex) {
                console.log(item, index, cindex)
            }
        }
    }
```

#### 属性说明

| 属性名       | 类型            | 默认值    | 说明             |
| --------- | ------------- |:------:| -------------- |
| list      | Object        | -      | 索引列表的数据        |
| indexKey  | String        | letter | 索引的字段          |
| dataKey   | String        | data   | 列表的字段          |
| fileds    | String\|Array | -      | 显示的字段          |
| multiple  | Boolean       | false  | 是否多选           |
| checkType | String        | circle | 多选图标 / 可选 rect |

#### 事件说明

| 事件名      | 说明        | 参数                               |
| -------- | --------- | -------------------------------- |
| on Select | 点击列表时触发事件 | 当前点击的数据 及索引(data, index, cindex) |
