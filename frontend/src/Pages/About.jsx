import React from 'react'
import meeting3 from "../assets/meeting3.jpg";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">About Us</h1>
        <p className="text-lg text-center mt-4 max-w-2xl mx-auto">
          Welcome to CodeArena, where innovation meets collaboration! We are a vibrant community of developers, designers, and tech enthusiasts dedicated to pushing the boundaries of creativity and technology. Our mission is to empower individuals and teams to turn their ideas into reality through hackathons, workshops, and collaborative projects. Join us on this exciting journey as we explore the limitless possibilities of code and creativity!
        </p>


  <div className="flex flex-col lg:flex-row items-center py-14 bg-[rgb(242,233,245)] gap-[100px] lg:gap-[200px] px-6 md:px-20 my-[100px]">
        <img
          src={meeting3}
          alt="Meeting"
          className="w-full lg:w-[440px] h-[400px] md:h-[600px] object-cover rounded-tr-[40px] rounded-bl-[40px] rounded-br-[40px] shadow-xl"
        />
        <div className="w-full">
          <h4 className="text-blue-400 underline text-xl md:text-2xl mb-4 font-semibold">
            ABOUT US
          </h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Building More Business Competition
          </h2>
          <p className="text-base md:text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            eligendi odio cupiditate, minus consectetur provident placeat, atque
            magni libero culpa unde reprehenderit molestias vel repellat? Dolor
            nulla quia eveniet quod.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-base md:text-lg">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-[#D69ADE]"
                />
                <p>Technology Services</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-full sm:w-[260px]">
              <p className="text-2xl md:text-3xl font-bold">
                10<sup>+</sup>
              </p>
              <p className="text-sm md:text-lg font-medium">
                Years of Experience
              </p>
            </div>
            <div className="flex items-center border border-dotted border-black p-4 gap-4 w-full sm:w-[260px]">
              <p className="text-2xl md:text-3xl font-bold">
                70<sup>k</sup>
              </p>
              <p className="text-sm md:text-lg font-medium">
                Individual Customers
              </p>
            </div>
          </div>
          <button className="cursor-pointer bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-2 px-6 rounded-lg text-base md:text-lg">
            Learn More &rarr;
          </button>
        </div>
      </div>

              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 px-6 md:px-20 my-[100px]">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              At CodeArena, our mission is to foster a culture of innovation and collaboration. We believe that by bringing together diverse minds, we can create solutions that make a difference in the world. Whether you're a seasoned developer or just starting your journey, we provide the resources and support you need to succeed.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-lg">
              Ready to take your skills to the next level? Join us for our upcoming hackathons and workshops! Connect with like-minded individuals, learn from industry experts, and showcase your talents. Together, we can build amazing things!
            </p>
          </div>        
      </div>

      </div>
        <div className="flex justify-center mt-10 mb-20">
            <button className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] text-white py-2 px-6 rounded-lg text-base md:text-lg">
            Get Started &rarr;
            </button>
            </div>
            <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Values</h2>
            <p className="text-lg text-center max-w-2xl mx-auto mb-10">
              We value creativity, collaboration, and continuous learning. Our community is built on the principles of respect, inclusivity, and support. We believe that everyone has something valuable to contribute, and we encourage open communication and knowledge sharing.
              </p>
           </div>
    </>
  );
}

export default About;
