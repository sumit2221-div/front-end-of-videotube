// ParentComponent.js
import React, { useState } from "react";
import Home from "./home"
import Header from "./header";

const ParentComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Home searchQuery={searchQuery} />
    </div>
  );
};

export default ParentComponent;
