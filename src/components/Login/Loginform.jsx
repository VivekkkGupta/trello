import { useState } from "react";
import { useTrelloContext } from "../../contexts/TrelloContext";
import { useAuthContext } from "../../contexts/AuthContext";

const Loginform = () => {
  const {
    signupClicked,
    setSignupClicked,
    handleSignupButton,
    userInputData,
    setUserInputData,
    userInputErrors,
    setUserInputErrors,
    handleInputBox,
    handleLoginButton,
  } = useAuthContext();

  

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-[50%]">
        <label htmlFor="email" className="text-lg font-[500]">
          Email
        </label>
        <input
          onChange={handleInputBox}
          type="text"
          name="email"
          id="email"
          className="outline-0 px-3 py-2 rounded-md shadow-sm w-full"
          value={userInputData.email}
        />
      </div>
      <div className="text-red-500">{userInputErrors.email}</div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-[50%] mt-5">
        <label htmlFor="password" className="text-lg font-[500]">
          Password
        </label>
        <input
          onChange={handleInputBox}
          type="password"
          name="password"
          id="password"
          className="outline-0 px-3 py-2 rounded-md shadow-sm w-full"
          value={userInputData.password}
        />
      </div>

      {userInputErrors.password && (
        <div className="text-red-500">{userInputErrors.password}</div>
      )}

      <div className="w-[50%] h-12 flex flex-col md:flex-row justify-around items-center gap-5 mt-5">
        <button
          onClick={handleSignupButton}
          className="w-full bg-slate-400 py-2 px-3 rounded-md font-[500] hover:bg-slate-500 duration-200 transition-all"
        >
          Register
        </button>
        <button
          onClick={handleLoginButton}
          type="submit"
          className="w-full bg-green-500 py-2 px-3 rounded-md font-[500] hover:bg-green-600 duration-200 transition-all"
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default Loginform;
