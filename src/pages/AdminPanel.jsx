import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [news, setNews] = useState([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Politics");
  const [banner, setBanner] = useState(null);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const categoryOptions = [
    "Politics",
    "Business",
    "Technology",
    "Entertainment",
    "Lifestyle",
    "Education",
    "Sports",
  ];

  // Helper function for image upload
  const handleImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid login credentials");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const newsCollection = await getDocs(collection(db, "news"));
      setNews(
        newsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }
  };

  const handleAddNews = async () => {
    let bannerURL = "";
    if (banner) {
      bannerURL = await handleImageUpload(banner);
    }

    const newNews = {
      title,
      content,
      summary,
      category,
      author,
      media: {
        banner: bannerURL || "",
      },
      tags,
      seo: {
        meta_title: metaTitle,
        meta_description: metaDescription,
      },
      publication_details: {
        published_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
        is_published: true,
      },
    };

    try {
      await addDoc(collection(db, "news"), newNews);
      alert("News added successfully");
      fetchNews();
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id));
      alert("News deleted successfully");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="p-10 bg-white shadow-xl rounded-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Demo Credentials:</p>
            <p className="text-sm text-gray-600">Email: Admin@news.com</p>
            <p className="text-sm text-gray-600">Password: admin1234</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Add News Form */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Create New Article</h3>
            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors h-32"
              />
              <textarea
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <input
                  type="file"
                  onChange={(e) => setBanner(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <button
                onClick={handleAddNews}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Publish Article
              </button>
            </div>
          </div>

          {/* News List */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Published Articles</h3>
            <div className="space-y-6">
              {news.length > 0 ? (
                news.map((article) => (
                  <div
                    key={article.id}
                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.category}</span>
                      <button
                        onClick={() => handleDeleteNews(article.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No articles published yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; AdminPanel;
