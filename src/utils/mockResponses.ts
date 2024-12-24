import { Message } from '../types/chat';

export const mockAssistantResponse = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  setTimeout(() => {
    const response: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thank you for providing that information. Could you please specify how many acres will be used for the solar farm?",
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, response]);
  }, 1000);
};