
import { INITIAL_USER, useUserContext } from '@/contextApi/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/Mutations'
import { Outlet, useNavigate } from 'react-router-dom'


const RootLayout = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated} = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen gap-6'>
    <div className='bg-red p-6'>Header</div>
    
        <Outlet/>


    <div className='bg-red p-6'>Footer</div>
    <button className='bg-green-300 text-black p-6' onClick={(e) => handleSignOut(e)}>SignOut</button>
    </div>
  )
}

export default RootLayout