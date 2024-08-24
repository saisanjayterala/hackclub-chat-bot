import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [step, setStep] = useState(0);

  const steps = [
    "Welcome to the HackClub Arcade chatbot! Let's get you set up as a full user. Ready to begin?",
    "Great! Let's start with step 1. In Arcade, start typing '/arcade'. A thread will open. Take a screenshot of that and send it in the same thread.",
    "Excellent! Now for step 2. Type '/shop' in Arcade. This will open the shop website. Try to order any stickers and enter your full details. You'll need to submit your original UIDAI Aadhaar or DigiLocker ID.",
    "Perfect! Now for step 3. Wait for verification. This is a manual process, so it may take some time. While you wait, you can start coding by typing '/arcade' every hour and submitting some links.",
    "That's it! You're on your way to becoming a full user in HackClub Arcade. Remember, Hack Club is a global community of high school students learning to code and build projects. Keep coding and have fun!",
    "Would you like to know more about HackClub or the Arcade Constitution?"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = steps[step];
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      setStep(prevStep => prevStep + 1);
    }, 1000);
  };

  return (
    <div className="chat-bot">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;