export const Home = ({ currentUser }) => {
    return (
      <main className="text-slate-900 pt-[5%] pl-10 pr-10 flex items-center justify-center">
   
        <div className="bg-white custom-border-radius p-8 min-h-[70vh] w-[90vw] flex items-center justify-center custom-shadow">
          <h1 className="text-4xl">Howdy, {currentUser.name}!</h1>
        </div>
      </main>
    );
  };