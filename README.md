# 🤖 Spring AI Chatbot

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen)
![Java](https://img.shields.io/badge/Java-17-red)
![Groq](https://img.shields.io/badge/Groq-API-blue)
![Llama](https://img.shields.io/badge/Llama-3.1-orange)

## 📖 About Project

AI-powered Chatbot built with **Spring Boot** and **Groq API** using **Llama 3.1** model.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 AI Conversations | Real-time chat with Llama 3.1 |
| 🧠 Context Memory | Removes conversation context |
| ⚡ Fast Response | Optimized API calls |
| 🔒 Secure | API keys via environment variables |
| 📝 REST API | Easy frontend integration |

---

## 🛠️ Tech Stack

### Backend
- Spring Boot 3.2.5
- Spring AI 1.0.0
- Groq API
- Llama 3.1 (8B)
- Java 17
- Maven

---

## 🚀 Quick Start

### Prerequisites

| Software | Version |
|----------|---------|
| Java JDK | 17+ |
| Maven | 3.8+ |
| Git | Latest |

### Installation

**1. Clone Repository**

```bash
git clone https://github.com/sejalkanam90/chatbot-app.git
cd chatbot-app
2. Get Groq API Key

Visit https://console.groq.com/keys

Create API Key

Copy key (starts with gsk_)

3. Set Environment Variable

Windows CMD:

cmd
set GROQ_API_KEY=your_api_key_here
Windows PowerShell:

powershell
$env:GROQ_API_KEY="your_api_key_here"
4. Build and Run

bash
mvn clean install
mvn spring-boot:run
App runs on: http://localhost:8080

📡 API Endpoints
Method	Endpoint	Description
GET	/api/chat?message={text}	Send message
GET	/api/chat/health	Health check
Example
bash
curl -X GET "http://localhost:8080/api/chat?message=Hello"
📁 Project Structure
text
chatbot-app/
├── src/main/java/com/chatbot/ai/chatbot/project/
│   ├── ChatbotProjectApplication.java
│   ├── chatcontroller/ChatController.java
│   ├── chatservice/ChatService.java
│   └── config/AppConfig.java
├── src/main/resources/application.properties
├── pom.xml
└── README.md
🔧 Configuration
application.properties

properties
spring.application.name=chatbot-project
server.port=8080

spring.ai.openai.api-key=${GROQ_API_KEY}
spring.ai.openai.base-url=https://api.groq.com/openai
spring.ai.openai.chat.options.model=llama-3.1-8b-instant
spring.ai.openai.chat.options.temperature=0.7

🔒 Security
Never commit API keys. Always use environment variables.

👨‍💻 Author
Sejal Kanam90

GitHub: sejalkanam90

Project: github.com/sejalkanam90/chatbot-app


