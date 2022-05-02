import React from 'react';
import { SearchBar } from "../components";

export default function SearchPage() {
  return (
    <div className="SearchPage">
      <header className="SearchPage-header">
        <SearchBar />
      </header>
    </div>
  );
}