"use client";


export default function Home() {

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Next logo"
            src="/next.svg"
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Home Page
          </h2>
        </div>
      </div>
    </div>
  );
}
