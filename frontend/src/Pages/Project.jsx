import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import folder from "../assets/folder.jpg";

const skillsOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "nodejs", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "express", label: "Express" },
];

export default function Project() {
  const { id } = useParams();
  const location = useLocation();
  const [hackathon, setHackathon] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [submittedProject, setSubmittedProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isJudgedHackathon, setIsJudgedHackathon] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [tagsOptions, setTagsOptions] = useState([]);

  const [fetchSubmittedProjects, setFetchSubmittedProjects] = useState([]);
  const [isMyHostedHackathon, setIsMyHostedHackathon] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [isJudgingEnded, setIsJudgingEnded] = useState(false);

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
        setIsRegistered(data.isRegistered);
        setHackathon(data.hackathon);
        setIsMyHostedHackathon(data.isHostedHackathon || false);
        setIsJudgedHackathon(data.isJudgedHackathon);
        setFetchSubmittedProjects(data.submittedProjects || []);
      } catch (error) {
        console.log("Failed to fetch hackathon", error);
      }
    };
    fetchHackathonDetails();
  }, [id]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home/tagfriends/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        setTagsOptions(data.tagfriends);
      } catch (err) {
        console.error("Failed to fetch friends", err);
      }
    };

    fetchFriends();
  }, []);

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
      formData.append("tags", JSON.stringify(selectedTags.map((t) => t.value)));
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

  useEffect(() => {
    document.body.style.overflow = submitting ? "hidden" : "auto";
  }, [submitting]);

  const filteredProjects = fetchSubmittedProjects.filter((project) => {
    const search = searchTerm.toLowerCase();
    return (
      project.teamName?.toLowerCase().includes(search) ||
      project.projectTitle?.toLowerCase().includes(search) ||
      project.tags?.some((member) =>
        member.fullName.toLowerCase().includes(search)
      )
    );
  });

  useEffect(() => {
    if (hackathon.endDate) {
      const endDate = new Date(hackathon.endDate);
      const judgingEndDate = new Date(endDate);
      judgingEndDate.setDate(judgingEndDate.getDate() + 7); // 7 days after endDate
      const now = new Date();
      setIsJudgingEnded(now >= judgingEndDate);
    }
  }, [hackathon.endDate]);

  return (
    <div className="pt-[60px] pb-10 relative">
      {submitting && (
        <div className="overlay">
          <div className="loader"></div>
          <p className="loader-text">Submitting...</p>
        </div>
      )}
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
      {isMyHostedHackathon || isJudgedHackathon || isJudgingEnded ? (
        <>
          <div className="px-[100px] py-20 ">
            {isJudgingEnded && (
              <>
                <p className="text-3xl font-bold text-gray-700 mx-[90px] mb-10 bg-orange-300 inline-block px-10 py-2 rounded-xl">
                  Judging has finished. Check the results below!
                </p>
              </>
            )}
            {fetchSubmittedProjects.length !== 0 ? (
              <>
                <h2 className="text-4xl font-bold pl-22 mb-8">
                  Submitted Projects
                </h2>
                <div className="px-[80px]">
                  {(fetchSubmittedProjects || []).length > 0 ? (
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full border-collapse">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="py-3 px-6 text-left border-b">
                              Rank
                            </th>
                            <th className="py-3 px-6 text-left border-b">
                              Team Name
                            </th>
                            <th className="py-3 px-6 text-left border-b">
                              Project Title
                            </th>
                            <th className="py-3 px-6 text-left border-b">
                              Members
                            </th>

                            <th className="py-3 px-6 text-left border-b">
                              Avg Score
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {fetchSubmittedProjects
                            .slice()
                            .sort((a, b) => {
                              const getAvgTotal = (proj) =>
                                proj.judging && proj.judging.length > 0
                                  ? proj.judging.reduce(
                                      (sum, j) => sum + j.totalScore,
                                      0
                                    ) / proj.judging.length
                                  : 0;

                              const avgA = getAvgTotal(a);
                              const avgB = getAvgTotal(b);

                              if (avgB === avgA) {
                                // Tie-breaker by criteria priority
                                const criteriaOrder = [
                                  "innovation",
                                  "technical",
                                  "design",
                                  "impact",
                                  "presentation",
                                ];

                                for (let criterion of criteriaOrder) {
                                  const scoreA =
                                    a.judging && a.judging.length > 0
                                      ? a.judging.reduce(
                                          (sum, j) =>
                                            sum +
                                            ((j.criteria &&
                                              j.criteria[criterion]) ||
                                              0),
                                          0
                                        ) / a.judging.length
                                      : 0;
                                  const scoreB =
                                    b.judging && b.judging.length > 0
                                      ? b.judging.reduce(
                                          (sum, j) =>
                                            sum +
                                            ((j.criteria &&
                                              j.criteria[criterion]) ||
                                              0),
                                          0
                                        ) / b.judging.length
                                      : 0;

                                  if (scoreB !== scoreA) return scoreB - scoreA; // higher priority wins
                                }

                                return 0; // all criteria equal
                              }

                              return avgB - avgA; // primary sort by avg score
                            })

                            .map((project, index) => {
                              const avgScore =
                                project.judging && project.judging.length > 0
                                  ? (
                                      project.judging.reduce(
                                        (sum, j) => sum + j.totalScore,
                                        0
                                      ) / project.judging.length
                                    ).toFixed(2)
                                  : "N/A";

                              return (
                                <tr
                                  key={project._id || index}
                                  className="hover:bg-gray-100"
                                >
                                  <td className="py-3 px-6 border-b">
                                    {index + 1}
                                  </td>
                                  <td className="py-3 px-6 border-b">
                                    {project.teamName}
                                  </td>
                                  <td className="py-3 px-6 border-b capitalize">
                                    {project.projectTitle}
                                  </td>
                                  <td className="py-3 px-6 border-b">
                                    {project.tags.length}
                                  </td>
                                  <td className="py-3 px-6 border-b">
                                    {avgScore}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-lg">No projects yet.</p>
                  )}
                </div>
                <div className="flex items-center justify-between mr-24 mt-10 ml-20">
                  <h2 className="text-3xl font-bold ">Projects Gallery</h2>
                  <div className="border-gray-300 border-2 bg-white px-5 py-2 rounded-md flex items-center gap-4 focus-within:ring-1 focus-within:ring-gray-400">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-sm text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search a person ..."
                      className=" w-[240px] outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 px-20 mt-10">
                  {filteredProjects.map((project, index) => (
                    <>
                      <Link
                        to={`/project/${project._id}`}
                        state={{ from: location.pathname }}
                      >
                        <div
                          key={index}
                          className="rounded-xl h-[520px] shadow-[0px_0px_4px_gray] hover:shadow-[0px_0px_10px_gray] cursor-pointer p-2 pb-4 overflow-hidden bg-white"
                        >
                          <div
                            className={`min-h-48 flex  items-center justify-center mb-4`}
                          >
                            {project?.videos?.map((vdo, index) => (
                              <video
                                key={index}
                                src={vdo.url} // Cloudinary URL
                                alt={`Project Image ${index + 1}`}
                                className="w-[640px] h-[200px] rounded-lg border-1 border-gray-400"
                              />
                            ))}
                          </div>

                          <div className="mt-2 px-2">
                            {/* Team Name */}
                            <div className=" text-gray-800 font-bold text-lg">
                              Team: {project.teamName || "N/A"}
                            </div>
                            <div className=" flex flex-wrap">
                              {project?.tags?.map((member, index) => (
                                <span
                                  key={index}
                                  className="border-2 mr-4 px-4 py-1 mt-3 rounded-3xl text-sm"
                                >
                                  {member.fullName}
                                </span>
                              ))}
                            </div>
                            <h3 className="mt-4 font-bold text-lg leading-tight pl-1 line-clamp-2">
                              {project.projectTitle}
                            </h3>
                            <div className="pt-2 pl-1 pr-2 text-gray-700  line-clamp-3">
                              {project.projectDescription}
                            </div>
                            <div className="flex justify-between pt-4 pl-1 pr-5 items-center">
                              <button className="text-orange-500">
                                Learn More &rarr;
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex flex-col items-center">
                    <img src={folder} alt="" className="w-[220px] h-[220px]" />
                    <p className="font-bold text-2xl">
                      No projects submitted yet, When project submitted it
                      appears here
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : !isRegistered ? (
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
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
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
              <div className="pt-3 w-[500px]">
                <h3 className="font-bold text-3xl">Technologies Used</h3>
                <div className="pt-3 flex flex-wrap">
                  {submittedProject?.tech?.map((t, index) => {
                    return (
                      <span
                        key={index}
                        className="border-2 mr-4 px-6 py-1 mt-3 capitalize rounded-3xl text-xl"
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
                <h3 className="font-bold text-3xl mt-10">Tags</h3>
                <div className="pt-3 flex flex-wrap">
                  {submittedProject?.tags?.map((t, index) => {
                    return (
                      <span
                        key={index}
                        className="border-2 mr-4 px-6 py-1 mt-3 rounded-3xl text-xl"
                      >
                        {t.fullName}
                      </span>
                    );
                  })}
                </div>
                <div className="pt-10">
                  {submittedProject.githubLink && (
                    <div className="border p-4 rounded-lg shadow-md bg-gray-50">
                      <h2 className="text-gray-700 font-semibold">
                        Github Link
                      </h2>
                      <a
                        href={submittedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {submittedProject.githubLink}
                      </a>
                    </div>
                  )}
                </div>
                <div className="pt-10">
                  {submittedProject.projectLink && (
                    <div className="border p-4 rounded-lg shadow-md bg-gray-50">
                      <h2 className="text-gray-700 font-semibold">
                        Project Link
                      </h2>
                      <a
                        href={submittedProject.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {submittedProject.projectLink}
                      </a>
                    </div>
                  )}
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
                        formatOptionLabel={(option) => (
                          <div className="flex items-center gap-3">
                            {option.profilePic ? (
                              <img
                                src={option.profilePic}
                                alt={option.label}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
                                {option.label[0]}{" "}
                                {/* fallback: first letter of name */}
                              </div>
                            )}
                            <span>{option.label}</span>
                          </div>
                        )}
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
                    value={submitting ? "Submitting..." : "Submit Project"}
                    disabled={submitting}
                    className={`mt-12 cursor-pointer hover:bg-blue-300 bg-blue-400 text-white py-3 px-10 rounded-sm ${
                      submitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </form>
            </>
          )}
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
}
