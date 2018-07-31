# 入门

## 安装

按照下面的安装说明来通过 npm 来安装 Realm JavaScript，或者在 [Github](https://github.com/realm/realm-js) 上查看源码

**先决条件**

- 确保你的环境可以开发 React Native 应用。如果没有请按照 [React Native instructions](https://facebook.github.io/react-native/docs/getting-started.html) 入门。
- Realm 是 iOS 和 Android 双平台兼容的。
- 支持 React Native 0.31.0 以上版本。

**下载**

- 创建一个新的 React Native 项目：

```bash
$ react-native init <project-name>
```

- 切换到项目目录下并添加 `realm` 依赖：

```bash
$ yarn add realm
```

- 下一步，链接你的项目到 `realm` 到原生 module

```bash
$ react-native link realm
# or rnpm link realm
```

::: warning Warning for Android
可能因为版本的原因，`react-native link` 可能生成一个不正确的配置，能够正确更新 Gradle（`android/settings.gradle`和`android/app/build.gradle`）,但是可能不会添加 Realm module。请确定 `react-native link` 已经添加了 Realm Module，如果没有的话请按照下面的步骤手动链接这个库。
:::

1. 添加下面的代码到 `android/settings.gradle`：

```js
include ':realm'
project(':realm').projectDir = new File(rootProject.projectDir, '../node_modules/realm/android')
```

2. 添加下面的代码到 `android/app/build.gradle`：

```js
dependencies {
  compile project(':realm')
}
```

3. 在 `MainApplication.java` 中导入并链接包

```java{8}
import io.realm.react.RealmReactPackage; // add this import

public class MainApplication extends Application implements ReactApplication {
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RealmReactPackage() // add this line
    );
  }
}
```

你现在已经准备好了。可以使用 realm 开始你的表演了，请用下面的代码替换 `App.js` 中的代码：

```js
import Realm from 'realm'
import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      realm: null,
    }
  }

  componentWillMount() {
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}],
    }).then((realm) => {
      realm.write(() => {
        realm.create('Dog', {name: 'Rex'})
      })
      this.setState({ realm })
    })
  }

  render() {
    const info = this.state.realm
      ? `Number of dogs in this Realm: ${this.state.realm.objects('Dog').length}`
      : 'Loading...'

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    color: 'red',
  },
})
```

## 介绍

Realm JavaScript使您能够以安全，持久和快速的方式高效地编写应用程序的模型层。它被设计来和 React Native 和 Node.js 一起工作。

**这是一个简单的例子：**

```js
import Realm from 'realm'

// 定义你的模型和它们的属性
const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
}
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    birthday: 'date',
    cars: 'Car[]',
    picture: 'data?' // 可选的属性
  }
}
Realm.open({
  schema: [CarSchema, PersonSchema]
}).then((realm) => {
  // 创建 Realm 对象并且写入到本地存储（local storage）
  realm.write(() => {
    const myCar = realm.create('Car', {
      make: '宝马',
      model: 'X3',
      miles: 1000,
    })
    myCar.miles += 20 // 更新一个属性值（实时）
  })

  // 查询 Realm 中 所有高里程的车辆
  const cars = realm.objects('Car').filtered('miles > 1000')

  // 将会返回一个对象，这个对象只有一辆车
  console.log(cars.length) // => 1

  // 添加另一辆车
  realm.write(() => {
    const myCar = realm.create('Car', {
      make: '宝马',
      model: 'X5',
      miles: 2000,
    })
  })
}).catch(error => {
  console.error(error)
})
```

### 示例

示例可以在 GitHub 找到： [realm-js repository](http://t.cn/RexLGDh)

> Note on Android：你需要下载 NDK并且设置正确的 `Android_NDK` 环境变量。

- macos：`export ANDROID_NDK=/usr/local/Cellar/android-ndk/r10e`
- windows: [NDK 环境搭建](https://github.com/youngjuning/issue-blog/issues/153)

### Realm Studio

[Realm Studio](https://realm.io/products/realm-studio/) 是我们的首选开发人员工具，可以轻松管理Realm数据库和Realm平台。使用 Realm Studio，你可以打开并且编辑本地和已同步的 Realms，并且管理任何 Realm Object Server 实例。它支持 Mac、Windows和Linux。

![Realm Studio](https://i.loli.net/2018/07/28/5b5c2a2b9ccd0.png)

- Mac：[Download for Mac](https://studio-releases.realm.io/latest/download/mac-dmg?_ga=2.193430958.2002032254.1532599846-1966751907.1532599846)
- Linux：[Download for Linux](https://studio-releases.realm.io/latest/download/linux-appimage?_ga=2.125249801.2002032254.1532599846-1966751907.1532599846)
- Windows：[Download for Linux](https://studio-releases.realm.io/latest/download/win-setup?_ga=2.125249801.2002032254.1532599846-1966751907.1532599846)

## 获取帮助

- 写代码遇到问题？ [Ask on StackOverflow](http://stackoverflow.com/questions/ask?tags=realm)。我们积极地在 SO 监控和回答问题
- 上报一个BUG？ [Open an issue on our repo](https://github.com/realm/realm-js/issues/new)。如果需要，请包含 Realm 的版本号，一个完整的日志， Realm 文件和一个能复现你问题的demo
- 有新功能需求？[Open an issue on our repo](https://github.com/realm/realm-js/issues/new)。告诉我们你想要的功能和为什么想要。

如果你正在使用一个 **crash reporter**（比如 Crashlytics 和 HockeyApp），确保开启了日志收集。当抛出一个异常并且发生不可恢复的情况时Realm 会记录元信息（不包括用户数据），并且这些信息能够在需要时帮你调试定位问题。

## Realms

### 打开 Realms

打开一个 Realm 只需要简单地执行 Realm 类的静态方法 `open`。你需要传递一个配置对象给 `open` 方法。我们在上面的例子中已经看到了一个包含 `schema` 的配置对象：

```js
// Get the default Realm with support for our objects
Realm.open({schema: [Car, Person]}).then((realm) => {
  // ...use the realm instance here
}).catch(error => {
  // Handle the error here if something went wrong
})
```

关于配置对象的详细信息请查看API索引 [Configuration](http://t.cn/RelKD6G)。除了 `schema` 以外，还有一些常见的属性：

- `path`：指定 [另一个Realm](http://t.cn/Rel9QKH) 的路径
- `migration`：一个 [migration function](http://t.cn/Rel9eUJ)
- `sync`：一个 [sync object](http://t.cn/RelCzNF)，用来同步打开一个带有 Object Server 的 Realm
- `inMemory`：Realm 将在内存中被打开，并且对象不是永久的。一旦最后一个 Realm 实例被关闭，所有的对象都会消失
- `deleteRealmIfMigrationNeeded`：当需要迁移时删除Realm。这在开发中很有用，因为数据模型可能经常变化
- `schemaVersion`：指定 schema 的版本

### 默认 Realm

你可能已经注意到先前的所有示例中都省略了 `path` 参数。这种情况下，会使用默认的 Realm path。你可以使用全局变量 `Realm.defaultPath` 来访问和改变默认的 Realm path。

### 打开一个同步的 Realm

打开一个同步的Realm和打开任何一个其他的Realm是一样的。如果你需要配置同步化，你可以给 [Configuration](http://t.cn/RelKD6G) 添加一个 `sync` 属性。 `sync` 的可选属性包括：

- `error`：一个处理和报告错误的回调
- `validate_ssl`：表明是否 SSL 证书必须被验证
- `ssl_trust_certificate_path`：一个查找可信任 SSL 证书的地址

错误处理的方式是在配置中注册一个回调函数：

```js
const Dog = {
  name: 'Dog',
  properties: {
    name: 'string'
  }
}
const config = {
  schema: [Dog],
  sync: {
    user: userA,
    url: realmUrl,
    error: err => {
      console.log(err)
    }
  }
}

const realm = Realm.open(config).then((realm) => {
  // ...use the realm instance here
}).catch(error => {
  // Handle the error here if something went wrong
})
```

### 其他 Realm

在不同的位置持有多个Realm是非常有用的。例如，你可能想要在主Realm之外打包应用的一些数据到 Realm 文件中。你可以在初始化你的 realm 时指定一个 `path` 参数。所有的 path 都是应用可写目录的相对路：

```js
// Open a realm at another path
Realm.open({
  path: 'anotherRealm.realm',
  schema: [CarSchema]
}).then(/* ... */)
```

### Schema 版本

打开一个 Realm 时另一个可用的选项是 `schemaVersion`。当省略时， `schemaVersion` 属性的值默认是 `0`。当初始化一个已经存在的Realm，并且这个它的 `schema` 和之前定义的不一样，你需要指定 `schemaVersion`。如果 `schema` 被更新并且没有指定 `schemaVersion`，会抛出一个异常。

```js
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string'
  }
}
// schemaVersion defaults to 0
Realm.open({schema: [PersonSchema]})
```

如果你过了一会秀了下操作：

```js
const UpdatedPersonSchema = {
  // schema name 相同，所以之前在Realm中的 `Person` 对象将被更新
  name: 'Person',
  properties: {
    name: 'string',
    dog: 'Dog' // new property
  }
}

// 这里会抛出错误，因为 shema 已经被更新了，但是 `schemaVersion` 没有指定
Realm.open({schema: [UpdatedPersonSchema]})

// 这里将会成功并且更新 Realm 到新版本
Realm.open({schema: [UpdatedPersonSchema], schemaVersion: 1})
```

如果你希望检索当前 schema 的版本，你可以使用 `Realm.schemaVersion` 方法：

```js
const currentVersion = Realm.schemaVersion(Realm.defaultPath);
```

### 同步打开 Realms

你可以通过简单地调用构造函数并传入一个配置对象给它来创建一个 realm 实例。通常不推荐这样做，因为它会阻塞并且可能是耗时的操作。特别是正在运行 [Migrations](http://t.cn/Rel9eUJ) 或者 realm 实例是 [synchronized](http://t.cn/RelCzNF)，并且你不希望在数据没有完全下载好之前冒险修改它。

如果你坚持这么做，语法很简单：

```js
const realm = new Realm({schema: [PersonSchema]})

// You can now access the realm instance.
realm.write(/* ... */)
```

::: warning
如果 Realm 的 [permissions](http://t.cn/Rel13kK) 是 `read-only`，那么你必须使用异步的API来打开它。使用上面的语法打开 `read-only` Realm 将会导致错误。
:::
