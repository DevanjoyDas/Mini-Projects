import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Loader from "@/components/common-components/Loader"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/Mutations"

import { useUserContext } from "@/contextApi/AuthContext"

const SignUpFormSchema = z.object({
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." })
  })


const SignUpForm = () => {

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  const handleSignup = async (user: z.infer<typeof SignUpFormSchema>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        return;
      }
    } catch (error) {
      console.log({ error });
    }

  }



  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create an account
        </h2>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red"/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red"/>
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-400 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm