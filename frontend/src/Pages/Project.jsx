import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [tech, setTech] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState("");

  const tabs = [
    { path: "overview", label: "Overview" },
    { path: "myproject", label: "My Project" },
    { path: "rules", label: "Rules" },
    { path: "prizes", label: "Prizes" },
    { path: "judges", label: "Judges" },
  ];

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setHackathon(data.hackathon);
        setIsRegistered(data.isRegistered);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  const handleProjectSubmission = async (e) => {
    e.preventDefault();

    try {
      console.log("heelo");
      const formData = new FormData();
      formData.append("projectTitle", projectTitle);
      formData.append("projectDescription", projectDescription);
      formData.append("tech", tech);
      formData.append("tags", tags);

      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/${id}/myproject`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Project submitted successfully", response.data);
    } catch (error) {
      console.error("Failed to submit project", error);
    }
  };

  return (
    <div className="pt-[60px]">
      <div>
        {hackathon && hackathon.bannerUrl ? (
          <img src={hackathon.bannerUrl} />
        ) : (
          <div className="flex justify-center items-center text-white bg-gray-700 h-[220px] font-semibold text-3xl">
            {hackathon.title}
          </div>
        )}
        <div className="flex justify-center items-center bg-gray-900 text-white text-xl">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={`/${id}/${tab.path}`}
              className={`px-10 py-4 ${
                location.pathname.endsWith(tab.path)
                  ? "bg-white text-gray-900 font-semibold"
                  : "hover:underline"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-[100px] py-16">
        <h1 className="text-4xl font-bold">Submit Your Project</h1>
        <form
          action=""
          onSubmit={handleProjectSubmission}
          className="mt-16 text-2xl"
        >
          <div className="flex flex-col ">
            <label htmlFor="projectTitle" className="font-semibold px-4 py-1">
              Project Title :
            </label>
            <input
              type="text"
              id="projectTitle"
              placeholder="Enter your project title"
              name="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="border-2 border-gray-400 w-[1300px] text-xl px-4 py-2 rounded-xl"
            />
          </div>
          <div className="flex gap-30">
            <div>
              <div className="flex flex-col pt-12">
                <label
                  htmlFor="projectDescription"
                  className="font-semibold px-4 py-1"
                >
                  Description :
                </label>
                <textarea
                  name="projectDescription"
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Write a description about project"
                  className="border-2 border-gray-400 w-[560px] min-h-[260px] text-xl px-4 py-2 rounded-xl"
                ></textarea>
              </div>
              <div className="flex flex-col pt-12">
                <label htmlFor="tech" className="font-semibold px-4 py-1">
                  Technologies Used :
                </label>
                <textarea
                  name="tech"
                  id="tech"
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                  placeholder=""
                  className="border-2 border-gray-400 w-[560px]  text-xl px-4 py-2 rounded-xl"
                ></textarea>
              </div>
              <div className="flex flex-col pt-12">
                <label htmlFor="tags" className="font-semibold px-4 py-1">
                  Tags ( sent invite to your friends ) :
                </label>
                <textarea
                  name="tags"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder=""
                  className="border-2 border-gray-400 w-[560px]  text-xl px-4 py-2 rounded-xl"
                ></textarea>
              </div>
            </div>
            <div className=" border-2 border-dotted border-gray-400 h-[450px] w-[600px] flex justify-center flex-col items-center p-10 mt-22 rounded-3xl">
              <label
                htmlFor="videoUpload"
                className="cursor-pointer flex items-center gap-4 border-1 border-dotted px-6 py-6 rounded-full w-fit hover:bg-gray-50 "
              >
                <FontAwesomeIcon icon={faVideo} className="text-3xl" />
              </label>
              <input
                type="file"
                id="videoUpload"
                name="video"
                accept="video/*"
                className="hidden"
                onChange={(e) => setSelectedVideo(e.target.files[0])}
              />
              {selectedVideo && (
                <>
                  <video
                    src={URL.createObjectURL(selectedVideo)}
                    controls
                    className="mt-4 w-[550px] h-[310px] rounded-xl border"
                  />
                </>
              )}
            </div>
          </div>
          <input
            type="submit"
            className="mt-12 bg-blue-400 text-white py-1.5 px-8 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
}
