import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import client from "../infrastructure/HttpClient";
import {Settings} from "../infrastructure/Settings";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  async createTeam(team: Team): Promise<string> {
    const resp: CreateTeamResponse = await client.post({
      url: Settings.getApiUrl() + "/create-team",
      body: { team },
    });
    return resp.teamId;
  }
}

const teamService = new TeamService();

export default teamService;
