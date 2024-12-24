import React from 'react';
import { Header } from './components/layout/Header';
import { ChatContainer } from './components/chat/ChatContainer';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <ChatContainer messages={messages} onSendMessage={sendMessage} />
      </main>
    </div>
  );
}

export default App;