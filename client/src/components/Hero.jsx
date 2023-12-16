import React from 'react';

const Hero = () => {
  return (
    <>
      <section className="hero-section relative">
        <div className="overlay absolute inset-0 z-0 bg-gradient-to-t from-gray-900 to-gray-600 opacity-75"></div>

        <div className="hero-text absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Discover 3000+ Money-Making Startups</h1>
          <p className="text-base md:text-lg mt-4 md:mt-6 text-white w-11/12 md:w-10/12 roboto tracking-wide">
            Access the entire spectrum of startup insights and resources, all consolidated under one roof
          </p>
          <a href="#startups">
            <button className="px-6 md:px-8 py-2 md:py-3 bg-transparent border border-white-500 text-white hover:bg-white hover:text-black font-bold rounded-lg transition cursor-pointer duration-300">
              Get Started
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
