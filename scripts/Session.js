// this is used to save json objects to the session storage
// initialise it first with:
//    const session = new Session();
// then save objects with:
//    session.set('key', {jsonProp1: value, jsonProp2: value});
// and get them back with:
//    var parsedJsonObject = session.get('key');

class Session extends Map {
  set(id, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(id, value);
  }

  get(id) {
    const value = sessionStorage.getItem(id);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
}