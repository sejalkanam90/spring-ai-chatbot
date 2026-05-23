import { useState, useEffect, useCallback, useRef } from "react";
import { sendMessage, checkBackendStatus } from "../services/api";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(0);

  const generateId = () => {
    messageIdRef.current += 1;
    return messageIdRef.current;
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addWelcomeMessage = useCallback(() => {
    const welcomeMsg = {
      id: generateId(),
      text: "Hello! 👋 I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, []);

  // Check backend connection on mount
  useEffect(() => {
    const init = async () => {
      const isConnected = await checkBackendStatus();
      setIsBackendConnected(isConnected);
      
      if (!isConnected) {
        setError("Cannot connect to backend server");
        setMessages([
          {
            id: generateId(),
            text: "⚠️ Connection Error: Unable to reach the backend server. Please make sure your Spring Boot application is running on http://localhost:8080",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } else {
        addWelcomeMessage();
        setError(null);
      }
    };
    init();
  }, [addWelcomeMessage]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send user message
  const sendUserMessage = useCallback(async (userInput) => {
    if (!userInput.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: generateId(),
      text: userInput.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(userInput.trim());

      const botMessage = {
        id: generateId(),
        text: response || "I received your message but couldn't generate a response.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: generateId(),
        text: `❌ Error: ${err.message || "Failed to get response from server"}`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(err.message);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    messageIdRef.current = 0;
    
    if (isBackendConnected) {
      addWelcomeMessage();
    } else {
      setMessages([
        {
          id: generateId(),
          text: "⚠️ Connection Error: Unable to reach the backend server.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isBackendConnected, addWelcomeMessage]);

  // Retry connection
  const retryConnection = useCallback(async () => {
    setError(null);
    const isConnected = await checkBackendStatus();
    setIsBackendConnected(isConnected);
    
    if (isConnected) {
      clearChat();
    } else {
      setError("Still unable to connect to backend. Make sure Spring Boot is running on port 8080.");
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: "⚠️ Still unable to connect. Please check if Spring Boot is running on port 8080",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [clearChat]);

  return {
    messages,
    isLoading,
    isBackendConnected,
    error,
    sendUserMessage,
    clearChat,
    retryConnection,
    messagesEndRef,
  };
};