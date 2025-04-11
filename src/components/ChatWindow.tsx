import { useEffect, useRef, useState } from 'react';
import { Send, Mic } from 'lucide-react';
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

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
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
  );
}