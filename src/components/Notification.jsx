import { Alert } from "@mui/material";

const Notification = (open, message, severity) => {
  return (
    <div>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};
export default Notification;
