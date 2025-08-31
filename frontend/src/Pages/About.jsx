import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLightbulb,
  faUsers,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import aboutUsHeroImage from "../assets/aboutusheroimage.jpg";
import aboutUsHeroImage2 from "../assets/aboutusheroimage2.jpg";
import aboutUsCoding1 from "../assets/aboutuscoding1.jpg";
import aboutUsCoding2 from "../assets/aboutuscoding2.jpg";
import reward from "../assets/reward.jpg";
import growth from "../assets/growrh.jpg";
import collaboration from "../assets/collaboration.jpg";
import hackathon3 from "../assets/hackathon3.jpg";
import chatting from "../assets/chatting.jpg";
import innovation from "../assets/innovation.jpg";

const About = () => {
  return (
    <>
      <div className="pt-[80px]">
        <div
          className="h-[600px] bg-gray-300"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 70% 100%, 0% 87.5%)",
          }}
        >
          <div
            className="bg-cover bg-center h-[520px] flex items-center px-[150px] text-white"
            style={{
              backgroundImage: `url(${aboutUsHeroImage})`,
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 90%, 70% 100%, 40% 90%, 0% 100%)",
            }}
          >
            <div className="w-[500px]">
              <p className="text-4xl underline font-bold pb-5 text-orange-300">
                About Us
              </p>
              <p className="text-6xl pb-4">
                Unleashing Potential, Building the Future of Tech
              </p>
              <p className="text-gray-400 pb-5">
                We believe that coding is more than just writing lines of
                code—it's about creating, learning, and growing together. Join
                us in shaping a better tomorrow through technology.
              </p>
              <p>
                <Link to="/" className="pr-2 ">
                  Home
                </Link>{" "}
                <span className="text-orange-300">&rarr;</span>{" "}
                <Link to="/about" className="pl-2 text-orange-300">
                  About
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="px-[140px] flex gap-20 items-center py-24 h-[700px]">
          <div className="w-[600px]">
            <div>
              <div className="text-5xl text-orange-400 font-bold">
                Providing full range{" "}
              </div>
              <span className="text-5xl text-blue-300 font-bold">
                of transportation
              </span>
            </div>
            <div className="pt-8 text-xl pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              quod consequatur temporibus provident numquam
            </div>
            <div className=" text-xl pb-14">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              quod consequatur temporibus provident numquam labore dolorem
              laborum tempore distinctio autem
            </div>
            <button className="bg-orange-400 text-white px-8 py-2 cursor-pointer text-lg rounded-md">
              Learn More &rarr;
            </button>
          </div>
          <div className="relative w-[50%] h-full">
            <img
              src={aboutUsCoding1}
              alt=""
              className="w-[400px] h-[300px] object-cover rounded-xl absolute left-0 top-0"
            />
            <img
              src={aboutUsCoding2}
              alt=""
              className="w-[300px] h-[200px] object-cover rounded-xl absolute bottom-15 right-0"
            />
            <div className="shadow-[0px_0px_5px_#7F8CAA] inline-block p-4 rounded-md  absolute top-65 right-62 bg-white">
              <p className="text-orange-400 text-center text-3xl font-bold">
                20 +
              </p>
              <p>Year Experience</p>
            </div>
          </div>
        </div>
        <div className="px-[140px] pb-20 flex justify-between">
          {/* Card 1 */}
          <div className="relative w-[400px] overflow-hidden bg-white shadow-[0px_0px_5px_#7F8CAA] py-4 px-8 rounded-lg group cursor-pointer">
            {/* Sliding background */}
            <div className="absolute inset-0 w-0 bg-[#113F67] group-hover:w-full transition-all duration-500 ease-in-out"></div>

            {/* Content */}
            <div className="relative z-10">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-orange-400 text-3xl pb-2 group-hover:text-white transition-colors duration-500"
              />
              <h4 className="text-2xl text-slate-600 font-bold pb-2 group-hover:text-white transition-colors duration-500">
                Experience & Expertise
              </h4>
              <p className="text-gray-700 group-hover:text-white transition-colors duration-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolores nam explicabo placeat.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-[400px] overflow-hidden bg-white shadow-[0px_0px_5px_#7F8CAA] py-4 px-8 rounded-lg group cursor-pointer">
            <div className="absolute inset-0 w-0 bg-[#113F67] group-hover:w-full transition-all duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-orange-400 text-3xl pb-2 group-hover:text-white transition-colors duration-500"
              />
              <h4 className="text-2xl text-slate-600 font-bold pb-2 group-hover:text-white transition-colors duration-500">
                Innovation & Creativity
              </h4>
              <p className="text-gray-700 group-hover:text-white transition-colors duration-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, repellat!
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative w-[400px] overflow-hidden bg-white shadow-[0px_0px_5px_#7F8CAA] py-4 px-8 rounded-lg group cursor-pointer">
            <div className="absolute inset-0 w-0 bg-[#113F67] group-hover:w-full transition-all duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-orange-400 text-3xl pb-2 group-hover:text-white transition-colors duration-500"
              />
              <h4 className="text-2xl text-slate-600 font-bold pb-2 group-hover:text-white transition-colors duration-500">
                Trusted Solutions
              </h4>
              <p className="text-gray-700 group-hover:text-white transition-colors duration-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                ducimus.
              </p>
            </div>
          </div>
        </div>

        <div
          className="py-20 bg-gray-300"
          style={{
            clipPath:
              "polygon(0% 10%, 40% 0%, 100% 10%, 100% 10%, 100% 94%, 75% 88%, 0% 90%)",
          }}
        >
          <div
            className="relative bg-cover bg-center h-[580px] px-[150px] text-white"
            style={{
              backgroundImage: `url(${aboutUsHeroImage2})`,
              clipPath:
                "polygon(0% 5%, 40% 0%, 70% 5%, 100% 0%, 100% 100%, 75% 90%, 0% 100%)",
            }}
          >
            {/* Gray overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content (stays above overlay) */}
            <div className="relative flex justify-center items-center h-full text-center">
              <div className="w-[620px]">
                <p className="text-6xl pb-8 font-bold">
                  Explore Insights From Our Team
                </p>
                <p className="text-gray-200 text-xl pb-16">
                  Dive into articles, stories, and updates where our team shares
                  knowledge, experiences, and the latest trends in technology.
                  Stay inspired and keep learning with us.
                </p>
                <p>
                  <Link to="/blog">
                    <button className="bg-orange-400 text-lg px-8 py-2  rounded-md cursor-pointer hover:bg-orange-300">
                      Explore Now &rarr;
                    </button>
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center px-[150px] gap-30 py-22 ">
          <div className="flex gap-7 text-white">
            <div>
              {/* Image 1 → Red Gradient Overlay */}
              <div
                className="relative w-[270px] h-[340px] mb-7 bg-cover bg-center rounded-md "
                style={{ backgroundImage: `url(${innovation})` }}
              >
                <div className="absolute inset-0 rounded-md p-10 flex flex-col justify-center bg-[linear-gradient(to_top,rgba(255,128,64,0.9),rgba(255,128,64,0.9))]">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-5xl pb-4"
                  />
                  <h1 className="text-center font-bold text-xl pb-2">
                    Innovation & Ideas
                  </h1>
                  <p className="text-center text-sm">
                    Lorem ipsum dolor sit, amet consectetur elit. Quasi
                    repudiandae dolorem rerum
                  </p>
                </div>
              </div>

              {/* Image 2 → Blue Gradient Overlay */}
              <div
                className="relative w-[270px] h-[324px] bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${aboutUsCoding1})` }}
              >
                <div className="absolute inset-0 rounded-md p-10 flex flex-col justify-center bg-[linear-gradient(to_top,rgba(19,29,79,0.9),rgba(19,29,79,0.9))]">
                  <FontAwesomeIcon
                    icon={faBullseye}
                    className="text-5xl pb-4"
                  />
                  <h1 className="text-center font-bold text-xl pb-2">
                    Collaborate for Future
                  </h1>
                  <p className="text-center text-sm">
                    Lorem ipsum dolor sit, amet consectetur elit. Quasi
                    repudiandae dolorem rerum
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-10">
              {/* Image 3 → Plain */}
              <img
                src={hackathon3}
                alt=""
                className="w-[270px] rounded-md h-[340px] object-cover mb-7"
              />

              {/* Image 4 → Green Gradient Overlay */}
              <div
                className="relative w-[270px] h-[340px] bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${chatting})` }}
              >
                <div className="absolute inset-0 rounded-md p-10 flex flex-col justify-center bg-[linear-gradient(to_top,rgba(22,163,74,0.9),rgba(22,163,74,0.9))]">
                  <FontAwesomeIcon icon={faUsers} className="text-5xl pb-4" />
                  <h1 className="text-center font-bold text-xl pb-2">
                    Team Messaging
                  </h1>
                  <p className="text-center text-sm">
                    Lorem ipsum dolor sit, amet consectetur elit. Quasi
                    repudiandae dolorem rerum
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-5xl font-bold pb-4">
              Who We <span className="text-orange-400">Are ?</span>
            </h2>
            <div className="text-lg pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              at, a iure sint, cupiditate qui expedita amet dicta, sunt porro
              quia quam nesciunt deserunt libero temporibus nihil nostrum ea ad!
            </div>
            <div className="pb-8 text-lg">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              at, a iure sint, cupiditate qui expedita amet dicta, sunt porro
              quia quam nesciunt deserunt libero temporibus nihil nostrum ea ad!
            </div>
            <div className="text-lg flex flex-col gap-3">
              <p>
                <span className="text-orange-400 font-bold mx-2 ">
                  &#10003;
                </span>{" "}
                Offer Team Collaboration
              </p>
              <p>
                <span className="text-orange-400 font-bold mx-2 ">
                  &#10003;
                </span>{" "}
                Interaction with Global Mentors
              </p>

              <p>
                <span className="text-orange-400 font-bold mx-2 ">
                  &#10003;
                </span>{" "}
                Rewards for Your Ideas
              </p>
              <p>
                <span className="text-orange-400 font-bold mx-2 ">
                  &#10003;
                </span>{" "}
                Offer Team Collaboration
              </p>
            </div>
            <button className="bg-orange-400 text-white px-8 py-2 cursor-pointer rounded-md mt-12 text-lg">Learn More <span>&rarr;</span></button>
          </div>
        </div>
        <div className="px-[150px] py-10">
          <h1 className="text-center text-5xl font-bold">
            Powerful Features to Enhance
          </h1>
          <p className="text-center font-bold text-5xl pb-16 text-orange-400">
            Your Hackathon
          </p>
          <div className="flex gap-5 pb-5 text-white">
            {/* Card 1 */}
            <div
              className="relative group w-[820px] h-[280px] rounded-xl cursor-pointer bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${collaboration})` }}
            >
              {/* Overlay background that grows on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent translate-y-[60%] group-hover:translate-y-0 transition-all duration-500"></div>

              {/* Text container sliding up */}
              <div className="absolute bottom-3 left-0 w-full p-5 transform translate-y-[60%] group-hover:translate-y-0 transition-all duration-500">
                <h2 className="font-bold text-xl">Community & Collaboration</h2>
                <p className="text-sm mt-2 w-[500px]">
                  Form teams, chat with peers, and collaborate in real-time.
                  Message with team and collaborate globally
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="relative group w-[380px] h-[280px] rounded-xl cursor-pointer bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${reward})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70  to-transparent translate-y-[60%] group-hover:translate-y-0 transition-all duration-500"></div>

              <div className="absolute bottom-3 left-0 w-full p-5 transform translate-y-[60%] group-hover:translate-y-0 transition-all duration-500">
                <h2 className="font-bold text-xl">Engagement & Rewards</h2>
                <p className="text-sm mt-2">
                  Earn badges, prizes, and showcase your achievements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-5 pb-5 text-white">
            {/* Card 3 */}
            <div
              className="relative group w-[380px] h-[280px] rounded-xl cursor-pointer bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${growth})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent translate-y-[60%] group-hover:translate-y-0 transition-all duration-500"></div>

              <div className="absolute bottom-3 left-0 w-full p-5 transform translate-y-[60%] group-hover:translate-y-0 transition-all duration-500">
                <h2 className="font-bold text-xl">Career Growth</h2>
                <p className="text-sm mt-2">
                  Get discovered by recruiters and add projects to your
                  portfolio.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="relative group w-[820px] h-[280px] rounded-xl cursor-pointer bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${aboutUsHeroImage2})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent translate-y-[60%] group-hover:translate-y-0 transition-all duration-500"></div>

              <div className="absolute bottom-5 left-0 w-full p-5 transform translate-y-[60%] group-hover:translate-y-0 transition-all duration-500">
                <h2 className="font-bold text-xl">Hackathon Ecosystem</h2>
                <p className="text-sm mt-2 w-[500px]">
                  Join global hackathons with multiple tracks and real-time
                  judging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
