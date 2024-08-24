import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [step, setStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const steps = [
    {
      message: "Welcome to the HackClub Arcade chatbot! I'm here to guide you through becoming a full user and explain our constitution. Ready to begin?",
      options: ["Yes, let's start!", "Tell me about HackClub first"],
    },
    {
      message: "Great! Let's go through the essential phases of Arcade:\n\n1. Build projects and log hours\n2. Document progress\n3. Ship your project\n\nLet's start with step 1. In Arcade Slack, type '/arcade'. A thread will open. Take a screenshot and send it in the same thread. Have you done this?",
      options: ["Yes, I've done it", "I need more information"],
    },
    {
      message: "Excellent! Now for step 2. Type '/shop' in Arcade. This opens the shop website. Try to order stickers and enter your details. You'll need to submit your UIDAI Aadhaar or DigiLocker ID. Have you completed this step?",
      options: ["Yes, order placed", "I have questions about this"],
    },
    {
      message: "Perfect! Now for step 3. Wait for verification. This is a manual process and may take some time. While waiting, start coding by typing '/arcade' every hour and submitting project links. Are you ready to start coding?",
      options: ["Yes, I'll start coding", "Tell me more about projects"],
    },
    {
      message: "Great initiative! Remember, a project in Arcade is a self-directed creative effort toward an output that others can experience. Some key points:\n\n• Projects should be technical and push your skills\n• Document progress in a public git repository\n• Update at least once per hour logged\n• Ship your project by sharing in #scrapbook\n\nWould you like more details on what counts as a project?",
      options: ["Yes, tell me more", "No, I'm good for now"],
    },
    {
      message: "Fantastic! Here are some guidelines for projects:\n\n• Should be mostly your own work\n• Can use libraries but not entire pre-built solutions\n• AI tools are allowed, but declare their use\n• Projects should be wholesome and legal\n• Aim for highly self-directed, amazing projects\n\nRemember, you can't bank more than 25 hours at a time. Any questions about this?",
      options: ["How do I use tickets?", "Tell me about the Constitution", "I'm ready to start!"],
    }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setShowOptions(false);

    setTimeout(() => {
      const botResponse = handleBotResponse(inputMessage);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      setShowOptions(true);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    setMessages([...messages, { text: option, sender: 'user' }]);
    setShowOptions(false);

    setTimeout(() => {
      const botResponse = handleBotResponse(option);
      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      setStep(prevStep => prevStep + 1);
      setShowOptions(true);
    }, 1000);
  };

  const handleBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('hackclub')) {
      return "HackClub is a global community of high school coders. We provide resources, support, and a platform for young people to learn coding, build projects, and connect with like-minded peers. Our mission is to empower the next generation of tech innovators!";
    } else if (userMessage.toLowerCase().includes('constitution')) {
      return "The Arcade Constitution is a living document that defines 'what counts' in Hack Club Arcade. It outlines the essential phases, project criteria, documentation requirements, and the spirit of Arcade. The constitution emphasizes building with a hacker mindset, quick iteration, and sharing your work.";
    } else if (userMessage.toLowerCase().includes('ticket')) {
      return "Tickets are earned for every hour of work that passes review. You can spend these tickets using the '/shop' command in Arcade. The shop offers various rewards and perks for active participants!";
    } else {
      return steps[step % steps.length].message;
    }
  };

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <h2>HackClub Arcade Assistant</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {showOptions && (
        <div className="chat-options">
          {steps[step % steps.length].options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBot;