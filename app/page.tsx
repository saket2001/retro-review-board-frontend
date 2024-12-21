import Heading from "@/components/ui/UI/HeadingComponent/Heading";
import SessionProvider from "./SessionProvider";

export default function Home() {
  return (
    <SessionProvider>
      <main className="w-full h-full flex flex-col items-center px-1 py-3">
        <section className="py-3">
          <div className="flex flex-col justify-center items-center gap-1">
            <Heading variant="h1" title="A Retro Board For All Your Needs" extraStyles="text-2xl lg:text-4xl" />
            <p className="text-gray-600 text-lg">Explore now</p>
          </div>
        </section>
      </main>
    </SessionProvider>
  );
}