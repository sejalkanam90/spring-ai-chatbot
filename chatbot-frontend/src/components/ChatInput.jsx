import { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSend, isLoading, isConnected }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading && isConnected) {
      onSend(input);
      setInput("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = async (e) => {
    const pastedText = e.clipboardData.getData("text");
    setInput((prev) => prev + pastedText);
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={
            isConnected
              ? "Type your message here... (Press Enter to send)"
              : "Waiting for backend connection..."
          }
          rows="1"
          disabled={isLoading || !isConnected}
          className="chat-textarea"
        />
        
        <div className="input-actions">
          {input.trim() && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={() => setInput("")}
              title="Clear input"
            >
              ✕
            </button>
          )}
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading || !isConnected}
            className={`send-btn ${!input.trim() || isLoading || !isConnected ? "disabled" : ""}`}
            title="Send message"
          >
            {isLoading ? (
              <div className="send-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="input-hints">
        <span>↵ Enter to send</span>
        <span>⇧ Shift + Enter for new line</span>
        <span>📋 Ctrl + V to paste</span>
      </div>
    </form>
  );
};

export default ChatInput;