import { ArrowUpCircleIcon, StopIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

function CharacterDetail({
  selectedId,
  onAddFavoriteCharacter,
  isAddFavorite,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setCharacter(data);
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div className="flex w-full h-auto flex-col justify-center items-start pl-1">
        <Loader />
      </div>
    );
  if (!character || !selectedId)
    return (
      <div className="flex w-full h-auto flex-col justify-center items-start pl-1 font-bold text-slate-400 text-[12px] sm:text-[15px] md:text-[20px] lg:text-[25px] whitespace-nowrap">
        Please select a character😴
      </div>
    );

  return (
    <div className="flex w-full h-auto flex-col justify-center items-start pl-1">
      <CharacterStatus
        character={character}
        onAddFavoriteCharacter={onAddFavoriteCharacter}
        isAddFavorite={isAddFavorite}
      />
      <Episodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharacterStatus({ character, onAddFavoriteCharacter, isAddFavorite }) {
  return (
    <section className="w-full flex bg-slate-800 rounded-xl ">
      <ImageCharacter character={character} />
      <InfoCharacter
        character={character}
        onAddFavoriteCharacter={onAddFavoriteCharacter}
        isAddFavorite={isAddFavorite}
      />
    </section>
  );
}

function ImageCharacter({ character }) {
  return (
    <div className="flex overflow-hidden justify-center items-center w-[40%] ">
      <img
        src={character.image}
        alt={character.name}
        className="max-h-[17rem] w-full h-auto object-cover object-center rounded-xl"
      />
    </div>
  );
}

function InfoCharacter({ character, onAddFavoriteCharacter, isAddFavorite }) {
  return (
    <div className="w-[60%] flex flex-col justify-center items-start pl-1 max-h-[17rem]">
      <div className="text-slate-400 text-[8px] sm:text-[14px] md:text-[18px] lg:text-[23px] w-full font-bold">
        <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
        <span title={character.name}>
          {String(character.name).slice(0, 12)}...
        </span>
      </div>
      <div className="w-full flex justify-start items-center text-slate-400 text-[9px] sm:text-[14px] md:text-[18px] lg:text-[23px]">
        <span
          className={`${
            character.status === "Dead"
              ? "text-red-500"
              : character.status === "Alive"
              ? "text-green-500"
              : "text-yellow-700"
          }`}
        >
          <StopIcon className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        </span>
        <span>{character.species}</span>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-slate-400 text-[7px] sm:text-[9px] md:text-[15px] lg:text-[20px]">
        <div title={character.origin.name}>
          {String(character.origin.name).slice(0, 22)}...
        </div>
        <div title={character.location.name}>
          {String(character.location.name).slice(0, 22)}...
        </div>
      </div>
      <div className="w-full flex justify-center items-center lg:pt-8 md:pt-4 sm:pt-2 pt-0.5">
        <FavoriteCharacterBtn
          onAddFavoriteCharacter={onAddFavoriteCharacter}
          character={character}
          isAddFavorite={isAddFavorite}
        />
      </div>
    </div>
  );
}

function FavoriteCharacterBtn({
  onAddFavoriteCharacter,
  character,
  isAddFavorite,
}) {
  return (
    <div>
      {isAddFavorite ? (
        <p className=" text-green-600 text-[7px] sm:text-[12px] md:text-[15px] lg:text-[20px] rounded-2xl p-0.5 lg:p-2 bg-slate-800 font-bold">
          Already added 😍
        </p>
      ) : (
        <button
          onClick={() => onAddFavoriteCharacter(character)}
          className=" text-slate-400 text-[7px] sm:text-[12px] md:text-[15px] lg:text-[20px] rounded-2xl p-0.5 lg:p-2 bg-slate-600 font-bold"
        >
          Add to Favorite 🤔
        </button>
      )}
    </div>
  );
}

function Episodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <section className="w-full h-auto bg-slate-800 rounded-xl mt-2 sm:mt-3 md:mt-4 lg:mt-5 flex flex-col items-start justify-center p-1 md:p-2 lg:p-3">
      <div className="w-full flex justify-between items-center text-[10px] sm:text-[13px] md:text-[17px] lg:text-[23px] text-slate-400 font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon
            className={`h-3 w-3 sm:w-4 sm:h-4 md:h-5 md:w-5 lg:h-6 lg:w-6 transition-all duration-300 ${
              sortBy ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>
      <div className="w-full h-auto flex flex-col justify-center  gap-y-1 md:gap-y-2 lg:gap-y-4">
        {sortedEpisodes.map((item, index) => (
          <div key={item.id} className="w-full">
            <div className="w-full text-[9px] sm:text-[13px] md:text-[17px] lg:text-[23px] text-slate-400">
              <span>{String(index + 1).padStart(2, "0")} - </span>
              <span>{item.episode}: </span>
              <span className="font-bold text-[8px] sm:text-[13px] md:text-[17px] lg:text-[23px]">
                {String(item.name).slice(0, 20)}...
              </span>
            </div>
            <div className="w-full text-center text-[7px] sm:text-[11px]  md:text-[14px] lg:text-[18px] text-slate-300 bg-slate-500 rounded-lg">
              {item.air_date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
