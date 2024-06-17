import firebase_app from "../config";
import { getDatabase } from "firebase/database";

const database = getDatabase(firebase_app);
export { database };
