import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Pencil } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-gray-500">Please log in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          className="w-24 h-24 rounded-full border-4 border-teal-500"
          alt="Profile"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-gray-500">@{user.username || "username"}</p>
          <p className="text-gray-600">{user.bio || "No bio provided."}</p>
          <p className="text-gray-500">{user.location || "Unknown location"}</p>
          <p className="text-sm text-gray-400">Joined: {new Date(user.createdAt).toLocaleDateString() || "N/A"}</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 mt-4 text-gray-600">
        {user.email && (
          <a href={`mailto:${user.email}`} className="hover:text-teal-600">
            <Mail />
          </a>
        )}
        {user.github && (
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
            <Github />
          </a>
        )}
        {user.linkedin && (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600">
            <Linkedin />
          </a>
        )}
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skills?.length > 0 ? (
            user.skills.map((skill, index) => (
              <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">No skills listed.</p>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Experience</h2>
        <ul className="list-disc list-inside text-gray-600">
          {user.experience?.length > 0 ? (
            user.experience.map((exp, i) => (
              <li key={i}>{exp}</li>
            ))
          ) : (
            <p className="text-gray-400">No experience added.</p>
          )}
        </ul>
      </div>

      {/* Education */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Education</h2>
        <p className="text-gray-600">{user.education || "Not specified."}</p>
      </div>

      {/* Projects */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        {user.projects?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600">
            {user.projects.map((proj, i) => (
              <li key={i}>{proj}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No projects listed.</p>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="mt-8 text-right">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700">
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
