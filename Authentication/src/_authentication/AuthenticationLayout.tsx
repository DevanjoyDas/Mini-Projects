import { Outlet } from 'react-router-dom'

const AuthenticationLayout = () => {
  return (
    <>
    <img
      src="/assets/images/side-image.jpg"
      alt="logo"
      className="hidden xl:block h-screen w-[60%] object-cover bg-no-repeat"
    />
    <section className="flex flex-1 justify-center items-center flex-col py-10">
      <Outlet />
    </section>

  </>
  )
}

export default AuthenticationLayout