import Image from "next/image";

const EmptyState = () => {
  return (
    <div
      className="
            px-4 
            py-10 
            sm:px-6 
            lg:px-8 
            lg:py-6 
            h-full 
            flex 
            justify-center 
            items-center 
            bg-black
          "
    >
      <div className="text-center items-center flex flex-col">
        {/* <Image
          alt="logo"
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/assets/logo.png"
        /> */}
        <h3 className="mt-2 text-2xl font-semibold text-slate-200">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
