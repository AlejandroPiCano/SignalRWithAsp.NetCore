
var connection = new signalR.HubConnectionBuilder().withUrl("/TodoItemHub").build();

document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var todoItem = document.getElementById("todoItemName");
    connection.invoke("SendTodoItem", todoItem.value).then(function () {
             todoItem.value = "";
        todoItem.focus();
    }).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("resetButton").addEventListener("click", function (event) {
    connection.invoke("ResetTodoItem").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});