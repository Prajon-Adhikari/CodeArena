import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const [expanded, setExpanded] = useState({});

  const faqData = [
    {
      question: "What makes Snappy different from other messaging apps?",
      answer:
        "Snappy focuses on user privacy and security... (replace with actual answer)",
    },
    {
      question: "How secure are my conversations on Snappy?",
      answer:
        "Your conversations are encrypted end-to-end... (replace with actual answer)",
    },
    {
      question: "Can I personalize my Snappy experience?",
      answer:
        "Yes, you can customize themes, notifications, and more... (replace with actual answer)",
    },
    {
      question: "What group features does Snappy offer?",
      answer:
        "Snappy offers group chats, voice and video calls, file sharing... (replace with actual answer)",
    },
  ];

  const toggleExpand = (index) => {
    setExpanded({...expanded, [index]:!expanded[index] });
  };

  return (
    < >
   
      <div
        className="bg-cover bg-center bg-gray-200  text-gray-800 py-24 px-6"
        style={{
         // backgroundImage: `url(${backgroundImg})`,
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact US</h1>
          <p className="text-lg">
            CodeArena is your gateway to success, connecting aspiring professionals with top hackathon opportunities.
            <br />
            Have questions or need assistance? We're here to help!
          </p>
        </div>
      </div>
        <div className="bg-white text-gray-800 py-12 px-24">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 mt-22">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg font-medium text-gray-700 mb-4">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to say hello, feel free to reach out.
            </p>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Email: example123@gmail.com
            </p>
            <a
              href="#"
              className="underline text-lg font-medium text-blue-500 mb-6 block"
            >
              Customer Support
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#D69ADE] hover:bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] transition-all text-black hover:text-white rounded-lg p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  aria-label="Customer Support"
                >
                  Customer Support
                </h3>
                <p className="text-gray-700 hover:text-white">
                  For general inquiries and assistance.
                </p>
              </div>
              <div className="bg-[#D69ADE] hover:bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] transition-all text-black hover:text-white rounded-lg p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  aria-label="Customer Feedback"
                >
                  Customer Feedback
                </h3>
                <p className="text-gray-700 hover:text-white">
                  Share your thoughts and suggestions.
                </p>
              </div>
              <div className="bg-[#D69ADE] hover:bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] transition-all text-black hover:text-white rounded-lg p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  aria-label="Media Inquiries"
                >
                  Media Inquiries
                </h3>
                <p className="text-gray-700 hover:text-white">
                  For press and media-related questions.
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-lg  shadow-lg shadow-blue-600/50 p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-800 mb-6">You can reach us anytime</p>

              <form onSubmit={handleSubmit}>
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
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First Name"
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
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.1a.5.5 0 00.15.35l7 7a.5.5 0 00.35.15H16a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm5.7 1.91A6.97 6.97 0 0110 9.893 6.97 6.97 0 0114.293 6.1c.177-.178.36-.36.552-.552A2.5 2.5 0 0016 5V4c0-.55-.21-.975-.552-1.31A2.5 2.5 0 0013.148 2.552 7.02 7.02 0 009.028 3.09z"
                        />
                      </svg>
                    </div>
                    <select
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-500 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="+977">+977 (Nepal)</option>
                      <option value="+1">+1 (USA)</option>
                      <option value="+91">+91 (India)</option>
                    </select>
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
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message"
                    maxLength="120"
                  ></textarea>
                  <p className="text-gray-800 text-sm mt-1">0/120</p>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
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
      <div className="location-container mt-12 flex flex-col md:flex-row px-4">
        <div className="locationMap md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113085.33583457788!2d84.32349143692478!3d27.658047437493362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb37e078d531%3A0x973f22922ea702f7!2sBharatpur%2044200!5e0!3m2!1sen!2snp!4v1740031122154!5m2!1sen!2snp"
            referrerPolicy="no-referrer-when-downgrade" 
            width="100%" 
            height="450"
            loading="lazy"
            title="Bharatpur. Location" 
          ></iframe>
        </div>

        <div className="location  md:w-1/2 md:pl-14 p-18  ">
          <h2 className="text-4xl font-semibold mb-4">Our Location</h2>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Connecting Near and Far
          </p>
          <h3 className="text-2xl font-semibold mb-2">Headquarters</h3>
          <p className="text-gray-700 text-lg">Code Arena</p>
          <p className="text-gray-700 text-lg">Chitwan, Nepal</p>
          <p className="text-gray-700 text-lg">TechByte</p>
          <p className="text-gray-700 text-lg">Bharatpur, Ward-12</p>
          <a
            href="" 
            className="text-blue-500 text-2xl underline mt-4 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Google Maps
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            {/* Left side: Question and Email Input */}
            <div className="bg-gray-100 rounded-lg shadow-blue-600/50  shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
              <p className="text-gray-900 mb-6">
                Do you have any questions for us?
              </p>
              <p className="text-gray-900 mb-6">
                If there are questions you want to ask. We will answer all your
                questions.
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
                />
                <button className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            {/* Right side: FAQ Items */}
            <div className="bg-gray-100 rounded-lg shadow-lg shadow-blue-600/50 p-8">
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
                        expanded[index]? "rotate-180": ""
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
      </div>
      </div>
    </>
  );
};
export default Contact;