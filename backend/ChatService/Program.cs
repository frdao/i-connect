using Azure;
using Azure.Communication;
using Azure.Communication.Chat;
using System;
using Constants;

namespace ChatService
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            AuthenticatedUser user = AccessTokenGenerator.CreateUserAndToken();

            // TESTING
            ChatClient chatClient = ChatThread.CreateClient(Constants.Endpoints.CommunicationServiceEndoint, user.Token);
            CreateChatThreadResult thread = await ChatThread.CreateChatThread(
                chatClient,
                user.UserId,
                user.Token
            );
            ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: thread.ChatThread.Id);

            var message1 = await ChatThread.SendChatMessage(chatThreadClient, "First message");
            var message2 = await ChatThread.SendChatMessage(chatThreadClient, "second message");

            ChatThread.GetChatMessages(chatThreadClient);
        }
            
    }
}