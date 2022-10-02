using Microsoft.AspNetCore.SignalR;
using System.Net;

namespace SignalRWithAsp.NetCore.Hubs
{
    public class TodoItemHub: Hub
    {
        const string ReceiveTodoItemMethodName = "ReceiveTodoItem";
        const string ResetTodoItemMethodName = "ResetTodoItem";

        public static List<string> todoItemsInMemmory = new();

        public async Task SendTodoItem(string todoItemName)
        {
            todoItemsInMemmory.Add(todoItemName);

            await Clients.All.SendAsync(ReceiveTodoItemMethodName, todoItemName, todoItemsInMemmory.Count());
        }

        public async Task ResetTodoItem()
        {
            todoItemsInMemmory.Clear();

            await Clients.All.SendAsync(ResetTodoItemMethodName);
        }
    }
}
