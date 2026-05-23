const Header = ({ isConnected, onClearChat, onRetry, messageCount }) => {
  return (
    <header className="chat-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                fill="currentColor"
              />
              <circle cx="8" cy="10" r="2" fill="white" />
              <circle cx="12" cy="10" r="2" fill="white" />
              <circle cx="16" cy="10" r="2" fill="white" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>AI Chat Assistant</h1>
            <p>Powered by Spring Boot AI</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className={`connection-status ${isConnected ? "connected" : "disconnected"}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {!isConnected && (
          <button className="retry-btn" onClick={onRetry}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                fill="currentColor"
              />
            </svg>
            Retry
          </button>
        )}

        {messageCount > 0 && (
          <button className="clear-btn" onClick={onClearChat} title="Clear chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                fill="currentColor"
              />
            </svg>
            Clear
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;