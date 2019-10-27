const order = new Order();
const session = new Session();

/* coffee variables */
var withMilk = document.getElementById('milk');
var withSugar = document.getElementById('sugar');
var coffeeSize = document.getElementById('coffeeSize');
var coffeePriceLabel = document.getElementById('coffeePrice');
var coffeePrice = 0.0;
var coffeeQuantity = document.getElementById('quantity');

/* donut variables */
var donutPriceLabel = document.getElementById('donutPrice');
var donutQuantity = document.getElementById('donutQuantity');
var donutPrice = 0.0;

/* order variables */
var orderingCoffee = true;
var confirmOrderButton = document.getElementById('confirmOrder');
var orderList = document.getElementById('orderItems');
var totalCostLabel = document.getElementById('displayTotal');
var userBalance = document.getElementById('userBalance');

/* special variables */
var currentSpecial = "Free cookie with every 99 coffees purchased today only"
var specialSpan = document.getElementById('specialSpan');
var elem = document.getElementById("specialSpan");
var mediaSize = window.innerWidth;

var currentUser = session.get('currentUser');
var orderHistoryLength =  currentUser.OrderHistory.length;
var movingCount= 0;



specialSpan.innerHTML = currentSpecial;
function movingSpecial() {
  if (movingCount ==0 ){
    movingCount = 1;
    elem.style.position = "absolute";
    elem.style.left = 40 + "px";
    var pos = 0;
    if (id != null){
    clearInerval('id');
  }
  var id = setInterval(frame, 15);
   function frame() {
       pos++;
       elem.style.left = pos + "px";
       if (pos + (currentSpecial.length * 10) + 40 > mediaSize){
         pos=0;
       }
     }
   }

}

function validateQuantity(quantityElement)
{
  quantityElement.value = Math.round(quantityElement.value);
  quantityElement.value = Math.max(1,Math.round(quantityElement.value));
  if(orderingCoffee)
    updateCoffeePrice();
  else
    updateDonutPrice();
  totalCostLabel.innerHTML = "$" + order.getTotalPrice();
}

function pageSetup()
{
  setWelcome();
  updateOrderList();
  totalCostLabel.innerHTML = "$" + order.getTotalPrice();
  userBalance.innerHTML = "$" + session.get("currentUser").Balance;
  movingSpecial();
  console.log(elem);
}

function setWelcome()
{
    var welcomeMessage = document.getElementById("welcome");
    var currentUser = session.get("currentUser");
    if(currentUser != null)
    {
      welcomeMessage.innerHTML = "Welcome, " + session.get("currentUser").Name;
    }
}

function getSelectedCoffee()
{
  var coffeeSelections = document.getElementsByName('coffees');
  var i;
  for(i = 0; i < coffeeSelections.length; i++) {
      if(coffeeSelections[i].checked)
        return coffeeSelections[i].value;
  }
}

function getSelectedDonut()
{
  var donutSelections = document.getElementsByName('donuts');
  var i;
  for(i = 0; i < donutSelections.length; i++) {
      if(donutSelections[i].checked)
        return donutSelections[i].value;
  }
}

function updateCoffeePrice()
{
  if(coffeeSize.value == "Regular")
    coffeePrice = 4.5 * coffeeQuantity.value;
  else if(coffeeSize.value == "Small")
    coffeePrice = 3.0 * coffeeQuantity.value;
  coffeePriceLabel.innerHTML = "$" + coffeePrice;
}

function updateDonutPrice()
{
  if(getSelectedDonut()=="Plain donut")
    donutPrice = 2.5 * donutQuantity.value;
  else
    donutPrice = 3.5 * donutQuantity.value;
  donutPriceLabel.innerHTML = "$" + donutPrice;
}

function addCoffeeToCart()
{
  if(orderingCoffee)
  {
    if(getSelectedCoffee() == null)
    {
      alert("Please select a coffee");
      return;
    }
    if(coffeeSize.value == "")
    {
      alert("Please select a size");
      return;
    }
    var additions = [];
    if(withMilk.checked)
      additions.push(" milk");
    if(withSugar.checked)
      additions.push(" sugar");

    // add the coffee to the order and save its id
    var coffeeId = order.addCoffee(getSelectedCoffee(), coffeeSize.value, coffeePrice, additions, coffeeQuantity.value);
  }
  else // ordering donuts
  {
    if(getSelectedDonut() == null)
    {
      alert("Please select a donut");
      return;
    }

    // add the donut to the order and save its id
    var donutId = order.addCoffee(getSelectedDonut(), "", donutPrice, [], donutQuantity.value);
  }

  //update total price
  totalCostLabel.innerHTML = "$" + order.getTotalPrice();
  updateOrderList();
}

