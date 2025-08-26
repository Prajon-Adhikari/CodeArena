import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const skillsOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "express", label: "Express" },
];

const tagsOptions = [
  { value: "sarthak", label: "Sarthak" },
  { value: "sagar", label: "Sagar" },
  { value: "ritik", label: "Ritik" },
  { value: "prakash", label: "Prakash" },
];

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [submittedProject, setSubmittedProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectLink, setProjectLink] = useState("");

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
        console.log(data.isRegistered);
        setIsRegistered(data.isRegistered);
        setHackathon(data.hackathon);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  const fetchSubmittedProject = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/home/${id}/myproject`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      setSubmittedProject(data?.submittedProject || null);
    } catch (err) {
      console.error("Failed to fetch project", err);
    } finally {
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    fetchSubmittedProject();
  }, [id]);

  const handleProjectSubmission = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("projectTitle", projectTitle);
      formData.append("projectDescription", projectDescription);
      formData.append("tech", selectedSkills.map((s) => s.value).join(","));
      formData.append("tags", selectedTags.map((t) => t.value).join(","));
      formData.append("githubLink", githubLink);
      formData.append("projectLink", projectLink);

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

      toast.success("Project submitted successfully 🎉");

      setTimeout(() => {
        fetchSubmittedProject();
      }, 1200);

      console.log("Project submitted successfully", response.data);
    } catch (error) {
      console.error("Failed to submit project", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[60px] ">
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
      {!isRegistered ? (
        <div className="flex flex-col items-center  mt-30 mb-10">
          <div className="text-5xl pb-10 font-bold text-gray-700">
            You haven't joined hackathon yet.
          </div>
          <Link to={`/${id}/overview`}>
            <button className="bg-blue-400 text-white px-8 py-3 text-2xl rounded-md cursor-pointer">
              Join Hackathon Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="px-[120px] py-20 ">
          {loadingProject ? (
            <p>Loading...</p>
          ) : submittedProject ? (
            <div className="flex gap-30">
              <div className="w-[710px]">
                {submittedProject?.videos?.map((video, index) => (
                  <video
                    key={index}
                    src={video.url}
                    controls
                    className="w-[640px] rounded-lg border mb-4"
                  />
                ))}
                <h2 className="font-bold text-4xl pt-4">
                  {submittedProject.projectTitle}
                </h2>
                <div className="text-xl pt-3 text-gray-800">
                  {submittedProject.projectDescription}
                </div>
              </div>
              <div className="pt-3">
                <h3 className="font-bold text-3xl">Technologies Used</h3>
                <div className="pt-3 flex flex-wrap">
                  {submittedProject.tech.map((t, index) => {
                    return (
                      <span
                        key={index}
                        className="border-2 mr-4 px-6 py-1 mt-3 rounded-3xl text-xl"
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
                <h3 className="font-bold text-3xl mt-12">Tags</h3>
                <div className="pt-3 flex flex-wrap">
                  {submittedProject.tags.map((t, index) => {
                    return (
                      <span
                        key={index}
                        className="border-2 mr-4 px-6 py-1 mt-3 rounded-3xl text-xl"
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold pl-22">Submit Your Project</h1>
              <form
                action=""
                onSubmit={handleProjectSubmission}
                className="mt-16 text-2xl flex flex-col items-center"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="projectTitle"
                    className="font-semibold px-2 py-1"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="projectTitle"
                    placeholder="Enter your project title"
                    name="projectTitle"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    autoComplete="off"
                    className="border-2 border-[#B7B7B7] w-[1100px] text-lg px-4 py-3 rounded-xl"
                  />
                </div>
                <div className="flex gap-15">
                  <div>
                    <div className="flex flex-col pt-12">
                      <label
                        htmlFor="projectDescription"
                        className="font-semibold px-1 py-1"
                      >
                        Description
                      </label>
                      <textarea
                        name="projectDescription"
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Briefy describe your project's goals, your solutions and impact you made here ... "
                        className="border-2 border-[#B7B7B7] w-[560px] min-h-[260px] text-xl px-4 py-2 rounded-xl"
                      ></textarea>
                    </div>

                    <div className="flex flex-col pt-12">
                      <label htmlFor="tags" className="font-semibold px-1 py-1">
                        Tags ( sent invite to your friends )
                      </label>
                      <Select
                        isMulti
                        name="tags"
                        options={tagsOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        placeholder="Mention your team members..."
                        className="text-[18px] w-[560px]"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderWidth: "2px",
                            borderRadius: "12px",
                            borderColor: "#B7B7B7",
                            padding: "7px 6px",
                            boxShadow: "none",
                            "&:hover": { borderColor: "#6B7280" },
                          }),
                          multiValue: (base) => ({
                            ...base,
                            borderWidth: "2px",
                            borderRadius: "9999px",
                            borderColor: "#000000",
                            backgroundColor: "#FFFFFF",
                            padding: "1px 8px",
                            "&:hover": { backgroundColor: "#EEEEEE" },
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: "#000000", // Tailwind blue-900
                            fontWeight: "500",
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            borderRadius: "9999px",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "#EEEEEE",
                              cursor: "pointer",
                              color: "#000000",
                            },
                          }),
                        }}
                      />{" "}
                    </div>
                  </div>
                  <div className="border-2 border-dotted border-gray-400 h-[380px] w-[480px] flex justify-center flex-col items-center p-10 mt-22 rounded-3xl relative">
                    {!selectedVideo ? (
                      <>
                        <label
                          htmlFor="videoUpload"
                          className="cursor-pointer flex items-center gap-4 border-1 border-dotted px-5 py-5 rounded-full w-fit hover:bg-gray-50 "
                        >
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="text-2xl"
                          />
                        </label>
                        <p className="text-lg pt-3">Upload a video</p>
                        <input
                          type="file"
                          id="videoUpload"
                          name="video"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => setSelectedVideo(e.target.files[0])}
                        />
                      </>
                    ) : (
                      <div className="relative">
                        {/* Cross button */}
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(null)}
                          className="absolute -top-3 -right-3 cursor-pointer  text-black font-semibold bg-gray-200 rounded-full px-2 py-1 flex items-center justify-center text-sm"
                        >
                          ✕
                        </button>

                        <div className="w-[400px] h-[300px] rounded-xl border overflow-hidden">
                          <video
                            src={URL.createObjectURL(selectedVideo)}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col pt-12">
                  <label htmlFor="tech" className="font-semibold px-1 py-1">
                    Technologies Used
                  </label>
                  <Select
                    isMulti
                    name="tech"
                    options={skillsOptions}
                    value={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Mention techs you used..."
                    className="text-[18px] w-[1100px]"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderWidth: "2px",
                        borderRadius: "12px",
                        borderColor: "#B7B7B7",
                        padding: "7px 6px",
                        boxShadow: "none",
                        "&:hover": { borderColor: "#6B7280" },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        borderWidth: "2px",
                        borderRadius: "9999px",
                        borderColor: "#000000",
                        backgroundColor: "#FFFFFF",
                        padding: "1px 8px",
                        "&:hover": { backgroundColor: "#EEEEEE" },
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#000000", // Tailwind blue-900
                        fontWeight: "500",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        borderRadius: "9999px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#EEEEEE",
                          cursor: "pointer",
                          color: "#000000",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="flex pt-12 gap-10">
                  <div className="flex flex-col">
                    <label
                      htmlFor="githublink"
                      className="font-semibold px-2 py-1"
                    >
                      Github Link
                    </label>
                    <input
                      type="text"
                      id="githublink"
                      placeholder="Ex- https://www.github.com/example"
                      name="githubLink"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      autoComplete="off"
                      className="border-2 border-[#B7B7B7] w-[560px] text-lg px-4 py-3 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="projectLink"
                      className="font-semibold px-2 py-1"
                    >
                      Project Link
                    </label>
                    <input
                      type="text"
                      id="projectLink"
                      placeholder="Enter your live project link"
                      name="projectLink"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      autoComplete="off"
                      className="border-2 border-[#B7B7B7] w-[500px] text-lg px-4 py-3 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end px-30 pt-10 w-full">
                  <input
                    type="submit"
                    value="Submit Project"
                    className="mt-12 cursor-pointer hover:bg-blue-300 bg-blue-400 text-white py-3 px-10 rounded-sm"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      )}
      ;
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
}
