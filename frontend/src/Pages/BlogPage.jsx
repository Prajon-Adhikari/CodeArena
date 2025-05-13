import React, { useState } from "react";

const categories = [
  "All posts",
  "Hackathon planning",
  "Participant resources",
  "Business impact",
];

const posts = [
  {
    title: "The ultimate internal hackathon template and planning kit",
    category: "Hackathon planning",
    imageText: "Internal hackathon template and planning kit",
    imageBg: "bg-teal-600",
  },
  {
    title: "Dive into innovation: The Google Cloud AI in Action Hackathon on Devpost",
    category: "Participant resources",
    imageText: "Google Cloud AI in Action Hackathon on Devpost",
    imageBg: "bg-blue-600",
  },
  {
    title: "How to get executive buy-in for internal hackathons (With templates)",
    category: "Hackathon planning",
    imageText: "How to get exec buy-in for internal hackathons (With templates)",
    imageBg: "bg-teal-600",
  },
  {
    title: "From idea to impact: Measuring business outcomes from hackathons",
    category: "Business impact",
    imageText: "Measuring business outcomes from hackathons",
    imageBg: "bg-purple-600",
  },
  {
    title: "Top 10 tips for winning your next online hackathon",
    category: "Participant resources",
    imageText: "Top 10 tips for winning hackathons",
    imageBg: "bg-indigo-600",
  },
  {
    title: "How companies use internal hackathons to drive innovation",
    category: "Business impact",
    imageText: "Companies driving innovation with hackathons",
    imageBg: "bg-pink-600",
  },
  {
    title: "Hackathon planning checklist: Everything you need to prepare",
    category: "Hackathon planning",
    imageText: "Hackathon planning checklist",
    imageBg: "bg-orange-600",
  },
  {
    title: "Why participants love cross-functional team challenges",
    category: "Participant resources",
    imageText: "Cross-functional team benefits",
    imageBg: "bg-green-600",
  },
  {
    title: "The ROI of hackathons: What your CFO wants to know",
    category: "Business impact",
    imageText: "The ROI of hackathons",
    imageBg: "bg-red-600",
  },
];


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All posts");

  const filteredPosts =
    selectedCategory === "All posts"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-100 py-16 px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Blog</h1>
        <p className="text-gray-600 max-w-2xl">
          Learn how to run a hackathon and get new ideas, industry insights, and more on the CodeArena blog
        </p>
      </div>

      {/* Featured Article */}
      <div className="bg-white max-w-6xl mx-auto shadow-md rounded-lg mt-12 overflow-hidden flex flex-col md:flex-row mb-16">
        {/* Left Graphic Side */}
        <div className="bg-teal-600 text-white md:w-1/2 p-8 relative">
          <h2 className="text-3xl font-bold leading-snug">
            How to get exec buy-in for internal hackathons (With templates)
          </h2>
          {/* Placeholder Images */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
            <div className="w-16 h-16 bg-white rounded shadow-sm"></div>
          </div>
        </div>

        {/* Right Content Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full w-fit mb-4">
            Hackathon planning
          </span>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            How to get executive buy-in for your internal hackathons (With templates)
          </h3>
          <p className="text-gray-600 mb-6">
            Learn how to secure leadership approval for your internal hackathon — and get access to a business case template you can use to build your pitch.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-fit">
            Read more
          </button>
        </div>
      </div>

      {/* Tabs (Blog navigation) */}
      <div className="max-w-6xl mx-auto px-4">
        {/* <div className="flex justify-center gap-8 cursor-pointer border-b pb-4 mb-6">
          <button className="text-gray-800 font-medium hover:text-blue-600 border-b-2 border-blue-600">
            Blog posts
          </button>
          <button className="text-gray-500 hover:text-blue-600">All resources</button>
          <button className="text-gray-500 hover:text-blue-600">Customer stories</button>
          <button className="text-gray-500 hover:text-blue-600">Guides</button>
          <button className="text-gray-500 hover:text-blue-600">Webinars & events</button>
        </div> */}

        {/* Filter buttons */}
        <div className="flex justify-center cursor-pointer flex-wrap gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded border text-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <h2 className="text-3xl font-semibold mb-6">{selectedCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="rounded overflow-hidden border shadow-sm bg-white"
            >
              <div
                className={`h-40 flex items-center justify-center text-white text-lg font-semibold p-4 ${post.imageBg}`}
              >
                {post.imageText}
              </div>
              <div className="p-4">
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <h3 className="mt-2 font-semibold text-lg leading-tight">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
