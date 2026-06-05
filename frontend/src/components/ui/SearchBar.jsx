import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../common/Input';

export default function SearchBar({ placeholder = 'Search...', onSearch, value = '', className = '' }) {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== value) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, value]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        icon={Search}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
