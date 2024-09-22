/* eslint-disable no-unused-vars */
import conf from "../conf/conf.js";
import { Client, ID, Storage, Account } from "appwrite";

export class ProfileService {
  client = new Client();
  profileBucket;  // Bucket for profile images
  account;        // Account service for user actions

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.profileBucket = new Storage(this.client);  // Profile images bucket
    this.account = new Account(this.client);        // Account service to manage user actions
  }

  // Profile picture upload and management
  async uploadProfilePicture(file) {
    try {
      const uploadedFile = await this.profileBucket.createFile(
        conf.profilePictureBucketId,
        ID.unique(),
        file
      );
      const profilePictureUrl = uploadedFile.$id;

      // Update user preferences with new profile picture
      const user = await this.account.get();
      await this.account.updatePrefs({ profilePicture: profilePictureUrl });

      console.log("Profile picture uploaded successfully:", profilePictureUrl);
      return profilePictureUrl;
    } catch (error) {
      console.error("ProfileService :: uploadProfilePicture :: error", error.message);
      throw new Error('Failed to upload profile picture');
    }
  }

  async deleteProfilePicture(fileId) {
    try {
      await this.profileBucket.deleteFile(conf.profilePictureBucketId, fileId);
      return true;
    } catch (error) {
      console.error("ProfileService :: deleteProfilePicture :: error", error.message);
      return false;
    }
  }

  getProfilePicturePreview(fileId) {
    return this.profileBucket.getFilePreview(conf.profilePictureBucketId, fileId).href; // Return correct URL
  }
}

const profileService = new ProfileService();
export default profileService;
