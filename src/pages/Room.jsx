import { useEffect, useState } from "react";
import client, {
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
  databases,
} from "../appwriteConfig.js";
import { ID, Permission, Query, Role } from "appwrite";

import { Trash2 } from "react-feather";
import Header from "../components/Header.jsx";
import { useAuth } from "../utils/AuthContext.jsx";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [toggleAlert, setToggleAlert] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    // fetches the messages
    getMessages();
    setLoading(false);

    const unsubscribe = client.subscribe(
      [
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      ],
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        // console.log("REAL TIME: ", response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create",
          )
        ) {
          // console.log("A MESSAGE WAS CREATED: ");
          setMessages((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete",
          )
        ) {
          // console.log("A MESSAGE WAS DELETED!!!: ");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id),
          );
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [Permission.write(Role.user(user.$id))];

    // Sends the message
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions,
    );

    // Sets the message body
    setMessageBody("");
    // console.log("Created", response);
  };
  const getMessages = async () => {
    // Get the messages
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(10)],
    );
    // console.log("RESPONSE:", response);

    // Sets the message body
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    // Updates the state of the messages
    // setMessages((prevState) =>
    //   messages.filter((message) => message.$id !== message_id),
    // );
  };

  return (
    <main className={"container"}>
      <Header />

      <div className="room--container">
        <form onSubmit={handleSubmit} id={"message--form"}>
          <div>
            <textarea
              required
              maxLength={"1000"}
              placeholder={"Say Something..."}
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className={"send-btn--wrapper"}>
            <input
              type={"submit"}
              className={"btn btn--secondary"}
              value={"Send"}
            />
          </div>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {messages.map((message) => (
              <div key={message.$id} className="message--wrapper">
                <div className={"message--header"}>
                  <p>
                    {message.username ? (
                      <span className={""}>{message.username}</span>
                    ) : (
                      <span className={""}>Anounymous user</span>
                    )}

                    <small className={"message-timestamp"}>
                      {new Date(message.$createdAt).toLocaleString()}
                    </small>
                  </p>

                  {message.$permissions.includes(
                    `delete("user:${user.$id}")`,
                  ) && (
                    <Trash2
                      className={"delete--btn"}
                      onClick={() => {
                        deleteMessage(message.$id);
                      }}
                    />
                  )}
                </div>
                <div className={"message--body"}>
                  <span>{message.body}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default Room;
