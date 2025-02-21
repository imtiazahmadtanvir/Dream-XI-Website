import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mt-10">
      {/* 🚀 Hero Section */}
      <section className="bg-blue-500 dark:bg-blue-700 text-white text-center py-16 px-6 mt-15">
        <h1 className="text-4xl font-bold mb-4 mt-9">Boost Your Productivity</h1>
        <p className="text-lg mb-6">
          Organize your tasks efficiently with our Task Management System. Drag, drop, and track your progress in real-time!
        </p>
        <Link to="/task">
          <button className="bg-white dark:bg-gray-800 dark:text-white text-blue-500 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 dark:hover:bg-gray-700">
            Get Started
          </button>
        </Link>
      </section>

      {/* 🛠️ Features Section */}
      <section className="py-7 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Why Choose Our Task Manager?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🔥 Real-Time Sync</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All changes are saved instantly to the database, ensuring no lost data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">📦 Drag & Drop</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily move tasks between different categories with a smooth drag-and-drop interface.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Authentication</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in securely with Firebase Authentication and keep your tasks private.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
