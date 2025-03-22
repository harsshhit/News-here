import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig"; // Firebase config
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [categories] = useState([
    "Politics",
    "Business",
    "Technology",
    "Entertainment",
    "Lifestyle",
    "Education",
    "Sports",
    // "World News",
    // "Health",
    // "Science",
    // "Crime",
    // "Environment",
    // "Automobile",
    // "Opinion / Editorial",
    // "India (National News)",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchNews = async (category) => {
    try {
      const newsCollection = collection(db, "news");
      let newsQuery = newsCollection;

      if (category !== "All") {
        newsQuery = query(newsCollection, where("category", "==", category));
      }

      const newsSnapshot = await getDocs(newsQuery);
      const newsData = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-16 z-10 rounded-xl mb-8">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto whitespace-nowrap gap-4 py-4 scrollbar-hide">
            <button
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "All"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {news.map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {article.media?.banner && (
              <img
                src={article.media.banner}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:opacity-90"
              />
            )}
            <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{article.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
            <Link
              to={`/news/${article.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNews;
