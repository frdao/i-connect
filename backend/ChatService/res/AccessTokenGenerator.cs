using System;
using Azure;
using Azure.Core;
using Azure.Communication.Identity;
using Azure.Communication;
using Constants;

// TODO: Refactor all the functions to be asynch
public static class AccessTokenGenerator
{
    public static AuthenticatedUser CreateUserAndToken()
    {
        // Gets connectionstring from and environmental variable
        string? connectionString = Environment.GetEnvironmentVariable("CUSTOMCONNSTR_COMMUNICATION_SERVICES");
        if (connectionString is null) throw new NullReferenceException(nameof(connectionString));

        var client = new CommunicationIdentityClient(connectionString);

        // Issue an identity and an access token with the "Chat" scope for the new identity
        var identityAndTokenResponse = client.CreateUserAndToken(scopes: new[] { CommunicationTokenScope.Chat });



        AuthenticatedUser user = new AuthenticatedUser();
        user.UserId = identityAndTokenResponse.Value.User.Id;
        user.Token = identityAndTokenResponse.Value.AccessToken.Token;
        user.ExpiresOn = identityAndTokenResponse.Value.AccessToken.ExpiresOn;

        // Print the details to the screen
        Console.WriteLine($"\nCreated an identity with ID: {user.UserId}");
        Console.WriteLine($"\nIssued an access token with 'Chat' scope that expires at {user.ExpiresOn}:");
        Console.WriteLine(user.Token);

        return user;
    }
}