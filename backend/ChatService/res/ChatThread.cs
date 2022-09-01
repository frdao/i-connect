using Azure;
using Azure.Communication;
using Azure.Communication.Chat;

public static class ChatThread
{
    /// <summary>Creates a new thread with a user</summary>
    /// <param name="userID"> The id of the new User </param>
    /// <param name="token"> Token for the new User</param>
    /// <param name="topic">Topic for the chat thread</param>
    /// <param name="userName">Display name for the user in the thread</param>
    public static async Task<CreateChatThreadResult> CreateChatThread( 
        string userID,
        string token, 
        string topic = "Example Topic",
        string userName = "Default Danny")
    {
        ChatClient chatClient = CreateClient(Constants.Endpoints.CommunicationServiceEndoint, token);

        // Creates a chat participant for the new thread
        ChatParticipant chatParticipant = CreateUser(userID, userName);

        // Creates the new thread
        CreateChatThreadResult createChatThreadResult = await chatClient.CreateChatThreadAsync(
            topic: topic, 
            participants: new[] { chatParticipant }
        );
        return createChatThreadResult;
    }
    
    /// <summary>Creates a new ChatParticipant type which identifies a user in the chat</summary>
    /// <param name="ID"> The id of the new User </param>
    /// <param name="UserName"> Name of the user displayed in the chat </param>
    public static ChatParticipant CreateUser(string ID, string UserName)
    {
        var user = new CommunicationUserIdentifier(id: ID);
        return new ChatParticipant(user){DisplayName = UserName};
    }


    /// <summary>Creates a new chatclient</summary>
    /// <param name="endPoint"> endpoint for the Azure communication service </param>
    /// <param name="token"> token for the client </param>
    public static ChatClient CreateClient(string endPoint, string token)
    {
        // Azure Communication service endpoint
        Uri endpoint = new Uri(endPoint);

        CommunicationTokenCredential tokenCred = new CommunicationTokenCredential(token);
        return new ChatClient(endpoint, tokenCred);
    }

    // TODO: REITERATE THIS FUNCTION 
    public static AsyncPageable<ChatThreadItem> GetAllChatThreads(ChatClient chatClient, CreateChatThreadResult chatThreadResult)
    {
        // Get a single chat thread client?
        ChatThreadClient chatThreadClient = chatClient.GetChatThreadClient(threadId: chatThreadResult.ChatThread.Id);

        // Get all chat threads a user is a part of
        return chatClient.GetChatThreadsAsync();
    }

    /// <summary>
    /// Sends a message on the selected chat thread
    /// </summary>
    /// <param name="chatThreadClient">The thread you want to send a message to</param>
    /// <param name="message">Content of the message</param>
    public static async Task<SendChatMessageResult> SendChatMessage(ChatThreadClient chatThreadClient, string message = "No message:(")
    {
        SendChatMessageOptions sendChatMessageOptions = new SendChatMessageOptions()
        {
            Content = message,
            MessageType = ChatMessageType.Text
        };
        //sendChatMessageOptions.Metadata["hasAttachment"] = "true";
        //sendChatMessageOptions.Metadata["attachmentUrl"] = "https://contoso.com/files/attachment.docx";

        return await chatThreadClient.SendMessageAsync(sendChatMessageOptions);
    }

    /// <summary>
    /// Displays all chat messages from a thread in the console
    /// </summary>
    /// <param name="chatThreadClient">Thread to read all messages from</param>
    public static async void GetChatMessages(ChatThreadClient chatThreadClient)
    {
        AsyncPageable<ChatMessage> allMessages = chatThreadClient.GetMessagesAsync();
        await foreach (ChatMessage message in allMessages)
        {
            Console.WriteLine($"{message.Id}:{message.Content.Message}");
        }
    }

/// <summary>
/// Adds new users to an existing chat thread
/// </summary>
/// <param name="users">An array of users, where each user is represented as a touple with userID and userName</param>
/// <param name="chatThreadClient">Thread to add the users to</param>
    public static async void AddChatUsers((string userID, string userName)[] users, ChatThreadClient chatThreadClient)
    {
        ChatParticipant[] newUsers = new ChatParticipant[]{};
        foreach ((string userID,string userName) user in users)
        {
            ChatParticipant newUser = CreateUser(user.userID, user.userName);
            newUsers.Append(newUser);
        }
        await chatThreadClient.AddParticipantsAsync(participants: newUsers);
    }

    /// <summary>
    /// Gets all users in a chat thread and displays it in the console
    /// </summary>
    /// <param name="chatThreadClient">Thread to get all users from</param>
    public static async void GetThreadUsers(ChatThreadClient chatThreadClient)
    {
        AsyncPageable<ChatParticipant> allParticipants = chatThreadClient.GetParticipantsAsync();
        await foreach (ChatParticipant participant in allParticipants)
        {
            Console.WriteLine($"{((CommunicationUserIdentifier)participant.User).Id}:{participant.DisplayName}:{participant.ShareHistoryTime}");
        }
    }
}
