'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-gray-500 mt-12">
      © {new Date().getFullYear()} Kohabit. All rights reserved.
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-col justify-center flex-grow pt-24">
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-16 md:py-20 gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Find your perfect{' '}
              <span className="text-indigo-600">cohabitant</span>.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0">
              Kohabit helps you connect with compatible roommates — people who share your lifestyle, habits, and vibe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link
                href="/auth/signUp"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 text-center"
              >
                Get Started
              </Link>
              <a
                href="#learn-more"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300 text-center cursor-pointer"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div className="rounded-2xl md:rounded-tl-[4rem] md:rounded-bl-[4rem] md:rounded-tr-none md:rounded-br-none overflow-hidden shadow-xl w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%]">
              <Image
                src="/hero1.jpeg"
                alt="Kohabit hero"
                width={600}
                height={500}
                className="object-cover w-full h-auto max-h-[400px] sm:max-h-[500px]"
                priority
              />
            </div>
          </div>
        </section>

        <section
          id="learn-more"
          className="px-6 sm:px-10 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700">3,200+</h3>
            <p className="text-gray-500 text-sm sm:text-base">Matches Found</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700">150+</h3>
            <p className="text-gray-500 text-sm sm:text-base">Cities Covered</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-700">95%</h3>
            <p className="text-gray-500 text-sm sm:text-base">Compatibility Accuracy</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
