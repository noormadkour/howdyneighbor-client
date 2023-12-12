export const Home = ({ currentUser }) => {
    return (
      <main className="text-slate-900 pl-10 pr-10">
        <div className="home-container min-h flex items-center justify-center bg-white rounded-lg p-8 -10">
          <h1 className="text-4xl">Howdy, {currentUser.name}!</h1>
        </div>
      </main>
    );
  };
  