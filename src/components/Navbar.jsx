import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../components/Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <div className="w-full h-auto flex justify-center items-center bg-slate-800 rounded-xl py-3 mb-3 lg:mb-7">
      {children}
    </div>
  );
}

export default Navbar;

export function Logo() {
  return (
    <div className="w-[20%] flex justify-center items-center  max-w-full h-auto">
      <img src="/src/assets/images/logo copy.png" alt="" className="max-h-20" />
    </div>
  );
}

export function Search({ setQuery, query }) {
  return (
    <div className="w-[40%] flex justify-center items-center px-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="search..."
        className="max-h-20 w-28 sm:w-36 md:w-40 lg:w-56 sm:py-2 rounded-xl bg-slate-500 text-slate-200 font-semibold outline-0 px-3  border-0 text-[10px] sm:text-sm md:text-base lg:text-lg py-1"
      />
    </div>
  );
}

export function Lenght({ characterLenght }) {
  return (
    <div className="w-[20%] flex justify-center items-center px-2 text-slate-400 max-h-20 text-sm sm:text-base md:text-lg lg:text-xl font-bold">
      {characterLenght}/826
    </div>
  );
}

export function Favorite({ favoritesLenght, favorites, onDeleteFavorite }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="List Of Favorites">
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            <button onClick={() => onDeleteFavorite(item.id)}>
              <TrashIcon className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:w-8 lg:h-8 text-red-500" />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="w-[20%] flex justify-center items-center">
        <HeartIcon
          onClick={() => setOpen((open) => !open)}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 text-red-500 relative"
        />
        <span className="bg-red-500 rounded-full relative -top-2 right-2 px-1 font-bold text-slate-300 text-[8px] sm:text-[9px] md:text-[11px] lg:text-[14px] lg:right-3">
          {favoritesLenght}
        </span>
      </button>
    </>
  );
}
