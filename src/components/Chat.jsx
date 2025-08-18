import { useEffect } from 'react';
import '@n8n/chat/dist/style.css'; 
import { createChat } from '@n8n/chat';

export const Chat = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://abdulazizyousufzai.app.n8n.cloud/webhook/06d996b7-0419-4a0b-83d6-46ccaf1bc293/chat',
      mode: 'window',
      loadPreviousSession: false,
      showWelcomeScreen: false,

      // ✅ Force frontend greeting
      initialMessages: [
        "Hi there! 👋",
        "This is Home Academy. How can I assist you today?"
      ],

      // ✅ Optional: header ka text bhi change karlo
      i18n: {
        en: {
          title: "Welcome to Home Academy 👋",
          subtitle: "Ask us anything, we’re happy to help!"
        }
      }
    });
  }, []);

  return <div id="n8n-chat"></div>;
};
