# Realm React Native 介绍

::: tip
Realm React Native 在 2016年2月 正式发布 - 自那以后我们发布了新的 feature 并做出了大量更新.在[这里](http://t.cn/ReIgZoP)查看最新版的文档
:::

今天在Facebook的React.js会议上，我们推出了专为React Native构建的新Realm移动数据库。它提供了简单的 **对象持久化** 和全部的查询功能。就表现来看，它比现存的可选方案通常快 **2到10倍**。

像其他 Realm 版本一样，它从头到尾就是为响应式app开发二而设计的，支持 [live objects](http://t.cn/ReIeFuh)、[change events](http://t.cn/ReID78k)和 [unidirectional-data-flow](http://t.cn/ReIDSMg)

**它大概长这样：**

```js
const Realm = require('realm') // 引入 Realm 类

class Person {} // 声明一个类
// 声明类的模式
Person.schema = {
  name: 'Person',
  primaryKey: 'name',
  properties: {
    name: 'string',
    age: {type: 'int', default: 0},
  },
};

// 根据类模式构造一个 Realm 类实例
const realm = new Realm({schema: [Person]})

// 查询
let people = realm.objects('Person', 'age >= 17')
people.length // => 0

// 写入
realm.write(() => {
  savedPerson = realm.create('Person', {
    name: 'Hal Incandenza',
    age: 17,
  });
});

// 查询结果实时被更新
people.length // => 1
```

**Realm** 是一个专为移动APP开发而构建的数据库，它直接运行在 手机、平台电脑或者可穿戴式设备内部。我们在2014年推出了 Java、Objective-C和 Swift版本，现在已经被 APP 有数以亿计的设备正在使用 **Realm**。包括 Starbucks, Cisco, Walmart, Google, Amazon, & eBay 在内的很多公司都在使用。

今天，我们发布了 React Native 版本，Facebook 的这一个 JavaScript 框架让开发者可以写 JS 代码然后变成 原生的 iOS 和 Android apps。（注意：Realm 支持 React Native，并不是 web 框架 React。我们 **all in** 移动端！）

像你期待的那样，**Realm React Native** 带来了现代的、简单的设计，并且允许你写一份代码运行在 iOS 和 Android 两个平台。

## Realm 是什么

Realm 并不是 ORM(对象关系映射)，并且不是建立在 SQLite 之上的。相反，我们为移动应用开发者构建了一个完整的数据库。该数据库使用动态映射到完整的、自定义的数据库引擎的原生JavaScript对象（并不是简单的键值对存储）。这是我们能够在保证性能的同时提供简单的API。使用Realm，你可以建模复杂的数据，链接图形中的对象以及编写高级查询。

**Models & Writes**

```js
class Dog {} // 声明一个类
// 声明类的模式
Dog.schema = {
  name: 'Dog',
  properties: {
    name: 'string',
    age: 'int',
  }
}
// 根据类模式创建realm类实例对象
let realm = new Realm({scheme: [Dog]})
// 写入
realm.write(() => {
  realm.create('Dog',{ name: 'Rex', age: 3})
})
```

**Queries：**

```js
// 基础查询
let r = realm.objects('Dog').filtered('age < 8');
// 查询是可以链接的
let r2 = r.filtered('name contains "Rex"')
r2.length // => 1

realm.write(() => {
  realm.create('Dog', { name: 'Rex Maximus', age: 4 })
})

// 查询是可以实时更新的
r2.length // => 2
```

**Relationships：**

```js
class Person {} // 声明一个类
// 声明类的模式
Person.schema = {
  name: 'string',
  dogs: { type: 'list', objectType: 'Dog' },
}

let realm = new Realm({schema: [Dog, Person]})

realm.write(() => {
  let person = realm.create('Person', {
    name: 'Tim',
    dogs: [{name: 'rex', age: 3}]
  })
})
```

::: tip
你可以在 [ReactExample](http://t.cn/ReIFcE5) 中查看更多关于如何使用这些 API 的例子
:::

::: warning 未完待续...
英文链接：[introducing-realm-react-native](https://realm.io/blog/introducing-realm-react-native/)
:::
