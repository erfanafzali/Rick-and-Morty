import { XCircleIcon } from "@heroicons/react/24/solid";

export function Modal({ children, open, setOpen, title }) {
  if (!open) return null;

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className="w-screen h-screen fixed inset-0 backdrop-blur-sm"
      ></div>
      <div className="absolute gap-y-1 sm:gap-y-2 md:gap-y-3 lg:gap-y-5 top-[20%] sm:top-[26%] bg-slate-600 left-[30%] w-[40%]  p-1 sm:p-2 md:p-3 lg:p-4 rounded-xl shadow-lg shadow-slate-500 flex flex-col justify-center ">
        <div className="flex justify-between">
          <h1 className="text-[9px] sm:text-[13px] md:text-[17px] lg:text-[21px] text-slate-300 font-bold">
            {title}
          </h1>
          <button onClick={() => setOpen(false)}>
            <XCircleIcon className="h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:w-8 lg:h-8 text-red-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
