export interface ChatClient {
  // TODO: Create some abstractions for chat client and messages
  sendMessage(channelId: bigint, message: string): Promise<bigint>;
}
