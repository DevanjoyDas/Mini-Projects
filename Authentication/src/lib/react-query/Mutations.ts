import { useMutation} from "@tanstack/react-query";
import {createUserAccount,signInAccount, signOutAccount } from "../appwrite/apiCalls";


type NewUser = {
    email: string;
    password: string;
    username: string;
  };


  export const useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: NewUser) => createUserAccount(user),
    });
  };


  export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signInAccount(user),
    });
  };

  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount
    });
  };