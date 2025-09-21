import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatableSelect from "react-select/creatable";
import image1 from "../assets/image.png";

const themeOptions = [
  { value: "ai-ml", label: "AI/ML" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "IoT" },
  { value: "beginner-friendly", label: "Beginner Friendly" },
  { value: "fintech", label: "FinTech" },
  { value: "web development", label: "Web Development" },
  { value: "mobile development", label: "Mobile App Development" },
  { value: "game development", label: "Game Development" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "AR/VR", label: "AR/VR" },
  { value: "data science", label: "Data Science" },
  { value: "healthTech", label: "HealthTech" },
  { value: "edTech", label: "EdTech" },
  { value: "climate tech", label: "Climate Tech" },
  { value: "robotics", label: "Robotics" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "social good", label: "Social Good" },
  { value: "sustainability", label: "Sustainability" },
  { value: "open innovation", label: "Open Innovation" },
  { value: "cloud computing", label: "Cloud Computing" },
  { value: "devops", label: "DevOps" },
  { value: "agriTech", label: "AgriTech" },
  { value: "smart cities", label: "Smart Cities" },
  { value: "space tech", label: "Space Tech" },
  { value: "quantum computing", label: "Quantum Computing" },
];

export default function Hosting() {
  const [step, setStep] = useState(1); // track which section we are on
  const location = useLocation();

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [registrationStart, setRegistrationStart] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [mode, setMode] = useState("online");
  const [organizerName, setOrganizerName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [rules, setRules] = useState({
    eligibility: "",
    teamFormation: "",
    submissionRequirements: "",
    codeOfConduct: "",
    ipOwnership: "",
    prohibited: "",
    disqualification: "",
  });
  const [prizes, setPrizes] = useState([]);
  const [judges, setJudges] = useState([]);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/home/users`,
          {
            withCredentials: true,
          }
        );
        setUsers(res.data); // make sure backend returns [{_id, fullName, email}, ...]
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const previousPath = location.state?.from || "/";

  const validateStep = () => {
    if (step === 1) {
      if (
        !title ||
        !description ||
        !organizerName ||
        !contactEmail ||
        selectedThemes.length === 0 ||
        !mode
      ) {
        toast.error("⚠️ All fields must be filled.");
        return false;
      }
    }

    if (step === 2) {
      if (
        !registrationStart ||
        !registrationDeadline ||
        !startDate ||
        !endDate
      ) {
        toast.error("⚠️ All fields must be filled.");
        return false;
      }
    }

    if (step === 3) {
      if (
        !rules.eligibility ||
        !rules.teamFormation ||
        !rules.submissionRequirements ||
        !rules.codeOfConduct ||
        !rules.prohibited ||
        !rules.disqualification
      ) {
        toast.error("⚠️ All fields must be filled.");
        return false;
      }
    }

    if (step === 4) {
      if (prizes.length === 0) {
        toast.error("⚠️ Please add at least one prize.");
        return false;
      }
      for (const prize of prizes) {
        if (!prize.title || !prize.description || !prize.prizeValue) {
          toast.error("⚠️ Fill all prize fields.");
          return false;
        }
      }
    }

    if (step === 5) {
      if (judges.length === 0) {
        toast.error("⚠️ Please add at least one judge.");
        return false;
      }
      for (const judge of judges) {
        if (!judge.name || !judge.role || !judge.bio) {
          toast.error("⚠️ Fill all judge fields.");
          return false;
        }
      }
    }

    return true;
  };

  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...prizes];
    updatedPrizes[index][field] = value;
    setPrizes(updatedPrizes);
  };

  // 🔹 Add a new empty prize
  const addPrize = () => {
    setPrizes([
      ...prizes,
      {
        title: "",
        description: "",
        winnersCount: 1,
        prizeValue: "",
        sponsor: "",
      },
    ]);
  };

  const handleJudgeChange = (index, field, value) => {
    const updated = [...judges];
    updated[index][field] = value;
    setJudges(updated);
  };

  const addJudge = () => {
    setJudges([...judges, { name: "", role: "", bio: "", photo: null }]);
  };

  const removeJudge = (index) => {
    setJudges(judges.filter((_, i) => i !== index));
  };

  const removePrize = (index) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/host/hackathon`,
        {
          title,
          description,
          startDate,
          endDate,
          registrationStart,
          registrationDeadline,
          mode,
          contactEmail,
          organizerName,
          rules,
          prizes,
          judges,
          themes: selectedThemes.map((theme) => theme.value),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      navigate("/hackathon");
    } catch (error) {
      console.log("Error while hosting hackathon", error);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image1})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="bg-white p-8 rounded-lg w-[900px] max-h-[90vh] overflow-y-auto shadow-[0px_0px_5px_gray] relative">
          <Link to={previousPath}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-gray-800"
            >
              ✖
            </button>
          </Link>
          <div className="flex justify-center pb-10">
            <form className="space-y-7 w-[750px]" onSubmit={handleSubmit}>
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-8">Basic Information</h2>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Hackathon Name
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter hackathon name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Description
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <textarea
                        placeholder="Briefly explain about hackathon program ..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-transparent focus:outline-none w-full min-h-24"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Organizer Name
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter organizer name"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Contact Email
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="email"
                        placeholder="Enter your contact email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col ">
                    <label
                      htmlFor="themes"
                      className="block font-semibold mb-2"
                    >
                      Themes
                    </label>
                    <CreatableSelect
                      isMulti
                      name="themes"
                      options={themeOptions}
                      value={selectedThemes}
                      onChange={setSelectedThemes}
                      placeholder="Select or create themes..."
                      className="text-[14px]"
                      required
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderWidth: "2px",
                          borderRadius: "12px",
                          borderColor: "#000000",
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
                          color: "#000000",
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
                  {/* <div>
              <h1 className="text-xl font-semibold pl-2 pb-1">Banner Image</h1>
              <div className="flex items-center border-2 rounded-lg px-4 py-3 text-lg">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBannerUrl(e.target.files[0])}
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
              {bannerUrl && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(bannerUrl)}
                    alt="Preview"
                    className="w-full max-h-60 rounded-lg object-cover"
                  />
                </div>
              )}
            </div> */}

                  <div className="flex justify-between">
                    <div />
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-500 cursor-pointer text-white py-2 px-4 rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: TIMELINES */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Timelines</h2>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Registration Start Date
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="date"
                        value={registrationStart}
                        onChange={(e) => setRegistrationStart(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Registration Deadline
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) =>
                          setRegistrationDeadline(e.target.value)
                        }
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Submission Start Date
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block font-semibold mb-2">
                      Submission Deadline
                    </h1>
                    <div className="flex items-center border-2 rounded-lg px-4 py-2">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-transparent focus:outline-none w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-400 text-white cursor-pointer py-2 px-4 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-500 text-white cursor-pointer py-2 px-4 rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: RULES */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Rules</h2>

                  {/* Eligibility */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Eligibility
                    </h1>
                    <textarea
                      placeholder="Who can participate? (e.g., Students above 18, Open to all, etc.)"
                      value={rules.eligibility || ""}
                      onChange={(e) =>
                        setRules({ ...rules, eligibility: e.target.value })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  {/* Team Formation */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Team Formation
                    </h1>
                    <textarea
                      placeholder="Team size rules (e.g., 1–4 members)"
                      value={rules.teamFormation || ""}
                      onChange={(e) =>
                        setRules({ ...rules, teamFormation: e.target.value })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  {/* Submission Requirements */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Submission Requirements
                    </h1>
                    <textarea
                      placeholder="What must teams submit? (e.g., GitHub repo, demo video, description)"
                      value={rules.submissionRequirements || ""}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          submissionRequirements: e.target.value,
                        })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  {/* Code of Conduct */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Code of Conduct
                    </h1>
                    <textarea
                      placeholder="Behavior guidelines, plagiarism, MLH CoC, etc."
                      value={rules.codeOfConduct || ""}
                      onChange={(e) =>
                        setRules({ ...rules, codeOfConduct: e.target.value })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  {/* Prohibited Activities */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Prohibited Activities
                    </h1>
                    <textarea
                      placeholder="What participants must NOT do (offensive content, prebuilt projects, etc.)"
                      value={rules.prohibited || ""}
                      onChange={(e) =>
                        setRules({ ...rules, prohibited: e.target.value })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  {/* Disqualification */}
                  <div>
                    <h1 className="block font-semibold mb-2">
                      Disqualification
                    </h1>
                    <textarea
                      placeholder="When can organizers disqualify a team?"
                      value={rules.disqualification || ""}
                      onChange={(e) =>
                        setRules({ ...rules, disqualification: e.target.value })
                      }
                      className="bg-transparent border-2 rounded-lg px-4 py-2 focus:outline-none w-full"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-400 cursor-pointer text-white py-2 px-4 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-500 cursor-pointer text-white py-2 px-4 rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PRIZES */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Prizes</h2>
                  <div className="grid grid-cols-2 gap-10">
                    {prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="border-2 w-[400px] min-h-[340px] flex flex-col justify-between rounded-lg p-6 mb-4"
                      >
                        <input
                          type="text"
                          placeholder="Prize Title"
                          value={prize.title}
                          onChange={(e) =>
                            handlePrizeChange(index, "title", e.target.value)
                          }
                          className="w-full mb-2 border-b-2 border-gray-300 outline-0"
                          required
                        />
                        <textarea
                          placeholder="Prize Description"
                          value={prize.description}
                          onChange={(e) =>
                            handlePrizeChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full mb-2 border-b-2 border-gray-300 outline-0"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Number of Winners"
                          value={prize.winnersCount}
                          onChange={(e) =>
                            handlePrizeChange(
                              index,
                              "winnersCount",
                              e.target.value
                            )
                          }
                          className="w-full mb-2 border-b-2 border-gray-300 outline-0"
                        />
                        <input
                          type="number"
                          placeholder="Prize Value"
                          value={prize.prizeValue}
                          onChange={(e) =>
                            handlePrizeChange(
                              index,
                              "prizeValue",
                              e.target.value
                            )
                          }
                          className="w-full mb-2 border-b-2 border-gray-300 outline-0"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => removePrize(index)}
                          className="bg-red-500 w-[160px] cursor-pointer text-white px-3 py-2 rounded-lg mt-2"
                        >
                          Remove Prize
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addPrize}
                    className="bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-lg"
                  >
                    + Add Prize
                  </button>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-400 text-white cursor-pointer py-2 px-4 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-500 text-white cursor-pointer py-2 px-4 rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: JUDGES */}
              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Judges</h2>
                  <div className="grid grid-cols-2 gap-10">
                    {judges.map((judge, index) => (
                      <div
                        key={index}
                        className="border-2 w-[400px] min-h-[340px] rounded-lg p-6 flex flex-col justify-between relative"
                      >
                        <h3 className="text-lg font-semibold">
                          Judge {index + 1}
                        </h3>

                        {/* Name Dropdown */}
                        <select
                          value={judge.name}
                          onChange={(e) =>
                            handleJudgeChange(index, "name", e.target.value)
                          }
                          className="w-full border-b-2 border-gray-300 focus:outline-none pb-1"
                          required
                        >
                          <option value="">
                            Select Judge (must have CodeArena account)
                          </option>
                          {users.map((user) => (
                            <option key={user._id} value={user.fullName}>
                              {user.fullName} ({user.email})
                            </option>
                          ))}
                        </select>

                        {/* Role */}
                        <input
                          type="text"
                          placeholder="Role / Title"
                          value={judge.role}
                          onChange={(e) =>
                            handleJudgeChange(index, "role", e.target.value)
                          }
                          className="w-full border-b-2 border-gray-300 focus:outline-none pb-1"
                          required
                        />

                        {/* Bio */}
                        <textarea
                          placeholder="Short Bio"
                          value={judge.bio}
                          onChange={(e) =>
                            handleJudgeChange(index, "bio", e.target.value)
                          }
                          className="w-full border-b-2 border-gray-300 focus:outline-none pb-1"
                          required
                        />

                        {/* Photo */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleJudgeChange(index, "photo", e.target.files[0])
                          }
                          className="w-full focus:outline-none"
                        />

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeJudge(index)}
                          className="absolute top-4 right-4 bg-red-500 cursor-pointer text-white px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Judge Button */}
                  <button
                    type="button"
                    onClick={addJudge}
                    className="bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-lg"
                  >
                    + Add Judge
                  </button>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-400 text-white cursor-pointer py-2 px-4 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </form>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
