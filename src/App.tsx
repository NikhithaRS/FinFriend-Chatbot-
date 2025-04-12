import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { MainLayout } from './components/MainLayout';
import { Navigation } from './components/Navigation';
import { ChatWindow } from './components/ChatWindow';
import { LearningPage } from './pages/LearningPage';
import { Globe } from 'lucide-react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  return (
    <Router>
      <MainLayout>
        <Navigation />
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="flex flex-col h-[calc(100vh-4rem)]">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h1 className="text-2xl font-semibold text-gray-800">FinFriend</h1>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-all"
                    >
                      <option value="en-US">English</option>
                      <option value="hi-IN">हिंदी</option>
                      <option value="kn-IN">ಕನ್ನಡ</option>
                      <option value="ta-IN">தமிழ்</option>
                      <option value="te-IN">తెలుగు</option>
                    </select>
                  </div>
                </div>
                <ChatWindow selectedLanguage={selectedLanguage} />
              </div>
            } 
          />
          <Route path="/learn" element={<LearningPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;