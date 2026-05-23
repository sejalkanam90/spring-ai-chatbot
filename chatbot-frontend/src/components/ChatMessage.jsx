import { useState } from "react";

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === "bot";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-group ${isBot ? "bot-group" : "user-group"}`}>
      <div className={`message-wrapper ${isBot ? "bot-wrapper" : "user-wrapper"}`}>
        {/* Avatar */}
        <div className={`avatar ${isBot ? "bot-avatar" : "user-avatar"}`}>
          {isBot ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>

        {/* Message Content */}
        <div className="message-content">
          <div className={`message-bubble ${isBot ? "bot-bubble" : "user-bubble"}`}>
            <p className="message-text">{message.text}</p>
            {message.status === "error" && (
              <span className="error-icon">⚠️</span>
            )}
          </div>
          
          {/* Message Footer */}
          <div className="message-footer">
            <span className="message-time">{time}</span>
            {!isBot && message.status === "sent" && (
              <span className="message-status">✓ Sent</span>
            )}
            {isBot && (
              <button className="copy-btn" onClick={copyToClipboard} title="Copy message">
                {copied ? (
                  <span>✓ Copied!</span>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;