function cancelOrder()
{
  var blankOrder = {
                Date: "",
                TotalPrice: 0.0,
                Completed: false,
                Items: []
            };
  session.set('currentOrder', blankOrder);
  updateOrderList();
  totalCostLabel.innerHTML = "$" + order.getTotalPrice();
}

// Donut Selection
function switchToDonuts(){
  orderingCoffee = false;
  confirmOrderButton.innerHTML = "Confirm Order";
  confirmOrderButton.onload = "confirmOrder()";
  var addMoreBtn = document.getElementById("addMore");
  var donut1 = document.getElementById("donutSelection");
  var coffee1 = document.getElementById("coffeeSelection");
  var coffee2 = document.getElementById("coffeeSelection2");
  if (donut1.style.display === "block"){
    confirmOrder();
  }
  if (donut1.style.display === "none")
  {

  addMoreBtn.style.visibility = "visible";
  donut1.style.display = "block";
  coffee1.style.display = "none";
  coffee2.style.display = "none";
  }
}

// Add More coffee
$('#addMore').click(function(){
  orderingCoffee = true;
  confirmOrderButton.innerHTML = "Confirm Coffees";
  confirmOrderButton.onload = "switchToDonuts()";
 $('#donutSelection').hide();
 $('#coffeeSelection').show();
 $('#coffeeSelection2').show();
});

function confirmOrder()
{
  var currentOrder = session.get('currentOrder');
  var cost = order.getTotalPrice();
  var coffeeOrderNum = 0;
  var waitTime = 15;
  // Make sure order only if coffee in cart/ enough funds
  if(currentOrder.Items.length < 1)
  {
    alert("Please add some items to your cart");
    return;
  }
  else
  {
    if(order.confirmOrder())
    {
      userBalance.innerHTML = "$" + session.get("currentUser").Balance;
      var orderString = "";


      for(i = 0; i < currentOrder.Items.length; i++)
      {
        var el = document.createElement("div");
        var button = document.createElement("button");
        var additions = "";
        if(currentOrder.Items[i].Additions.length > 1)
        {
          additions = " with" + currentOrder.Items[i].Additions[0] + " and " + currentOrder.Items[i].Additions[1];
        }
        else if(currentOrder.Items[i].Additions.length > 0)
        {
          additions = " with  " + currentOrder.Items[i].Additions[0];
        }
        coffeeOrderNum = Number(coffeeOrderNum) + Number(currentOrder.Items[i].Quantity);
        orderString = orderString + currentOrder.Items[i].Quantity +" x " + currentOrder.Items[i].Size + " " + currentOrder.Items[i].Type + additions + "\n";

        if(coffeeOrderNum>10) {
          waitTime = 20;
        }
      }
      updateOrderList();
      orderHistoryLength = orderHistoryLength + 1;
      alert("You have ordered:\n" + orderString + "\nWait time:" + waitTime + " minutes" +"\nOrder Number: " + orderHistoryLength);

      location.reload();

      //location.replace("orderHistory.html");
    }
  }
}

function updateOrderList()
{
  var currentOrder = session.get('currentOrder');
  orderList.innerHTML = "";
  var i;
  for(i = 0; i < currentOrder.Items.length; i++)
  {
    var el = document.createElement("div");
    var button = document.createElement("button");
    el.className = "orderItem";
    var additions = "";
    if(currentOrder.Items[i].Additions.length > 1)
    {
      additions = "<br>with " + currentOrder.Items[i].Additions[0] + " and " + currentOrder.Items[i].Additions[1];
    }
    else if(currentOrder.Items[i].Additions.length > 0)
    {
      additions = "<br>with" + currentOrder.Items[i].Additions[0];
    }
    el.innerHTML = currentOrder.Items[i].Quantity +"x " + currentOrder.Items[i].Size + " " + currentOrder.Items[i].Type + additions;
    button.innerHTML = "X";
    button.id = currentOrder.Items[i].Id;
    button.addEventListener("click", function(){
      order.removeCoffeeById(this.id);
      updateOrderList();
      totalCostLabel.innerHTML = "$" + order.getTotalPrice();
    });
    el.appendChild(button);
    orderList.appendChild(el);
  }
}

// Specials
$('#anchor').click(function(){
  alert('You have triggered the special logic.')
});

$('#arrow').click(function(){
   $(this).css("display", "none");
   $('#special').css("display", "none");
   $('#specialsOpen').css("display", "inline");
});

$('#specialsOpen').click(function(){
   $(this).css("display", "none");
   $('#special').css("display", "block");
   $('#arrow').css("display", "block");
});
