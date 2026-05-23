import { useChat } from "../hooks/useChat";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";
import TypingIndicator from "../components/TypingIndicator";

const ChatPage = () => {
  const {
    messages,
    isLoading,
    isBackendConnected,
    error,
    sendUserMessage,
    clearChat,
    retryConnection,
    messagesEndRef,
  } = useChat();

  return (
    <div className="chat-app">
      <div className="chat-container">
        <Header
          isConnected={isBackendConnected}
          onClearChat={clearChat}
          onRetry={retryConnection}
          messageCount={messages.length}
        />

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={retryConnection}>Try Again</button>
          </div>
        )}

        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput
          onSend={sendUserMessage}
          isLoading={isLoading}
          isConnected={isBackendConnected}
        />
      </div>
    </div>
  );
};

export default ChatPage;