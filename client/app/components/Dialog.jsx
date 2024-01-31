"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Dialog({ title, children }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const addTransaction = searchParams.get("addTransaction");
  const deleteQueryParam = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const closeDialog = () => {
    router.push(pathname + "?" + deleteQueryParam("addTransaction"));
  };

  const clickOk = () => {
    closeDialog();
  };

  const dialog = addTransaction ? (
    <>
      <div
        className="h-full w-screen z-5 fixed bg-black opacity-50"
        onClick={closeDialog}
      ></div>
      <div className="fixed z-10 h-14 rounded-xl">
        <div className="flex flex-col w-screen items-center justify-center">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
            <h1 className="text-2xl">{title}</h1>
            <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button>
          </div>
          <div className="px-5 pb-6 overflow-auto h-[500px]">
            {children}
            <div className="flex flex-row justify-end mt-2">
              <button
                onClick={clickOk}
                className="bg-green-500 py-1 px-2 rounded border-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  return dialog;
  //   const dialog =
  //     addTransaction === "true" ? (
  //   <div className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
  //     <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
  //       <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-yellow-400">
  //         <h1 className="text-2xl">{title}</h1>
  //         <button
  //           onClick={closeDialog}
  //           className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
  //         >
  //           x
  //         </button>
  //       </div>
  //       <div className="px-5 pb-6">
  //         {children}
  //         <div className="flex flex-row justify-end mt-2">
  //           <button
  //             onClick={clickOk}
  //             className="bg-green-500 py-1 px-2 rounded border-none"
  //           >
  //             OK
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //     ) : null;

  //   return dialog;
}
