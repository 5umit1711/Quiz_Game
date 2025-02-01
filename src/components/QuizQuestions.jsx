import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const QuizQuestions = ({ score, setScore }) => {
    const [quiz, setQuiz] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctAnswerId, setCorrectAnswerId] = useState(null);
    const [detailedSolution, setDetailedSolution] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const { data } = await axios.get("https://cors-anywhere.herokuapp.com/https://api.jsonserve.com/Uw5CrX");
            setQuiz(data.questions[id]);
            console.log(data.questions[id]);
        } catch (error) {
            console.log("Error in fetching data");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleOptionClick = (option) => {
        setSelectedOption(option.id);
        setIsCorrect(option.is_correct);
        setCorrectAnswerId(quiz.options.find(o => o.is_correct).id);
        setDetailedSolution(quiz.detailed_solution); 

        if (option.is_correct) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNext = () => {
        if (parseInt(id) < 9) {
            navigate(`/quiz/${parseInt(id) + 1}`);
        } else {
            navigate("/quiz/10");
        }
        setSelectedOption(null);
        setIsCorrect(null);
        setCorrectAnswerId(null);
        setDetailedSolution(null);
    };

    const handleRestart = () => {
        setScore(0);
        navigate("/quiz/0");
    };

    if (parseInt(id) > 9) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-6 sm:p-10 relative">
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white shadow-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full text-lg font-semibold text-gray-800 border border-gray-300">
                    🏆 Score: {score}
                </div>
                <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10 w-full max-w-md sm:max-w-2xl text-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                        You've completed the quiz! 🎉
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">Final Score: {score}</p>
                    <button
                        className="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                        onClick={handleRestart}
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (!quiz) {
        return <div className="text-center mt-10 text-xl font-semibold text-gray-600">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-blue-300 p-4 sm:p-8 relative">
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white shadow-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full text-lg font-semibold text-gray-800 border border-gray-300">
                🏆 Score: {score}
            </div>

            <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-12 w-full max-w-lg sm:max-w-3xl text-center max-h-[80vh] overflow-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800">
                    {quiz.description}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {quiz.options.map((option) => (
                        <button
                            key={option.id}
                            className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium transition-all duration-300 border-2 text-lg focus:outline-none ${
                                selectedOption === option.id
                                    ? option.is_correct
                                        ? "bg-green-500 text-white border-green-700"
                                        : "bg-red-500 text-white border-red-700"
                                    : option.id === correctAnswerId
                                    ? "bg-green-500 text-white border-green-700"
                                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-500"
                            }`}
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedOption !== null}
                        >
                            {option.description}
                        </button>
                    ))}
                </div>

                {isCorrect !== null && (
                    <div
                        className={`mt-4 p-4 rounded-md text-lg sm:text-xl font-semibold ${
                            isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {isCorrect ? "✅ Correct Answer!" : "❌ Wrong Answer!"}
                    </div>
                )}

                {detailedSolution && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-100 rounded-lg text-left shadow-lg">
                        <h3 className="text-lg sm:text-2xl font-semibold text-gray-800">Detailed Solution:</h3>
                        <div className="mt-2 text-md sm:text-lg text-gray-700">
                            <ReactMarkdown>{detailedSolution}</ReactMarkdown>
                        </div>
                    </div>
                )}

                <button
                    className="mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
                    onClick={handleNext}
                    disabled={selectedOption === null}
                >
                    Next Question →
                </button>
            </div>
        </div>
    );
};

export default QuizQuestions;
