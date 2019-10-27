const session = new Session();
var currentUser = session.get('currentUser');

console.log(session.get('currentUser'));

function getInfo(){
  var nameMessage = document.getElementById("userName");
  var coffeesBoughtMessage = document.getElementById('coffeesBought');
  var freeCoffeesMessage = document.getElementById('freeCoffees');
  var balanceMessage = document.getElementById('balance');
  var loyaltyDiv = document.getElementById('loyaltyDiv');

  //nameMessage.innerHTML = "User: " + currentUser.Name;
  balanceMessage.innerHTML = "Remaining Balance: $" + currentUser.Balance;

  var coffeesLeft = +currentUser.CoffeesBought % 10;
  var freeCoffees = (+currentUser.CoffeesBought - (coffeesLeft)) / 10;

  coffeesBoughtMessage.innerHTML = (10 - coffeesLeft)
  + " coffees until your next free coffee!";
  freeCoffeesMessage.innerHTML = "Free coffees available: "+ freeCoffees;

  var i;
  loyaltyDiv.innerHTML = "";
  for(i = 0; i < 10; i++)
  {
    var loyaltySquare = document.createElement('div');
    loyaltySquare.id = "loyaltySquare";
    if(i < coffeesLeft)
      loyaltySquare.className = "filled";
    else
      loyaltySquare.className = "empty";
    loyaltyDiv.appendChild(loyaltySquare);
  }
}
