using Azure;
using Azure.Communication;
using Azure.Communication.Chat;
using System;

namespace ChatService
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            // Azure Communication service endpoint
            Uri endpoint = new Uri(Constants.Endpoints.CommunicationServiceEndoint);

            CommunicationTokenCredential communicationTokenCredential = new CommunicationTokenCredential(Constants.Player1.Token);
            ChatClient chatClient = new ChatClient(endpoint, communicationTokenCredential);

            // Start a chat thread
            var chatParticipant = new ChatParticipant(identifier: new CommunicationUserIdentifier(id: Constants.Player1.Id))
            {
                DisplayName = "UserDisplayName"
            };
            CreateChatThreadResult createChatThreadResult = await chatClient.CreateChatThreadAsync(topic: "Hello world!", participants: new[] { chatParticipant });

            // Get a chat thread client
            ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: createChatThreadResult.ChatThread.Id);
            string threadId = chatThreadClient.Id;

            // Get all chat threads a user is a part of
            AsyncPageable<ChatThreadItem> chatThreadItems = chatClient.GetChatThreadsAsync();
            await foreach (ChatThreadItem chatThreadItem in chatThreadItems)
            {
                Console.WriteLine($"{ chatThreadItem.Id}");
            }

            // Send a chat message
            SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
            {
                Content = "Please take a look at the attachment",
                MessageType = ChatMessageType.Text
            };
            sendChatMessageOptions.Metadata["hasAttachment"] = "true";
            sendChatMessageOptions.Metadata["attachmentUrl"] = "https://contoso.com/files/attachment.docx";

            SendChatMessageResult sendChatMessageResult = await chatThreadClient.SendMessageAsync(sendChatMessageOptions);
            string messageId = sendChatMessageResult.Id;

            // Receive chat messages
            AsyncPageable<ChatMessage> allMessages = chatThreadClient.GetMessagesAsync();
            await foreach (ChatMessage message in allMessages)
            {
                Console.WriteLine($"{message.Id}:{message.Content.Message}");
            }

            // Add users as a participant to the chat thread>
            var josh = new CommunicationUserIdentifier(id: Constants.Player2.Id);
            var gloria = new CommunicationUserIdentifier(id: Constants.Player3.Id);

            var participants = new[]
            {
                new ChatParticipant(josh) { DisplayName = "Josh" },
                new ChatParticipant(gloria) { DisplayName = "Gloria" }
            };
            await chatThreadClient.AddParticipantsAsync(participants: participants);

            // Get thread participants
            AsyncPageable<ChatParticipant> allParticipants = chatThreadClient.GetParticipantsAsync();
            await foreach (ChatParticipant participant in allParticipants)
            {
                Console.WriteLine($"{((CommunicationUserIdentifier)participant.User).Id}:{participant.DisplayName}:{participant.ShareHistoryTime}");
            }

            // Send read receipt
            await chatThreadClient.SendReadReceiptAsync(messageId: messageId);
        }
    }
}