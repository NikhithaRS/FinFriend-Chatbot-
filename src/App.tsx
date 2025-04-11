import { MainLayout } from './components/MainLayout';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">FinFriend</h1>
        </div>
        <ChatWindow />
      </div>
    </MainLayout>
  );
}

export default App;