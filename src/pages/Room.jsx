import { useEffect } from "react";
import {DATABASE_ID, PROJECT_ID, COLLECTION_ID_MESSAGES, databases} from "../appwriteConfig.js";

const Room = () => {
    useEffect(() => {
        getMessages();
    }, []);
    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID);
    };

    return <>Room</>;
};
export default Room;
