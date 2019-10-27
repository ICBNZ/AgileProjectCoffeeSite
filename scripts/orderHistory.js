const session = new Session();
var historyList = document.getElementById('historyList');

function createOrderHistoryList()
{
  var currentUser = session.get('currentUser');
  var i;
  for(i = 0; i < currentUser.OrderHistory.length; i++)
  {
    var newRow = document.createElement('tr');
    var orderNumColumn = document.createElement('td');
    var dateColumn = document.createElement('td');
    var timeColumn = document.createElement('td');
    var itemsColumn = document.createElement('td');
    var totalColumn = document.createElement('td');

    orderNumColumn.innerHTML = i + 1;
    var dateTime = currentUser.OrderHistory[i].Date.split('-');
    dateColumn.innerHTML = dateTime[0];
    timeColumn.innerHTML = dateTime[1];
    var j;
    var itemsList = document.createElement('ul');
    for(j = 0; j < currentUser.OrderHistory[i].Items.length; j++)
    {
      var listItem = document.createElement('li');
      listItem.innerHTML = currentUser.OrderHistory[i].Items[j].Quantity +"x " + currentUser.OrderHistory[i].Items[j].Size + " " + currentUser.OrderHistory[i].Items[j].Type;
      itemsList.appendChild(listItem);
    }
    itemsColumn.appendChild(itemsList);
    totalColumn.innerHTML = "$" + currentUser.OrderHistory[i].TotalPrice;
    newRow.appendChild(orderNumColumn);
    newRow.appendChild(dateColumn);
    newRow.appendChild(timeColumn);
    newRow.appendChild(itemsColumn);
    newRow.appendChild(totalColumn);
    historyList.appendChild(newRow);
  }
}
