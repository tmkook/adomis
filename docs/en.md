# Introduction

`adova-amis` is an extension package for `adonisjs`. Before using it, please ensure that you know how to use the `adonisjs` framework. If you are familiar with `Laravel`, you can painlessly migrate to `adonisjs` and happily use the `adova-amis` extension, as their usage methods are almost identical.

# Installation

Step 1: Install the adonisjs framework and select the project type as prompted.

```
npm init adonisjs@latest demo
```

Step 2: Enter the `demo` directory and add the adova-amis extension package.

```
node ace add adova-amis
```

Step 3: Publish the front - end files (normally, manual publishing is not required because the `add` command has already published them automatically. Manual publishing is only needed after updating the version to update the front - end files).

```
node ace configure adova-amis
```

# Working Principle

All amis components are placed in the `adova-amis/components` directory. The calling method is the same as the `attribute name` in the `amis` component library attribute table, and the parameters correspond to the `attribute value`. You can find detailed information about the components in the [amis documentation](https://baidu.github.io/amis/en-US/components).

| Attribute Name | Type | Default Value | Description |
| :--------------- | :--------- | :---------: | :---------------------- |
| type | string | "container" | Specify as a container renderer |
| className | string |  | Class name of the outer Dom |
| bodyClassName | string |  | Class name of the container content area |
| wrapperComponent | string | "div" | Container tag name |
| style | object |  | Custom style |
| body | SchemaNode |  | Container content |

The above is an attribute table for the `Container` component. You can use the `make` method to create a component object and chain - call all the attributes in the `Container` component attribute table.

```typescript
import Container from 'adova-amis/components/container'
Container.make()
  .className('my-container')
  .bodyClassName('my-body')
  .style({ color: 'red' })
  .body('Hello World')

// Output: {type:'container', className:'my-container', bodyClassName:'my-body', style:{color:'red'}, body:'Hello World'}
```

# Basic Components

You can find almost all `amis` components in `adova-amis`. They all inherit from the `Schema` class and have the following common methods.

| Method Name | Parameter | Description |
| :---------- | :------ | :--------------: |
| make | None | Create a component instance |
| id | string | Set the component's id |
| find | string | Find a component by ID |
| type | string | Set the component's type |
| attr | string,any,string? | Set custom attributes |
| style | object | Set the component's style |
| className | string | Set the component's class name |
| definitions | object | Set the component's definitions |
| permission | boolean | Set the component's permission |
| onEvent | object | Set the component's events |
| remove | string? | Remove component attributes |

If you cannot find the component or attribute you need, you can use the `attr` method of the `Schema` class to set the attributes you need.

```
import Schema from 'adova-amis/components/schema'

// Set custom attributes
// Output: {myKey:['myValue']}
Schema.make().attr('myKey',['myValue'])

// Append a value to the end of the array
// Output: {myKey:['myValue','myValue2']}
Schema.make().attr('myKey','myValue2','push')

// Append a value to the beginning of the array
// Output: {myKey:['myValue3','myValue','myValue2']}
Schema.make().attr('myKey','myValue3','unshift')

// Replace the entire value of the key
// Output: {myKey:{test:1}}
Schema.make().attr('myKey',{test:1},'replace')

// Merge an object into the value of the key
// Output: {myKey:{test:1,test2:2}}
Schema.make().attr('myKey',{test2:2},'merge')
```

# Building Pages

After using adova-amis, you will find that building pages with adonisjs back - end code is so simple.

```
import Page from 'adova-amis/components/page'
import Button from 'adova-amis/components/button'

// Set the title of the page
let page = Page.make().title('Welcome')

// Place a button on the page
page.body(Button.make().label('Hello World').level('primary'))

// Place multiple buttons on the page
page.body([
    Button.make().label('First Button').level('primary'),
    Button.make().label('Second Button').level('info').id('second')
])

// Find a component
let second = page.find('second')

// Remove the level attribute of the component
second.remove('level')

// Remove the component
second.remove()

// Do not render the component
second.permission(false)
```

# Built - in Widgets

There are some commonly used widgets built into `adova-amis`. They are all placed in the `adova-amis/widgets` directory. You can build beautiful pages with just a small amount of configuration.

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

// Set the background color
login.background({ color: '#FFFFFF' })

// Set the sidebar image
login.side({ align: 'left', image: '/bgurl.png' })

// Render the HTML page
return render({
  title: 'Login', // HTML page title
  schema: login, // amis json
  props: {}, // amis props
  env: {}, // amis env
})
```

<div align="center">
  <img src="https://github.com/tmkook/adova-amis/blob/main/docs/img/login-simple.jpg?raw=true" width="100%" alt="adova" />
</div>

<div align="center">
  <img src="https://github.com/tmkook/adova-amis/blob/main/docs/img/login-side.jpg?raw=true" width="100%" alt="adova" />
</div>