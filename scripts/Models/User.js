class User {
    createUser(name, password, email){
        const session = new Session();
        var users = session.get("allUsers");
        var newUser = {
            Name: name,
            Password: password,
            Email: email,
            Balance: 20.0,
            CoffeesBought: 0.0,
            OrderHistory: [],
        };
        if(users == null)
        {
            var users = {
                Users : [newUser]
            };
        }
        else
        {
            if(this.getUser(name) == null)
                users.Users.push(newUser);
        }
        session.set("allUsers", users);
        return newUser;
    }

    addUser(user)
    {
        const session = new Session();
        var users = session.get("allUsers");
        var existingUserIndex = -1;
        if(users == null)
        {
            console.log("allUsers not set");
            return null;
        }
        else
        {
            var i;
            for(i = 0; i < users.Users.length; i++)
            {
                if(users.Users[i].Name == user.Name)
                {
                    existingUserIndex = i;
                }
            }
        }

        if(existingUserIndex == -1)
        {
            users.Users.Push(user);
        }
        else
        {
            console.log("cui: "+existingUserIndex);
            console.log(users.Users[existingUserIndex]);
            users.Users[existingUserIndex] = user;
        }
        session.set("allUsers", users);
    }

    getUser(name)
    {
        const session = new Session();
        var users = session.get("allUsers");
        if(users == null)
        {
            console.log("allUsers not set");
            return null;
        }
        else
        {
            var i;
            for(i = 0; i < users.Users.length; i++)
            {
                if(users.Users[i].Name == name)
                {
                    return users.Users[i];
                }
            }
        }
    }

    updateUser(name, newUserObject)
    {
        const session = new Session();
        var users = session.get("allUsers");
        if(users == null)
        {
            console.log("allUsers not set");
            return null;
        }
        else
        {
            var i;
            for(i = 0; i < users.Users.length; i++)
            {
                if(users.Users[i].Name == name)
                {
                    users.Users[i] = newUserObject;
                    return;
                }
            }
        }
        var users = session.get("allUsers");
    }

    deleteUser(name)
    {
        const session = new Session();
        var users = session.get("allUsers");
        if(users == null)
        {
            console.log("allUsers not set");
            return null;
        }
        else
        {
            var i;
            for(i = 0; i < users.Users.length; i++)
            {
                if(users.Users[i].Name == name)
                {
                    users.Users.splice(i, 1);
                    return;
                }
            }
        }
        var users = session.get("allUsers");
    }
}
