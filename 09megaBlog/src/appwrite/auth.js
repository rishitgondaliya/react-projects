import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return await this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log("Appwrite service :: create account :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getAccount :: error", error);
    }
    return null;
  }

  async updateUser({ name, email, password }) {
    try {
      const currentUser = await this.getCurrentUser();
  
      // Update name if it has changed
      if (name && name !== currentUser.name) {
        await this.account.updateName(name);
      }
  
      // Only update the email if it has changed, and password is provided
      if (email && email !== currentUser.email && password) {
        await this.account.updateEmail(email, password);
      }
  
    } catch (error) {
      if (error.code === 409) {
        // Handle case where email already exists
        console.error("Error: The email is already in use by another account.");
        throw new Error("Email already exists. Please use a different email.");
      } else {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    }
  }
  

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
