const TypingIndicator = () => {
  return (
    <div className="message-group bot-group">
      <div className="message-wrapper bot-wrapper">
        <div className="avatar bot-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="message-content">
          <div className="message-bubble bot-bubble typing-bubble">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;