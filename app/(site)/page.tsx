import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height="50"
          width="50"
          className="mx-auto w-auto"
          src="/assets/logo.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-200">
          Sign In
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
