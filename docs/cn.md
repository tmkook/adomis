# 简介

`adova-amis` 是 `adonisjs` 的扩展包, 使用前请确保你会使用 `adonisjs` 框架。如果你熟悉 `Laravel` 那么你可以无痛地迁移到 `adonisjs` 上愉快的使用 `adova-amis` 扩展，因为他们的使用方式几乎一致的。

# 安装

第一步：安装 adonisjs 框架，根据提示选择项目类型。

```
npm init adonisjs@latest demo
```

第二步：进入 `demo` 目录并添加 adova-amis 扩展包。

```
node ace add adova-amis
```

第三步：发布前端文件(正常情况下不需要手动发布，因为 add 命令已经自动发布了，只有更新版本后需要手动发布来更新前端文件)

```
node ace configure adova-amis
```

如果你不想在 `adonisjs` 中使用，我们也支持 `npm` 安装和发布前端文件。

```
npm i adova-amis
node node_modules/adova-amis/build/bin/pub.js
```

# 工作原理

所有 amis 组件都放在 `adova-amis/components` 目录。调用方法与 `amis` 组件库属性表中的 `属性名` 相同，参数对应 `属性值` 你可以在 [amis文档](https://baidu.github.io/amis/zh-CN/components) 中找到组件的详细信息。

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
import Container from 'adova-amis/components/container'
Container.make()
  .className('my-container')
  .bodyClassName('my-body')
  .style({ color: 'red' })
  .body('Hello World')

// 输出: {type:'container', className:'my-container', bodyClassName:'my-body', style:{color:'red'}, body:'Hello World'}
```

# 基础组件

你可以在 `adova-amis` 中找到几乎所有的 `amis` 组件，他们都都继承自 `Schema` 类，都拥有以下公共方法。 

| 方法名      | 参数    |       说明       |
| :---------- | :------ | :--------------: |
| make        | 无      | 创建一个组件实例 |
| id          | string  |  设置组件的 id   |
| find        | string  |  通过ID查找组件  |
| type        | string  |  设置组件的类型  |
| attr        | string,any,string?  |  设置自定义属性  |
| style       | object  |  设置组件的样式  |
| className   | string  |  设置组件的类名  |
| definitions | object  |  设置组件的定义  |
| permission  | boolean |  设置组件的权限  |
| onEvent     | object  |  设置组件的事件  |
| remove      | string?  |   移除组件属性   |

如果你没有找到你需要的组件或属性，你可以通过 `Schema` 的 `attr` 方法来设置你需要的属性。

```
import Schema from 'adova-amis/components/schema'

// 设置自定义属性
// 输出: {myKey:['myValue']}
Schema.make().attr('myKey',['myValue']) 

// 追加一个值到数组最后面
// 输出: {myKey:['myValue','myValue2']}
Schema.make().attr('myKey','myValue2','push')

// 追加一个值到数组最前面
// 输出: {myKey:['myValue3','myValue','myValue2']}
Schema.make().attr('myKey','myValue3','unshift') 

// 替换整个 key 的值
// 输出: {myKey:{test:1}}
Schema.make().attr('myKey',{test:1},'replace') 

// 合并一个对象到 key 的值
// 输出: {myKey:{test:1,test2:2}}
Schema.make().attr('myKey',{test2:2},'merge')
```

# 构建页面

使用 adova-amis 后你会发现原来用 adonisjs 后端代码构建页面这么简单。

```
import Page from 'adova-amis/components/page'
import Button from 'adova-amis/components/button'

// 给页面设置标题
let page = Page.make().title('Weclome')

// 在页面上放置一个按钮
page.body(Button.make().label('Hello World').level('primary'))

// 在页面上放置多个按钮
page.body([
    Button.make().label('First Button').level('primary'),
    Button.make().label('Second Button').level('info').id('second')
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

# 内置部件

在 adova-amis 中内置了一些常用的部件，他们都放置在 `adova-amis/widgets` 目录，只需少量配置即可构建漂亮的页面。

```typescript
import render from 'adova-amis/render'
import Login from 'adova-amis/widgets/login'

let login = new Login({
  api: '/login',
  logo: '/logo.png',
  title: 'Welcome Back',
  captcha: '/captcha.png',
  rememberLabel: 'Remember me',
})

// 设置背景颜色
login.background({ color: '#FFFFFF' })

// 设置侧栏图片
login.side({ align: 'left', image: '/bgurl.png' })

// 渲染HTML页面
return render({
  title: 'Login', //HTML 页面标题
  schema: login, // amis json
  props: {}, // amis props
  env: {}, //amis env
})
```

<div align="center">
  <img src="https://github.com/tmkook/adova-amis/blob/main/docs/img/login-simple.jpg?raw=true" width="100%" alt="adova" />
</div>

<div align="center">
  <img src="https://github.com/tmkook/adova-amis/blob/main/docs/img/login-side.jpg?raw=true" width="100%" alt="adova" />
</div>