import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 to-blue-300 px-4">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center w-full max-w-sm md:max-w-md">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                    Welcome to Quiz Game
                </h2>
                <button 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-blue-700 transition-all duration-300"
                    onClick={() => navigate("/quiz/0")}
                >
                    Play Now
                </button>
            </div>
        </div>
    );
}

export default Home;
