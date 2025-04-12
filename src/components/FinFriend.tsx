// src/components/FinFriendTutorial.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { 
  Clock, ChevronLeft, GraduationCap, 
  Sparkles, Book, Target, Brain 
} from 'lucide-react';

// Define tab types
type TabType = 'beginner' | 'intermediate' | 'advanced';

// Define tutorial card interface
interface TutorialCard {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  link: string;
}

const FinFriendTutorial = () => {
  const [activeTab, setActiveTab] = useState<TabType>('beginner');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowWelcome(false), 2000);
  }, []);

  const tabIcons = {
    beginner: Book,
    intermediate: Target,
    advanced: Brain
  };

  // Tutorial card data
  const tutorialCards: Record<TabType, TutorialCard[]> = {
    beginner: [
      {
        id: 'mutual-funds-basics',
        title: 'Understanding Mutual Funds',
        description: 'Learn the basics of mutual funds and how they work',
        duration: '5 min',
        level: 'Beginner',
        link: 'https://www.youtube.com/watch?v=JUtes-k-VX4&t=2s'
      },
      {
        id: 'sip-basics',
        title: 'Getting Started with SIPs',
        description: 'How systematic investment plans can help build wealth',
        duration: '5 min',
        level: 'Beginner',
        link: 'https://www.youtube.com/watch?v=JUtes-k-VX4'
      },
      {
        id: 'tax-saving',
        title: 'Introduction to Tax-Saving Investments',
        description: 'Investment options that can help reduce your tax liability',
        duration: '2 min',
        level: 'Beginner',
        link: 'https://www.youtube.com/watch?v=RYfh9DyQFMQ'
      }
    ],
    intermediate: [
      {
        id: 'asset-allocation',
        title: 'Asset Allocation Strategies',
        description: 'How to distribute your investments across different asset classes',
        duration: '25 min',
        level: 'Intermediate',
        link: 'https://youtu.be/rFIg4qqhB38?si=bYO9C60OX274o8Rv'
      },
      {
        id: 'retirement-planning',
        title: 'Retirement Planning Essentials',
        description: 'Building a robust retirement corpus through strategic investing',
        duration: '5 min',
        level: 'Intermediate',
        link: 'https://www.youtube.com/watch?v=lR22EVjfM4g'
      },
      {
        id: 'understanding-market',
        title: 'Understanding Market',
        description: 'A volatile ecosystem where securities based on collective market sentiment',
        duration: '4 min',
        level: 'Intermediate',
        link: 'https://www.youtube.com/watch?v=lR22EVjfM4g'
      }
    ],
    advanced: [
      {
        id: 'portfolio-rebalancing',
        title: 'Portfolio Rebalancing Techniques',
        description: 'When and how to rebalance your investment portfolio',
        duration: '9 min',
        level: 'Advanced',
        link: 'https://www.youtube.com/watch?v=vK-pCCEqM1c'
      },
      {
        id: 'international-investing',
        title: 'International Investing',
        description: 'How to diversify your portfolio with international assets',
        duration: '14 min',
        level: 'Advanced',
        link: 'https://www.youtube.com/watch?v=s9-zP8lAhqA'
      },
      {
        id: 'behavioural-finance',
        title: 'Behaioural Finance',
        description: 'Understanding how psychological factors influence investment decisions',
        duration: '5 min',
        level: 'Advanced',
        link: 'https://youtu.be/NFvX5rDigIY?si=DQ2DNkyWi8WYSD9N'
      }
    ]
  };

  const handleStartLearning = (card: TutorialCard) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    window.open(card.link, '_blank');
  };

  return (
    <div>
      {showConfetti && <ReactConfetti />}
      
      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="text-center"
            >
              <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800">Welcome to Learning Center</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container py-12 mx-auto max-w-7xl px-4"
      >
        {/* Header Section with Progress */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center justify-between mb-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/"
              className="inline-flex items-center justify-center rounded-lg font-medium text-gray-700 bg-white shadow-sm py-2 px-4 transition-all hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </motion.a>
            <h1 className="text-3xl font-bold text-gray-800"></h1>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: activeTab === 'beginner' ? '33.33%' : 
                       activeTab === 'intermediate' ? '66.66%' : '100%' 
              }}
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
          {/* Enhanced Tab Navigation */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
            {(['beginner', 'intermediate', 'advanced'] as TabType[]).map((tab) => {
              const IconComponent = tabIcons[tab];
              return (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 px-4 font-medium text-center rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <span className="capitalize">{tab}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Simplified Card Grid */}
          <div className="space-y-8">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="wait">
                {tutorialCards[activeTab].map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                      </motion.div>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{card.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          <span>{card.level}</span>
                        </div>
                      </div>

                      <motion.a 
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors gap-2 font-medium"
                        onClick={() => handleStartLearning(card)}
                      >
                        Start Learning
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default FinFriendTutorial;