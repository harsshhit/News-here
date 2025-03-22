import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig"; // Firebase config
import { doc, getDoc } from "firebase/firestore";

const NewsDetails = () => {
  const { id } = useParams(); // Get the ID from the route
  const [newsArticle, setNewsArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(db, "news", id); // Reference to the document
        const articleSnapshot = await getDoc(articleRef);

        if (articleSnapshot.exists()) {
          setNewsArticle(articleSnapshot.data());
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("An error occurred while fetching the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg animate-fade-in">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4 min-h-screen animate-fade-in">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {newsArticle.media?.banner && (
          <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
            <img
              src={newsArticle.media.banner}
              alt={newsArticle.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {newsArticle.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{newsArticle.summary}</p>
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800"
            dangerouslySetInnerHTML={{ __html: newsArticle.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default NewsDetails;
