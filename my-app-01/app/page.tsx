import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="px-5 py-2 text-5xl font-bold h-full mt-[40vh] ">Hey There! </h1>
      <p className="text-2xl">
        I am configuring a code written in NextJS
      </p>
      <p>
        <a href="/awesome">
          Click Me to Navigate to /awesome
        </a>
      </p>
    </div>
  );
}
