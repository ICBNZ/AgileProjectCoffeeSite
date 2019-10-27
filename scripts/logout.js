function onLoad()
{
  const users = new User();
  const session = new Session();
  var currentUser = session.get("currentUser");
  if(currentUser != null)
  {
    var username = currentUser.Name;
    console.log(currentUser);
    users.addUser(currentUser);
    session.set("currentUser", {});
    console.log(users.getUser(username));
  }
};