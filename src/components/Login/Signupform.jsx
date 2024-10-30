import { useTrelloContext } from "../../contexts/TrelloContext";

const Signupform = () => {
    const {signupClicked,setSignupClicked,handleSignupButton}= useTrelloContext()
    return (
        <>
            <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-10 w-[50%]'>
                <label htmlFor="username" className='text-lg font-[500]'>Email</label>
                <input type="text" id="username" className='outline-0 px-3 py-2 rounded-md shadow-sm w-full' />
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-10 w-[50%]'>
                <label htmlFor="password" className='text-lg font-[500]'>Password</label>
                <input type="password" id="password" className='outline-0 px-3 py-2 rounded-md shadow-sm w-full' />
            </div>
            <div className='w-[50%] h-12 flex flex-col md:flex-row justify-around items-center gap-5'>
                <button className='w-full bg-slate-400 py-2 px-3 rounded-md font-[500] hover:bg-slate-500 duration-200 transition-all' onClick={handleSignupButton}>Go to login</button>
                <button className='w-full bg-green-500 py-2 px-3 rounded-md font-[500] hover:bg-green-600 duration-200 transition-all'>Sign up</button>
            </div>
        </>
    )
}

export default Signupform;