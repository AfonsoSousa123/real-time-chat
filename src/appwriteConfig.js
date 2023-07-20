import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = "64b7ebd3b63ba7a74165";
export const DATABASE_ID = "64b7ef6fbc5aba634599";
export const COLLECTION_ID_MESSAGES = "64b7ef7d66e0e815d045";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64b7ebd3b63ba7a74165");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
