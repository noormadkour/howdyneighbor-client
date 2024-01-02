import { EventCarousel } from "../components/carousel/EventCarousel";
import { RequestCarousel } from "../components/carousel/RequestCarousel"; // Ensure the correct path

export const Home = ({ currentUser }) => {
  return (
    <main className="text-slate-900 pt-[5%] pl-10 pr-10 flex flex-col items-center justify-center">
      <div className="bg-white/95 custom-border-radius p-8 pb-20 min-h-[70vh] w-[90vw] flex flex-col items-center justify-center custom-shadow">
        <h1 className="text-4xl mb-4 pb-10">Howdy, {currentUser.name}!</h1>
        <div className="flex w-full mx-2">
          <div className="w-full mb-4">
            <RequestCarousel />
          </div>
          <div className="w-full mb-4">
            <EventCarousel />
          </div>
        </div>
        {/* Additional content or components can be added here */}
      </div>
    </main>
  );
};
