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

## 模型

Realm 数据模型由初始化期间传递到 Realm 的 schema 信息所定义。一个对象的 schema 由 `name` 和一些属性组成。要么每一个属性都有一个 `name`，并由一个包含属性类型的字符串描述。要么是一个包含 `name`,`type`,`objectType`,`optional`,`default` 和 `indexed` 字段的对象。

```js
const Realm = require('realm');

const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     'Car[]'
    picture:  'data?', // 可选的属性
  }
};

// Initialize a Realm with Car and Person models
Realm.open({schema: [CarSchema, PersonSchema]}).then(realm => {
  // ... use the realm instance to read and modify data
})
```

### 类

::: tip
在这里，通过类来定义模型是被限制的。 它在 React Native 环境下下可以工作，但是在 Node 环境不行。
:::

如果你想要使用 ES2015 类（并且可能希望继承已经存在的特性），你只需要在构造器中定义 schema：

```js
class Person {
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
Person.schema = {
  name: 'Person',
  properties: {
    firstName: 'string',
    lastName: 'string'
  }
}
```

你现在可以把类本身传递给 open configuration 的 `shema` 属性：

```js
Realm.open({schema: [Person]}).then(/* ... */)
```

你可以一如既往地访问属性：

```js
realm.write(() => {
  const john = realm.create('Person', {
    firstName: 'John',
    lastName: 'Smith'
  });
  john.lastName = 'Peterson';
  console.log(john.fullName); // -> 'John Peterson'
})
```

### 支持的类型

Reamlm 支持一下基本的类型： `bool`，`int`，`float`，`double`，`string`，`data` 和 `date`。

- `bool` 相当于 JavaScript的 `boolean` 类型
- `int`，`float` 和 `double` 属性相当于 JavaScript 的 `number` 类型。`int` 和 `double` 被存储为64位， `float` 被存储为32位
- `string` 属性相当于 JavaScript 的 `string` 类型
- `data` 属性相当于 JavaScript 的 `ArrayBuffer` 类型
- `date` 属性相当于 JavaScript 的 `date` 类型

当简写一个基本属性时，你可以只指定类型：

```js
const CarSchema = {
  name: 'Car',
  properties: {
    // The following property types are equivalent
    make:   {type: 'string'},
    model: 'string',
  }
}
```

#### 可选的属性

默认地，基本类型不是必需的并且不能存储 `null` 和 `undefined`。在你定义属性时，属性可以通过指定一个 `optional` 代号变成可选的。或者使用简写符号：给类型名追加一个 `?`：

```js
const PersonSchema = {
  name: 'Person',
  properties: {
    realName:    'string', // 必需属性
    displayName: 'string?', // 可选属性
    birthday:    {type: 'date', optional: true}, // 可选属性
  }
};

let realm = new Realm({schema: [PersonSchema, CarSchema]})

realm.write(() => {
  // 可选属性在创建的时候可以被设置为 null 或 undefined
  let charlie = realm.create('Person', {
    realName: 'Charlie',
    displayName: null, // 也可以完全被省略
    birthday: new Date(1995, 11, 25),
  });

  // 可以属性可以被设置为 null、undefined，或者被设置为一个新的非空值
  charlie.birthday = undefined
  charlie.displayName = 'Charles'

  // 设置一个非可选的属性为null将抛出类型错误
  // charlie.realName = null
});
```

#### 列表属性

除了存储单独的值，属性也可以被声明为一个包含任何支持的基本类型的列表。只需要给类型名追加 `[]`：

```js
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    testScores: 'double?[]'
  }
}

Realm.open({
  schema: [PersonSchema, CarSchema]
}).then((realm) => {
  realm.write(() => {
    let charlie = realm.create('Person',{
      name: 'Charlie',
      testScores: [100.0]
    })
    // Charlie 在第二次测试时缺考了，所以允许跳过
    charlie.testScores.push(null)

    // 之后第三次考试成绩不理想
    charlie.testScores.push(70.0)
  })
})
```

当访问列表属性会返回一个 `List` 对象。 `List` 对象的方法和 JavaScript 的数组方法非常像。最大的不同是任何改变都会被持久化到底层的 Realm，并且它们只能在 write 操作中被修改。另外， `List` 对象是从基础对象中获取的，你只能通过访问用该属性的对象访问，而不能手动创建。

虽然list属性中的值可以是可选的，但list属性本身不能。给 list 属性指定 `optional` 将会把 list 中的值变成可选的

### 关系

#### 一对一

对于一对一关系，你可以将指定的对象的模式的 `name`作为属性的类型：

```js
const PersonSchema = {
  name: 'Person',
  properties: {
    // 下面的属性定义是等价的
    car: {type: 'Car'},
    van: 'Car',
  }
}
```

当使用对象属性时，你需要确保所有引用的类型存在于用于打开 Realm 的模式中：

```js
// 尽管 PersonSchema 中包含属性类型 `Car`， CarSchemas 还是必需的
Realm.open({schema: [CarSchema, PersonSchema]}).then(/* ... */)
```

访问对象属性时，可以使用常规属性语法访问嵌套属性：

```js
realm.write(() => {
  const nameString = person.car.name
  person.car.miles = 1100

  // 创建一个新的 Car
  person.van = {make: 'Ford', model: 'Transit'}

  // 设置两个属性为相同的汽车实例
  person.car = person.van
});
```

在Realm中对象属性总是可选的，不需要明确指定，并且不能被设置为必需的。


