class Order {

/**
Dependencies: this.session
Example Order:
    currentOrder = {
        Date: "13-08-19 13:17",
        TotalPrice: 7.5,
        Completed: false,
        Items: [
            {
                Id: 1,
                Type: "Black",
                Size: "Regular",
                Price: 4.5,
                Additions: []
            },
            {
                Id: 2,
                Type: "Hot Chocolate",
                Size: "Small",
                Price: 3.0,
                Additions: ["With Sugar", "With Milk"]
            }
        ]
    };
**/
    constructor()
    {
        this.session = new Session();
        var currentOrder = this.session.get("currentOrder");
        if(currentOrder == null)
        {
            currentOrder = {
                Date: "",
                TotalPrice: 0.0,
                Completed: false,
                Items: []
            };
            this.session.set("currentOrder", currentOrder);
        }
    }

    getTotalPrice()
    {
        var currentOrder = this.session.get("currentOrder");
        var i;
        var totalPrice = 0.0;
        if(currentOrder.Items.length == 0)
        {
            return totalPrice;
        }
        else
        {
            for(i = 0; i < currentOrder.Items.length; i++)
            {
                totalPrice = totalPrice + currentOrder.Items[i].Price;
            }
            return totalPrice;
        }
    }

    getTotalCoffees()
    {
        var currentOrder = this.session.get("currentOrder");
        var i;
        var totalCoffees = 0;
        if(currentOrder.Items.length == 0)
        {
            return totalCoffees;
        }
        else
        {
            for(i = 0; i < currentOrder.Items.length; i++)
            {
                var itemType = currentOrder.Items[i].Type;
                if(itemType != "Plain doughnut" && itemType != "Strawberry doughnut" && itemType != "Chocolate doughnut")
                    totalCoffees = totalCoffees + Number(currentOrder.Items[i].Quantity);
            }
            return totalCoffees;
        }
    }

    // order.addCoffee("Black", "Regular", 4.5, ["With Sugar","With Milk"], 1);
    addCoffee(type, size, price, additions, quantity)
    {
        var currentOrder = this.session.get("currentOrder");
        var newCoffee = {
            Id: 0,
            Type: type,
            Size: size,
            Price: price,
            Additions: additions,
            Quantity: quantity
        };
        newCoffee.Id = currentOrder.Items.length + 1;
        currentOrder.Items.push(newCoffee);
        this.session.set("currentOrder", currentOrder);
        return newCoffee.Id;
    }

    confirmOrder()
    {
        var currentOrder = this.session.get("currentOrder");
        var currentUser = this.session.get("currentUser");
        if(this.getTotalPrice() > currentUser.Balance)
        {
            alert("Not enough funds to make this purchase");
            return false;
        }
        else
        {
            currentUser.Balance = currentUser.Balance - this.getTotalPrice();
            currentUser.CoffeesBought = +currentUser.CoffeesBought + +this.getTotalCoffees();
            var date = new Date();
            var minutes = date.getMinutes();
            if(minutes.length == 1)
            {
                minutes = "0" + minutes;
              }
            var dateString = date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear() +"-" + date.getHours() +":" + minutes;
            currentOrder.Date = dateString;
            currentOrder.TotalPrice = this.getTotalPrice();
            currentUser.OrderHistory.push(currentOrder);
            currentOrder = {
                    Date: "",
                    TotalPrice: 0.0,
                    Completed: false,
                    Items: []
                };
            this.session.set("currentUser", currentUser);
            this.session.set("currentOrder", currentOrder);
            return true;
        }
    }

    getCoffeeById(id)
    {
        var currentOrder = this.session.get("currentOrder");
        var i;
        for(i = 0; i < currentOrder.Items.length; i++)
        {
            if(currentOrder.Items[i].Id == id)
            {
                return currentOrder.Items[i];
            }
        }
    }

    removeCoffeeById(id)
    {
        var currentOrder = this.session.get("currentOrder");
        var i;
        for(i = 0; i < currentOrder.Items.length; i++)
        {
            if(currentOrder.Items[i].Id == id)
            {
                currentOrder.Items[i] = currentOrder.Items[currentOrder.Items.length-1];
                currentOrder.Items.pop();
                this.session.set("currentOrder",currentOrder);
            }
        }
    }
}
