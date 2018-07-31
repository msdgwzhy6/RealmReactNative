import Realm from 'realm'

export default class {
  static write = (schemas, callback) => {
    Realm.open({
      schema: schemas,
    }).then((realm) => {
      realm.write(() => {
        callback(realm)
      })
    })
  }

  static query = async (schemas, key, filters) => {
    let result = null
    await Realm.open({
      schema: schemas,
    }).then((realm) => {
      result = realm.objects(key).filtered(filters)
    })
    return result
  }
}