#### 一对多

与基本属性一样，你也可以使用对象列表来形成多对多关系：

```js
const PersonSchema = {
  name: 'Person',
  properties: {
    cars: {type: 'list', objectType: 'Car'},
    vans: 'Car[]'
  }
}

let carList = person.cars

// Add new cars to the list
realm.write(() => {
  // 列表必须要在 write 事务中处理
  carList.push({make: 'Honda', model: 'Accord', miles: 100});
  carList.push({make: 'Toyota', model: 'Prius', miles: 200});
});

let secondCar = carList[1].model;  // 通过数组下标访问
```

与其他列表和一对一关系不同，多对多关系不能是可选的。

#### 反向关系

::: warning 暂未翻译
[https://realm.io/docs/javascript/latest#to-many-relationships](https://realm.io/docs/javascript/latest#to-many-relationships)
:::

### 默认属性值

默认属性值可以在属性定义时通过 `default` 代号指定。要使用默认值，请在对象创建期间保留未指定的属性。

```js
const CarSchema = {
  name: 'Car',
  properties: {
    make:  {type: 'string'},
    model: {type: 'string'},
    drive: {type: 'string', default: 'fwd'},
    miles: {type: 'int',    default: 0}
  }
};

realm.write(() => {
  // 因为省略了 `miles` 因此默认为 `0`
  // 因为 `drive` 被指定, 所以会重写默认值
  realm.create('Car', {make: 'Honda', model: 'Accord', drive: 'awd'});
});
```

### 索引属性

你可以给属性添加 `indexed` 代号来使它可以被索引。这个操作被 `int`、`string`、`bool` 和 `date` 属性支持：

```js
var BookSchema = {
  name: 'Book',
  properties: {
    name: { type: 'string', indexed: true },
    price: 'float'
  }
}
```

当以较慢的插入为大家比较属性相等性时，索引属性将大大加快查询，

### 主键

你可以再 对象模型中给 `string`、`int` 类型的属性指定 `primaryKey` 属性。声明主键可以有效地查找和更新对象，并为每个值强制实现唯一性。一旦一个带有主键的对象被添加到 Realm，主键就不能被改变了。

```js
const BookSchema = {
  name: 'Book',
  primaryKey: 'id',
  properties: {
    id: 'int', // 主键
    title: 'string',
    price: 'float'
  }
}
```

主键属性自动被索引

## 故障排除

### Missing Realm Constructor

如果你的 app 崩溃了，并且告诉你 `Realm constructor was not found`,你可以试试下面的方法

首先执行 `react-native link realm`，如果还是没有帮助，那么你的问题是因为安卓，试试：

把 `java import io.realm.react.RealmReactPackage;` 加入你的 `MainApplication.java` 文件

添加 `RealmReactPackage` 到包列表中：

```java
protected List getPackages() {
  return Arrays.asList(
    new MainReactPackage(),
    new RealmReactPackage() // add this line
  );
}
```

把下面的两行加到 `settings.gradle`：

```js
include ':realm'
project(':realm').projectDir = new File(settingsDir, '../node_modules/realm/android')
```

如果你的问题是IOS，那么试试：

1. 关闭所有模拟器/设备构建
2. 停止在终端中运行的程序包管理器（或者更好的是，只需重新启动终端）
3. 在查找程序中打开应用程序根目录中的ios文件夹。
4. 进入构建文件夹（注意：你不会在atom中看到这个构建文件夹，所以只需右键单击ios并在finder中单击open）
5. 删除构建文件夹内的所有内容（只需移动到垃圾箱并保留垃圾）
6. 运行 `react-native run-ios` 重新构建

### Cannot download realm-sync-cocoa

我们已经看到一些报告，由于下载问题，用户无法构建他们的应用程序。症状是您看到类似的错误消息 `Error: unexpected end of file at Zlib.zlibOnError [as onerror] (zlib.js:142:17) errno: -5, code: 'Z_BUF_ERROR' }.`

可以手动下载所需的文件，然后构建应用程序。步骤是：

1. 找到您的项目目录，然后找到 `node_modules/realm/vendor/realm-ios`。它会是空的。
2. 使用以下命令创建文件 `download-realm.lock` : `echo SYNC_SERVER_FOLDER=sync SYNC_ARCHIVE=realm-sync-cocoa-3.7.0.tar.gz SYNC_ARCHIVE_ROOT=core > download-realm.lock`。版本号（此处为3.7.0）必须与更改日志中的Realm Sync版本匹配。
3. 找到下载的文件`realm-sync-cocoa-3.7.0.tar.gz`， 执行命令 `tar -xzvf realm-sync-cocoa-3.7.0.tar.gz -C yourProjectDirectory/node_modules/realm/vendor/realm-ios`.
4. 你会发现该目录不再是空的。复制目录下的所有文件core并将其粘贴到目录下 `yourProjectDirectory/node_modules/realm/vendor/realm-ios`.

### 崩溃报告

我们鼓励您在应用程序中使用崩溃报告器。许多Realm操作可能在运行时失败（与任何其他磁盘IO一样），因此从应用程序收集崩溃报告将有助于确定您（或我们）可以改进错误处理和修复崩溃错误的区域。

大多数商业崩溃记者都可以选择收集日志。我们强烈建议您启用此功能。在抛出异常和不可恢复的情况时，Realm会记录元数据信息（但没有用户数据），这些消息可以在出现问题时帮助调试。
