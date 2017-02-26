# zent-pop

气泡弹层，点击或者hover触发显示。

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
集成了ToolTip和PopConfirm功能，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。提供onConfirm方法，就可以实现PopConfirm的相关功能

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| content | 弹层的内容 | node | | |
| trigger | 可选，触发方式 | string | none | click, hover, focus, none |
| position | 可选，弹出框的位置，目前的设定是前一位表示相对触发元素的位置，后一位表示箭头相对于Pop的位置 | string | 'top-center' | 'position-position' |
| centerArrow | 可选，是否按小箭头居中对齐trigger来定位 | bool | false | true |
| header | 可选，用户可以自定义头部 | node | | |
| block | 可选，弹层在文档流里是否以块级元素出现 | bool | false | true, false |
| onShow | 可选，弹层打开后的回调函数 | func: () => () | noop | |
| onClose | 可选，弹层关闭后的回调函数 | func: () => () | noop | |
| onBeforeShow | 可选，弹层打开前的回调函数，只有用户触发的打开操作才会调用，外部设置`visible`不会调用 | func | noop | |
| onBeforeClose | 可选，弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用，外部设置`visible`不会调用 | func | noop | |
| onConfirm | 可选，用户自定义回调，设置以后pop 表现为confirm | func | null |  |
| onCancel | 可选，用户使用 confirm 的时候可自定义取消的回调 | func | null |  |
| confirmText | 可选，用户自定义按钮名 | string | 确定 |  |
| cancelText | 可选，用户自定义取消按钮 | string | 取消 |  |
| type | 可选，影响确定按钮的样式 | string | primary | primary, default, danger, success |
| visible | 可选，外部维护`Pop`的显示状态，此时外部拥有`Pop`的全部控制权，必须和`onVisibleChange`一起使用 | bool | | |
| onVisibleChange | 可选，和`visible`一起使用 | func | | |
| className | 可选，自定义类名 | string | '' |  |
| wrapperClassName | 可选，自定义trigger包裹节点的类名 | string | '' |  |
| prefix | 可选，自定义前缀 | string | zent |  |

### centerArrow

默认情况下，`Pop`根据`position`对齐的是弹层和trigger的边缘，除了`postion`为`*-center`的情况下，
弹层上的小箭头和弹层边缘的间距是固定的，因而在trigger特别小的情况下箭头会对齐到trigger外部。
这种情况下可以设置`centerArrow`为`true`，不管trigger大小如何，箭头永远对齐在trigger中间，
弹层再相对箭头做定位。

### onConfirm和onCancel

支持异步响应，此时按钮会变成loading状态。

* 如果返回一个`Promise`，`Pop`会在`Promise` `resolve`后关闭。
* 也支持参数形式的异步响应，此时接受一个参数`close`，需要在函数内手动调用`close`函数。

根据trigger值的不同，`Pop`提供了一些额外的控制参数。

### trigger为click

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| closeOnClickOutside | 点击弹层和trigger节点外部时自动关闭 | bool | true | false, true |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | | |


### trigger为hover

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| mouseEnterDelay | hover打开的延迟（单位：毫秒） | number | 200 |  |
| mouseLeaveDelay | 关闭的的延迟（单位：毫秒） | number | 200 |  |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | | |


### trigger为none

如果需要在`onConfirm`和`onCancel`中自动关闭Pop，需要提供`onVisibleChange`回调函数


### 实例方法

`Pop` 的实例上提供了 `open` 和 `close` 方法来手动打开/关闭 `Pop`。


## 升级须知

`0.4.0`版本有以下不兼容改动：

* `trigger`默认值为`none`，所以之前没有传`trigger`参数的地方要加上`trigger="click"`
* `visible`参数只有在`trigger`为`none`时才有效
* 移除了`onVisibleChange`这个参数
* 暂时移除了打开／关闭动画
* css类名中的`popover`统一改为`pop`，跟组件名字一致，避免和新的`Popover`组件冲突
* `Pop`在文档流里会将`children`外面包裹一层`div.zent-pop-wrapper`，这个div的显示方式可以通过`block`参数控制，默认行内显示
* html结构没有大的变化，只是在`.zent-pop`和`.zent-pop-inner`, `.zent-pop-header`以及`.zent-pop-arrow`
  中间多了一层`div.zent-popover-content`，多出的这一层是`Popover`组件产生的
