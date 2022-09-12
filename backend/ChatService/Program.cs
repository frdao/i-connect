﻿using Azure;
using Azure.Communication;
using Azure.Communication.Chat;
using System;

namespace ChatService
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            // TESTING
            CreateChatThreadResult thread = await ChatThread.CreateChatThread(
                Constants.Player1.Id,
                Constants.Player1.Token
            );

            Console.WriteLine($"{thread}");
        }
            
    }
}