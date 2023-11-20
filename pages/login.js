import React, { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("DJ@4");
  const [password, setPassword] = useState("Dhunjam@2023");

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);

    setEmail("");

    setPassword("");
    if (response.success) {
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.id);
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`);
        }, 1000);
      } else {
        localStorage.removeItem("token");
      }

      //   localStorage.setItem("token", response.token);
    } else {
      console.log(response.error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center h-screen">
        <div>
          <h1 className="text-3xl font-bold text-center">Venue Admin Login</h1>

          {/* login */}
          <div>
            <div
              className="
          flex flex-col
          min-w-[30vw]
          shadow-md
          px-4
          sm:px-6
          md:px-8
       
          py-8
          rounded-3xl
        "
            >
              <div className="">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-5">
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="
                    text-sm
                    placeholder-gray-500
                    pl-2
                    pr-4
                   rounded-lg
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-rose-400
                    bg-pink-50 text-black
                  "
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-6">
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className="
                    text-sm
                    placeholder-gray-500
                    pl-2
                    pr-4
                   rounded-lg
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-rose-400
                    bg-pink-50 text-black
                  "
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-4">
                    <button
                      type="submit"
                      className="
                  flex
                  
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-deep-purple-700
                  hover:bg-rose-600
                 rounded-lg
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                    >
                      <span className="mr-2 uppercase">Sign In</span>
                      <span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-center mt-2">
                    <span className="text-sm">New Registration ?</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* login */}
        </div>
      </div>
    </div>
  );
};

export default Login;
