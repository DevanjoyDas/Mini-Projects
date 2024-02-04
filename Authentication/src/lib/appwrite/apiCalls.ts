import { account, appwriteConfig, avatars, databases} from "./configuration";
import { ID, Query} from "appwrite";

type NewUser = {
    email: string;
    password: string;
    username: string;
  };




export async function createUserAccount(user: NewUser) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(user.username);
  
      const newUser = await saveUserToDB({
        username: newAccount.name,
        email: newAccount.email,
          accountId: newAccount.$id,
          profileImageUrl: avatarUrl,
      });
  
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  // ============================== SAVE USER TO DB
  export async function saveUserToDB(user: {
      username: string;
      email: string;
      accountId: string;
      profileImageUrl: URL;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
  
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== SIGN IN
  export async function signInAccount(user: { email: string; password: string }) {
    try {
      const session = await account.createEmailSession(user.email, user.password);
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }

