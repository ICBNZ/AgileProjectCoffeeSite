
//the purpose here is to have a page where the user can top up to buy coffees on the site
const users = new User();
const session = new Session();
var currentUser = session.get('currentUser');

console.log(session.get('currentUser'));

function checkDetails(){
    var bankChoice;
    if (document.getElementById('b1').checked) {
      bankChoice = document.getElementById('b1').value;
    }
    if (document.getElementById('b2').checked) {
      bankChoice = document.getElementById('b2').value;
      }
    if (document.getElementById('b3').checked) {
        bankChoice = document.getElementById('b3').value;
      }
    if (document.getElementById('b4').checked) {
        bankChoice = document.getElementById('b4').value;
      }
  console.log(bankChoice);

  var bankDetails = document.getElementById("bankDetails").value;
  var bankCCV = document.getElementById("bankCCV").value;
  var bankDate = document.getElementById("bankDate").value;
  var numbers = /^[0-9]+$/;
  var today = new Date();

  //alert("today:"+today+"bankDate: "+ bank)
  if (!isNaN(Date.parse(bankDate))){
    }
  //alert("today:"+today+"bankDate: "+ bankDate);
  if (!isNaN(Date.parse(bankDate))){
  }
  else{
    alert("Please enter a valid expiry date.");
    return;
  }
  if (bankChoice != null && bankDetails.length == 16 &&
     bankDetails.match(numbers) && bankCCV.length == 3 &&
     bankCCV.match(numbers))
     {
        topupButton();
      }
    else{
      alert("Your bank details are not filled out correctly")
    }
}

function topupButton(){
  //gets the value of the typed into the field
  var amount = +document.getElementById("topupAmount").value;

  if (amount > 0)
  {
    //adds the value in the input to the balance
    currentUser.Balance += amount;
    var ssss = currentUser.Balance;
    console.log(ssss);
    //sets the value to the seession then using the seesion to set the value within the user
    var current = session.set('currentUser', currentUser);
    users.updateUser(current, 'currentUser');
    console.log(session.get('currentUser'));
    location.reload();
    alert("Thanks for topping up, your current balance is: " + ssss);
  }
  //catchs if the input isn't a valid number
  else
  {
    alert("You need to input a valid number larger than 0");
  }


}

