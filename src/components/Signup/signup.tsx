"use client"

import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { userSignup } from "@/lib/axios";
import { useRouter } from 'next/navigation';

export default function SignupForm() {

  const router = useRouter();
  const [submitTimes, setSubmitTimes] = useState(0);
  const [errCode, setErrCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    c_password: ""
  });

  const usernameRegex: RegExp = /^(?=.{8,20}$)[a-zA-Z0-9._-]+$/;
  const passwordRegex: RegExp = /^(?=.{8,20}$)[a-zA-Z0-9!@#$%^&*_-]+$/;

  const submitHandler = (event: any) => {
    event.preventDefault();
    console.log(submitTimes);
    setErrCode(null);
    switch(submitTimes) {
      case 0:
        handleDefualtCase();
        break;
      case 1:
        handleCheckedCase();
        break;
    }
  }

  const handleDefualtCase = () => {
    if (!usernameRegex.test(formData.username.toString())) {
      setErrCode("IllgalUsername");
      return;
    }
    if (!passwordRegex.test(formData.password.toString())) {
      setErrCode("IllegalPassword")
      return;
    }

    setSubmitTimes(1);
  }

  const handleCheckedCase = () => {
    if (formData.password !== formData.c_password) {
      setErrCode("PasswordMismatch");
      return;
    }

    handleCreateAccount();
  }

  const handleCreateAccount = async () => {
    try {
      const { username, password } = formData;
      const response = await userSignup(username, password);

      console.log(response);

      console.log("Signup successful:", response);

      router.push('/chat');
      
    } catch (error) {
      console.error("Error during Signup:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
                    className="mx-auto h-10 w-auto"
                    src="/logo.svg"
                    alt="Katharsis-logo"
                    width={10}
                    height={10}
                />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to create your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              {errCode === "IllgalUsername" && (
                <p className="text-sm leading-6 text-red-400">* Username must be between 8 and 20 characters.</p>
              )}
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {errCode === "IllegalPassword" && (
                <p className="text-sm leading-6 text-red-400">* Password must be between 8 and 20 characters and can contain letters, numbers, and special characters.</p>
              )}

              {submitTimes > 0 && ( 
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="c_password" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="c_password"
                      name="c_password"
                      type="password"
                      autoComplete="new-password"
                      required={submitTimes > 0} 
                      value={formData.c_password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              {errCode === "PasswordMismatch" && (
                <p className="text-sm leading-6 text-red-400">* Both Passwords do not match.</p>
              )}

              <div>
                <button
                  onClick={(event) => submitHandler(event)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
                <a href="/login" className="text-indigo-600 hover:underline font-semibold">Login here</a>
            </div>
          </div>
        </div>
      </>
    )
  }
  