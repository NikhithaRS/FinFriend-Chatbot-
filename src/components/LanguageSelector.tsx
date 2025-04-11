// Removed unused React import
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'kn', name: 'Kannada' },
];

export function LanguageSelector() {
  const handleLanguageChange = (code: string) => {
    // TODO: Implement language change logic
    console.log('Language changed to:', code);
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
        <Globe className="w-5 h-5 text-gray-600" />
        <select
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="appearance-none bg-transparent pr-8 focus:outline-none text-gray-700"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}