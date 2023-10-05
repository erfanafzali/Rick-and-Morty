import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorite, Lenght, Logo, Search } from "./components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CharacterDetail from "./components/CharacterDetail";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("Favorites", []);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavoriteBtn = (character) => {
    setFavorites((preFav) => [...preFav, character]);
  };

  const handleDeleteCharacter = (id) => {
    setFavorites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddFavorite = favorites
    .map((episode) => episode.id)
    .includes(selectedId);

  return (
    <div className="container mx-auto px-8 w-full mt-8">
      <Toaster />
      <Navbar>
        <Logo />
        <Search setQuery={setQuery} query={query} />
        <Lenght characterLenght={characters.length} />
        <Favorite
          favoritesLenght={favorites.length}
          favorites={favorites}
          onDeleteFavorite={handleDeleteCharacter}
        />
      </Navbar>
      <Main>
        <CharacterList
          onSelectCharacter={handleSelectCharacter}
          characters={characters}
          isLoading={isLoading}
          selectedId={selectedId}
        />
        <CharacterDetail
          onSelectCharacter={handleSelectCharacter}
          onAddFavoriteCharacter={handleAddFavoriteBtn}
          isAddFavorite={isAddFavorite}
          selectedId={selectedId}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return (
    <div className="flex justify-between items-start w-full mb-8">
      {children}
    </div>
  );
}
