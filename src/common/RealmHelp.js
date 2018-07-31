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
}
