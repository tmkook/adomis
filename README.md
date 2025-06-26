<div align="center">
  <img src="https://github.com/tmkook/adomis/blob/main/docs/img/logo.png?raw=true" width="120" alt="adova" />
  <h1 align="center">adomis</h1>
  <h4 align="center">amis for adonisjs, quickly build page</h4>

[amis](https://baidu.github.io/amis/zh-CN/docs/index) |
[adonisjs](https://docs.adonisjs.com/guides/preface/introduction) |
[example](https://github.com/tmkook/adomis/blob/main/src/widgets)

</div>

# 简介

`adomis` 是 `adonisjs` 的扩展包，基于 `amis` 封装了 150+ 组件库，TypeScript 类型提示全程护航。链式调用构建 Web 界面，用后端思维写 UI 让你从前端中解放。

# 安装

第一步：安装 adonisjs 框架，根据提示选择项目类型。

```shell
npm init adonisjs@latest demo
```

第二步：进入 `demo` 目录并添加 adomis 扩展包。

```shell
node ace add adomis
```

第三步：发布前端文件(正常情况下不需要手动发布，因为 add 命令已经自动发布了，只有更新版本后需要手动发布来更新前端文件)

```shell
node ace configure adomis
```

如果你想在 adonijs 框架之外使用也可以通过 npm 命令进行安装发布

```shell
npm i adomis
node node_modules/adomis/bin/publish.js
```

# 工作原理

所有 amis 组件都放在 `adomis/components` 目录。调用方法与 `amis` 组件库属性表中的 `属性名` 相同，参数对应 `属性值` 你可以在 [amis文档](https://baidu.github.io/amis/zh-CN/components) 中找到组件的详细信息。

| 属性名           | 类型       |   默认值    | 说明                    |
| :--------------- | :--------- | :---------: | :---------------------- |
| type             | string     | "container" | 指定为 container 渲染器 |
| className        | string     |             | 外层 Dom的类名          |
| bodyClassName    | string     |             | 容器内容区的类名        |
| wrapperComponent | string     |    "div"    | 容器标签名              |
| style            | object     |             | 自定义样式              |
| body             | SchemaNode |             | 容器内容                |

上面是一个 `Container` 组件的属性表，你可以通过 `make` 方法来创建一个组件对象来链式调用 `Container` 组件属性表中的全部属性。

```typescript
import Container from 'adomis/components/container'
Container.make()
  .className('my-container')
  .bodyClassName('my-body')
  .style({ color: 'red' })
  .body('Hello World')

// 输出: {type:'container', className:'my-container', bodyClassName:'my-body', style:{color:'red'}, body:'Hello World'}
```

或者使用内置的 amis 方法来创建一个组件对象。

```typescript
import amis from 'adomis/amis'
amis('container')
  .className('my-container')
  .bodyClassName('my-body')
  .style({ color: 'red' })
  .body('Hello World')
```

# 基础组件

你可以在 `adomis` 中找到几乎所有的 `amis` 组件，他们都都继承自 `Schema` 类，都拥有以下公共方法。

| 方法名      | 参数               |       说明       |
| :---------- | :----------------- | :--------------: |
| make        | 无                 | 创建一个组件实例 |
| id          | string             |  设置组件的 id   |
| find        | string             |  通过ID查找组件  |
| type        | string             |  设置组件的类型  |
| attr        | string,any,string? |  设置自定义属性  |
| style       | object             |  设置组件的样式  |
| className   | string             |  设置组件的类名  |
| definitions | object             |  设置组件的定义  |
| permission  | boolean            |  设置组件的权限  |
| onEvent     | object             |  设置组件的事件  |
| remove      | string?            |   移除组件属性   |

如果你没有找到你需要的组件或属性，你可以通过 `Schema` 的 `attr` 方法来设置你需要的属性。

```typescript
import Schema from 'adomis/components/schema'

// 设置自定义属性
// 输出: {myKey:['myValue']}
Schema.make().attr('myKey', ['myValue'])

// 追加一个值到数组最后面
// 输出: {myKey:['myValue','myValue2']}
Schema.make().attr('myKey', 'myValue2', 'push')

// 追加一个值到数组最前面
// 输出: {myKey:['myValue3','myValue','myValue2']}
Schema.make().attr('myKey', 'myValue3', 'unshift')

// 替换整个 key 的值
// 输出: {myKey:{test:1}}
Schema.make().attr('myKey', { test: 1 }, 'replace')

// 合并一个对象到 key 的值
// 输出: {myKey:{test:1,test2:2}}
Schema.make().attr('myKey', { test2: 2 }, 'merge')
```

# 构建页面

使用 adomis 后你会发现原来用 adonisjs 后端代码构建页面这么简单。

```typescript
import Page from 'adomis/components/page'
import Button from 'adomis/components/button'

// 给页面设置标题
let page = Page.make().title('Weclome')

// 在页面上放置一个按钮
page.body(Button.make().label('Hello World').level('primary'))

// 在页面上放置多个按钮
page.body([
  Button.make().label('First Button').level('primary'),
  Button.make().label('Second Button').level('info').id('second'),
])

// 查找组件
let second = page.find('second')

// 移除组件的 level 属性
second.remove('level')

// 移除组件
second.remove()

// 不渲染组件
second.permission(false)
```