export interface ChatClient {
  // TODO: Create some abstractions for chat client and messages
  sendMessage(channelId: string, message: string): Promise<string>;
}
