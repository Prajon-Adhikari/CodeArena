import { useState } from "react";
import backgroundImg from "../assets/contact.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/contact`,
        {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Project submitted successfully 🎉");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Failed to submit project", error);
      toast.error("Failed to submit contact message");
    }
  };

  const faqData = [
    {
      question: "What makes CodeArena different from other apps?",
      answer:
        "CodeArena focuses on user privacy and security...",
    },
    {
      question: "How secure are my conversations on CodeArena?",
      answer:
        "Your conversations are encrypted end-to-end...",
    },
    {
      question: "Can I personalize my CodeArena experience?",
      answer:
        "Yes, you can customize themes, notifications, and more...",
    },
    {
      question: "What group features does CodeArena offer?",
      answer:
        "Snappy offers group chats, voice and video calls, file sharing...",
    },
  ];

  const toggleExpand = (index) => {
    setExpanded({ ...expanded, [index]: !expanded[index] });
  };

  return (
    <div className="mt-[80px]">
      <div
        className="bg-cover bg-center h-[360px] bg-gray-200 py-24 px-6"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      ></div>
      <div className="bg-white text-gray-800 py-8 px-[140px]">
        <div className="container mx-auto px-4 my-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-xl text-gray-600 font-bold mb-4">
                WE ARE HERE TO HELP YOU
              </h1>
              <p className="w-[500px] text-6xl mb-4">
                <span className="font-extrabold">Discuss</span> Your Thought
                Solutions
              </p>
              <p className="w-[500px] text-lg mt-7 mb-10">
                Are you looking for top-quality solutions tailored to your needs
                ? Reach out to us
              </p>
              <div className="flex flex-col gap-8 pl-1">
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-2xl text-blue-400"
                  />
                  <div className="text-lg flex gap-2">
                    <p className="font-bold text-xl">Email:</p>
                    <p>codearena@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-2xl text-blue-400"
                  />
                  <div className="text-lg flex gap-2">
                    <p className="font-bold text-xl">Phone:</p>
                    <p>+977-9876543210</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-2xl text-blue-400"
                  />
                  <div className="text-lg flex gap-2">
                    <p className="font-bold text-xl">Location:</p>
                    <p>Bharatpur-10, Chitwan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className=" rounded-3xl shadow-[0px_0px_7px_gray] p-8 ">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  Get in Touch
                </h2>
                <p className="text-gray-800 mb-6">You can reach us anytime</p>

                <form onSubmit={handleSubmit} className="text-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block text-gray-900 font-medium mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="First Name"
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block text-gray-900 font-medium mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Last Name"
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-900 font-medium mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Email"
                        autoComplete="off"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-900 font-medium mb-2"
                      >
                        Phone Number
                      </label>

                      <input
                        id="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        autoComplete="off"
                        className="border border-gray-500 rounded-md pl-3 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-900 font-medium mb-2"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your message"
                      maxLength="120"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-400 to-blue-300 text-white hover:shadow-[skyblue ] cursor-pointer font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Submit
                  </button>

                  <p className="text-gray-800 text-center mt-4 text-sm">
                    By contacting us, you agree to our{" "}
                    <a href="#" className="text-blue-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="locationMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113085.33583457788!2d84.32349143692478!3d27.658047437493362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb37e078d531%3A0x973f22922ea702f7!2sBharatpur%2044200!5e0!3m2!1sen!2snp!4v1740031122154!5m2!1sen!2snp"
            referrerPolicy="no-referrer-when-downgrade"
            width="100%"
            height="450"
            loading="lazy"
            title="Bharatpur. Location"
            className="rounded-xl"
          ></iframe>
        </div>

        <div className="my-20 mx-10 flex justify-between items-center">
          
          <div className="text-7xl font-semibold w-[400px]">
            <p className="text-lg pb-3 pl-2 font-bold">FAQs</p>
            Frequently Asked Questions
          </div>
          <div className="rounded-lg shadow-[0px_0px_10px_gray] p-8 w-[650px]">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                <div
                  className="flex items-center justify-between text-lg font-medium cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  {faq.question}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      expanded[index] ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {expanded[index] && (
                  <div className="mt-2 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </div>
  );
};
export default Contact;
