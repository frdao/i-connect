using System;
using Azure;
using Azure.Core;
using Azure.Communication.Identity;

public static class AccessTokenGenerator
{
    static async public Task<CommunicationUserIdentifierAndToken> CreateUserAndToken() 
    {
        Console.WriteLine("Azure Communication Services - Access Tokens Generator");

        // Gets connectionstring from and environmental variable
        string? connectionString = Environment.GetEnvironmentVariable("CUSTOMCONNSTR_COMMUNICATION_SERVICES");
        if(connectionString is null) throw new NullReferenceException(nameof(connectionString));

        var client = new CommunicationIdentityClient(connectionString);

        // Issue an identity and an access token with the "Chat" scope for the new identity
        var identityAndTokenResponse = await client.CreateUserAndTokenAsync(scopes: new[] { CommunicationTokenScope.Chat });


        // Retrieve the identity, token, and expiration date from the response
        var identity = identityAndTokenResponse.Value.User;
        var token = identityAndTokenResponse.Value.AccessToken.Token;
        var expiresOn = identityAndTokenResponse.Value.AccessToken.ExpiresOn;

        // Print the details to the screen
        Console.WriteLine($"\nCreated an identity with ID: {identity.Id}");
        Console.WriteLine($"\nIssued an access token with 'Chat' scope that expires at {expiresOn}:");
        Console.WriteLine(token);
        return identityAndTokenResponse;
    }
}