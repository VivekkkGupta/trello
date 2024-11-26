import React, { useEffect, useState } from "react";
import Loginform from "./Loginform";
import Signupform from "./Signupform";
import { useAuthContext } from "../../contexts/AuthContext";

function LoginPageLayout() {
  const { isSignInPage, handleSignInAndSignUpButton, handleInputBox, userInputData, userInputErrors, handleLoginButton } = useAuthContext();

  const [signInOrSignUpText, setSignInOrSignUpText] = useState("");

  useEffect(() => {
    if (isSignInPage === true) {
      setSignInOrSignUpText("Sign In");
    } else {
      setSignInOrSignUpText("Sign Up");
    }
  }, [isSignInPage]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-xl flex justify-center flex-1 overflow-hidden">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="w-full flex justify-center">
            <h1 className="text-6xl font-bold text-indigo-700 tracking-tighter">
              Trello
            </h1>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              {signInOrSignUpText}
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    {/* Google Logo */}
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">{signInOrSignUpText} with Google</span>
                </button>

                {/* <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                  <div className="bg-white p-1 rounded-full">
                    <svg className="w-6" viewBox="0 0 32 32">
                      <path
                        fillRule="evenodd"
                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">{signInOrSignUpText} with GitHub</span>
                </button> */}
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or {signInOrSignUpText.toLowerCase()} with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                {
                  isSignInPage ?
                    "" : (
                      <>
                        <input
                          onChange={handleInputBox}
                          className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  ${userInputErrors.username ? "border-red-500" : "border-gray-200 mb-5"}`}
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={userInputData.username}
                        />
                        {userInputErrors.username && (
                          <div className={`text-red-500 text-xs ml-2 mt-2  ${userInputErrors.username ? "mb-5" : "border-gray-200"}`}>{userInputErrors.username}</div>
                        )}
                      </>
                    )
                }
                <input
                  onChange={handleInputBox}
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  ${userInputErrors.email ? "border-red-500" : "border-gray-200"}`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userInputData.email}
                />
                {userInputErrors.email && (
                  <div className="text-red-500 text-xs ml-2 mt-2">{userInputErrors.email}</div>
                )}
                <input
                  onChange={handleInputBox}
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${userInputErrors.password ? "border-red-500" : "border-gray-200"}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userInputData.password}
                />
                {userInputErrors.password && (
                  <div className="text-red-500 text-xs ml-2 mt-2">{userInputErrors.password}</div>
                )}
                {
                  isSignInPage ?
                    "" : (
                      <>
                        <input
                          onChange={handleInputBox}
                          className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${userInputErrors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={userInputData.confirmPassword}
                        />
                        {userInputErrors.confirmPassword && (
                          <div className="text-red-500 text-xs ml-2 mt-2">{userInputErrors.confirmPassword}</div>
                        )}
                      </>
                    )
                }

                <button
                  onClick={handleLoginButton}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  {isSignInPage ? (
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.0222 21.4135 8.08879 20.3147 6.4443C19.2159 4.79981 17.6541 3.51808 15.8268 2.76121C13.9996 2.00433 11.9889 1.8063 10.0491 2.19215C8.10929 2.578 6.32746 3.53041 4.92893 4.92893" />
                      <path d="M15 12L15.7809 11.3753L16.2806 12L15.7809 12.6247L15 12ZM3 13C2.44771 13 2 12.5523 2 12C2 11.4477 2.44771 11 3 11V13ZM11.7809 6.3753L15.7809 11.3753L14.2191 12.6247L10.2191 7.6247L11.7809 6.3753ZM15.7809 12.6247L11.7809 17.6247L10.2191 16.3753L14.2191 11.3753L15.7809 12.6247ZM15 13H3V11H15V13Z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                  )}

                  <span className="ml-3">{signInOrSignUpText}</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  {isSignInPage
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <a
                    onClick={() => handleSignInAndSignUpButton()}
                    className="border-b border-gray-500 border-dotted text-[1rem] text-indigo-700 cursor-pointer"
                  >
                    {isSignInPage ? "Sign Up" : "Sign In"}
                  </a>
                </p>
                <p className="mt-3 text-xs text-gray-600 text-center">
                  I agree to abide by Trello's
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    &nbsp;Terms of Service&nbsp;
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    &nbsp;Privacy Policy&nbsp;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-indigo-100 flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageLayout;
