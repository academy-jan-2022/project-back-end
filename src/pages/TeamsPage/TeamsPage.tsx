import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import TeamService from "../../services/team/teamService";
import { TeamByUser } from "../../services/team/Team";
import TeamCard from "../../components/Team/TeamCard";
import "./team.css";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamByUser[]>([]);

  const getTeams = async () => {
    const teams = await TeamService.getTeamsByUser();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamCards = teams.map((team, index) => {
    return (
      <Grid xs={6} md={4} className="team-card" key={team.name + index}>
        <TeamCard team={team} />
      </Grid>
    );
  });

  return (
    <PageTemplate>
      <h1 aria-label="title">Teams</h1>
      <Button
        variant="outlined"
        className="create-team-btn"
        onClick={() => navigate("/create-team")}
      >
        Create New Team
      </Button>
      <Grid
        container
        spacing={2}
        mt={2}
        width={"80%"}
        className="team-list-container"
      >
        {renderTeamCards}
      </Grid>
    </PageTemplate>
  );
};

export default TeamsPage;
