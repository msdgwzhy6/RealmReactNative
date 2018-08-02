import Realm from 'realm'

/**
 * 数组比较
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 */
const equalArray = (arr1 = [], arr2 = []) => {
  const result = arr1.sort().toString() === arr2.sort().toString()
  return result
}

const init = (schema) => {
  if (!RealmHelp.reaml) {
    RealmHelp.realm = new Realm(schema)
  } else if (!equalArray(RealmHelp.realm.schema, schema)) {
    RealmHelp.realm.close()
    RealmHelp.realm = new Realm({schema})
  }
  return RealmHelp.realm
}

export default class RealmHelp {
  constructor(schema) {
    this.realm = init(schema)
  }

  static write = (config, callback) => {
    Realm.open(config).then((realm) => {
      realm.write(() => {
        callback(realm)
      })
    })
  }

  static query = async (config, key, filters) => {
    let result = null
    await Realm.open(config).then((realm) => {
      result = realm.objects(key).filtered(filters)
    })
    return result
  }
}
