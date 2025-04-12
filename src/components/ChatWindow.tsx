import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { Send, Mic, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
=======
import { Send, Mic } from 'lucide-react';
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const languages = {
  'en-US': "I'm your AI financial assistant. How can I help you today?",
  'hi-IN': "मैं आपका AI वित्तीय सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
  'kn-IN': "ನಾನು ನಿಮ್ಮ AI ಹಣಕಾಸು ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  'ta-IN': "நான் உங்கள் AI நிதி உதவியாளர். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
  'te-IN': "నేను మీ AI ఆర్థిక సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను?"
};

<<<<<<< HEAD
interface ChatWindowProps {
  selectedLanguage: string;
}

export function ChatWindow({ selectedLanguage }: ChatWindowProps) {
=======
export function ChatWindow() {
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
<<<<<<< HEAD
=======
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getBotResponse = async (userInput: string, language: string) => {
    try {
      const response = await fetch('your-ai-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          language: language,
          // Other parameters your AI service needs
        })
      });
      
      const data = await response.json();
      return data.response; // Response should already be in the correct language
    } catch (error) {
      console.error('Error getting bot response:', error);
      return languages[language as keyof typeof languages] || languages['en-US'];
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Get AI response in selected language
    const botResponse = await getBotResponse(inputText, selectedLanguage);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    try {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = selectedLanguage;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = async (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setInputText(speechResult);
        
        const newMessage: Message = {
          id: Date.now().toString(),
          text: speechResult,
          sender: 'user',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, newMessage]);
        setIsTyping(true);

        // Get AI response in selected language
        const botResponse = await getBotResponse(speechResult, selectedLanguage);
        
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, 2000);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        alert('Voice recognition error: ' + event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
      alert('Failed to start voice recognition. Please try again.');
      setIsListening(false);
    }
  };

  return (
<<<<<<< HEAD
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-8rem)] bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Welcome Message */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-8"
          >
            <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to FinFriend
            </h2>
            <p className="text-gray-600">
              Your AI-powered financial assistant is ready to help
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.2,
                delay: index * 0.1
              }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area with glass effect */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-t border-gray-200/50 bg-white/80 backdrop-blur-lg p-6 shadow-lg"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about finance..."
              className="flex-1 px-6 py-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <div className="flex items-center gap-2 px-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-blue-100 text-blue-600 shadow-md ring-2 ring-blue-200' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Mic className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-blue-600 mt-2 text-center"
            >
              Listening...
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
=======
    <div className="flex flex-col h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chat</h1>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md"
        >
          <option value="en-US">English</option>
          <option value="hi-IN">हिंदी</option>
          <option value="kn-IN">ಕನ್ನಡ</option>
          <option value="ta-IN">தமிழ்</option>
          <option value="te-IN">తెలుగు</option>
        </select>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleVoiceInput}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isListening ? 'bg-blue-100' : ''
            }`}
          >
            <Mic className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
  );
}