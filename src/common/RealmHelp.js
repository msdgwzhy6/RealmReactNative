import Realm from 'realm'

export default class {
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
