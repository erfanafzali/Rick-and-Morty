import { EyeIcon, EyeSlashIcon, StopIcon } from "@heroicons/react/24/solid";
import Loader from "./Loader";

function CharacterList({
  characters,
  isLoading,
  selectedId,
  onSelectCharacter,
}) {
  if (isLoading)
    return (
      <div className="flex w-full h-auto gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-5 flex-col justify-center pr-2 sm:pr-3 md:pr-4 lg:pr-5">
        <Loader />
      </div>
    );

  return (
    <div className="flex w-full h-auto gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-5 flex-col justify-center pr-2 sm:pr-3 md:pr-4 lg:pr-5">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelectCharacter={onSelectCharacter}
        >
          <div className="w-[10%] h-auto flex justify-end items-center pr-1 md:pr-2 lg:pr-3">
            <button onClick={() => onSelectCharacter(item.id)}>
              {selectedId === item.id ? (
                <EyeIcon className="w-3 h-3 sm:h-4 sm:w-4 md:w-6 md:h-6 lg:h-9 lg:w-9 text-red-500" />
              ) : (
                <EyeSlashIcon className="w-3 h-3 sm:h-4 sm:w-4 md:w-6 md:h-6 lg:h-9 lg:w-9 text-red-500" />
              )}
            </button>
          </div>
        </Character>
      ))}
    </div>
  );
}

export default CharacterList;

export function Character({ item, selectedId, onSelectCharacter, children }) {
  return (
    <div className="w-full h-auto bg-slate-800 flex justify-between px-1 items-center rounded-xl">
      <div className="flex overflow-hidden justify-center items-center w-[20%] lg:pr-3">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-[12rem] w-full h-auto object-cover object-center rounded-xl"
        />
      </div>
      <div className="flex justify-star pl-1 md:pl-2 lg:pl-3 w-full flex-col">
        <div className="text-slate-400 text-[8px] sm:text-[12px] md:text-[16px] lg:text-[25px] w-full font-bold">
          <span>{item.gender === "Male" ? "🧑" : "👩"}</span>
          <span title={item.name}>{String(item.name).slice(0, 15)}...</span>
        </div>
        <div className="w-full flex justify-start items-center text-slate-400 text-[9px] sm:text-[14px] md:text-[18px] lg:text-[28px]">
          <span
            className={`${
              item.status === "Dead"
                ? "text-red-500"
                : item.status === "Alive"
                ? "text-green-500"
                : "text-yellow-700"
            }`}
          >
            <StopIcon className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
          </span>
          <span>{item.species}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
