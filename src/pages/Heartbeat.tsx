import React, { useEffect, useState } from "react";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import client from "../services/HttpClient";

interface HeartbeatResponse {
  status: string;
  components: {
    db: {
      status: string;
    }
  }
}

function Heartbeat() {
  const [backendStateIsHealthy, setBackendState] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState(false);

  useEffect(() => {
    client
      .get<HeartbeatResponse>({ url: `${process.env.REACT_APP_HEARTBEAT_URL}` })
      .then((resp: HeartbeatResponse) => {
        if (resp.status === "UP") setBackendState(true);
        if (resp.components.db.status === "UP") setDatabaseStatus(true);
      });
  }, []);

  return (
    <>
      <h1>Health check</h1>
      <p>Backend status:</p>
      {backendStateIsHealthy ? (
        <div role="backendIsUp">
          <DoneOutlineIcon />
        </div>
      ) : (
        <div role="backendIsDown">
          <CancelIcon />
        </div>
      )}
      <p>Database status:</p>
      {databaseStatus ? (
        <div role="databaseIsUp">
          <DoneOutlineIcon />
        </div>
      ) : (
        <div role="databaseIsDown">
          <CancelIcon />
        </div>
      )}
    </>
  );
}

export default Heartbeat;
