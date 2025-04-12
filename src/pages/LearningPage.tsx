import FinFriendTutorial from '../components/FinFriend';

export function LearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Learning Center</h1>
        <FinFriendTutorial />
      </div>
    </div>
  );
}