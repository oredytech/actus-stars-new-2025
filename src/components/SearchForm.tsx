
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFormProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  isLoading,
  onQueryChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-8">
      <Input
        type="search"
        placeholder="Que recherchez-vous ?"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-grow text-gray-800 placeholder:text-gray-500"
      />
      <Button type="submit" disabled={isLoading}>
        <Search className="mr-2" />
        {isLoading ? 'Recherche...' : 'Rechercher'}
      </Button>
    </form>
  );
};

export default SearchForm;
