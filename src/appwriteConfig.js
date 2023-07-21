import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = import.meta.env.VITE_PROJECT;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID_MESSAGES = import.meta.env
  .VITE_COLLECTION_ID_MESSAGES;

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT);

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
