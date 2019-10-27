
const session = new Session();
var historyList = document.getElementById('historyList');


function createOrderHistoryList()
{




  var now = new Date;
  var nowString = now.toString();
  var nowSplit = nowString.split(":");
  var nowMins = nowSplit[1].charAt(0) + nowSplit[1].charAt(1);
  var currentUser = session.get('currentUser');
  var i;
  var datMins = now.getMinutes();
  var datMinsString = "";
  if(datMins<10){
    datMinsString = "0"+ datMins;
  }
  else{
    datMinsString = now.getMinutes();
  }


  var nowString2 = now.getDate() +"/" + now.getMonth() + "/" + now.getFullYear() +"-" + now.getHours() +":" + datMinsString;
  nowString2Split= nowString2.split(":");






  for(i = 0; i < currentUser.OrderHistory.length; i++)

  //Models.Order.Date
  {


    var dateString = currentUser.OrderHistory[i].Date;

    var dateList = dateString.split(":");
    //alert(dateList[0] +"\n"+dateList[1]+ "\n" + nowString2+ "\n" + now+ "\n" + nowSplit[0] + "\n" + nowSplit[1] + "\n" + nowMins);
    //if(currentUser.OrderHistory[i].Date)
    var newRow = document.createElement('tr');
    var orderNumColumn = document.createElement('td');
    var dateColumn = document.createElement('td');
    var timeColumn = document.createElement('td');
    var itemsColumn = document.createElement('td');
    var totalColumn = document.createElement('td');
    var completeOrder = document.createElement('td');
    var dateListHours = dateList[0].split("/");
    var dateTime = currentUser.OrderHistory[i].Date.split('-');
    dateColumn.innerHTML = dateTime[0];
    timeColumn.innerHTML = dateTime[1];
    orderNumColumn.innerHTML = i + 1;
    var j;
    var itemsList = document.createElement('ul');

    if( (nowString2Split[0]==dateList[0] && (datMinsString-dateList[1])<30)||(((now.getHours()-1)==dateListHours[2])&&(datMinsString-dateList[1])>30)){
    for(j = 0; j < currentUser.OrderHistory[i].Items.length; j++)
    {
      var listItem = document.createElement('li');
      listItem.innerHTML = currentUser.OrderHistory[i].Items[j].Quantity +"x " + currentUser.OrderHistory[i].Items[j].Size + " " + currentUser.OrderHistory[i].Items[j].Type;
      itemsList.appendChild(listItem);
    }
    if(currentUser.OrderHistory[i].Complete){
      //alert("enter the complete if statement");
      completeOrder.innerHTML = "Completed";
    }
    else{
      completeOrder.innerHTML = "<button type='Submit' onclick='completeOrder(" + i + ")''>Order Finished</button>"
    }






    itemsColumn.appendChild(itemsList);
    totalColumn.innerHTML = "$" + currentUser.OrderHistory[i].TotalPrice;
    newRow.appendChild(orderNumColumn);
    newRow.appendChild(dateColumn);
    newRow.appendChild(timeColumn);
    newRow.appendChild(itemsColumn);
    newRow.appendChild(totalColumn);
    newRow.appendChild(completeOrder);
    historyList.appendChild(newRow);
  }
  }

}

function completeOrder(num) {

  var currentUser = session.get('currentUser');
  //alert(currentUser+"order history is: "+ currentUser.OrderHistory[num].Complete);
  currentUser.OrderHistory[num].Complete = true;
  session.set("currentUser", currentUser);
  alert("Order Completed.");

  location.reload();
}
