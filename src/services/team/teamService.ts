import client, { API_ENDPOINT } from "../infrastructure/ApiClient";
import {
  CreateTeamRequest,
  GetTeamResponse,
  GetTeamsResponse,
  TeamByUser
} from "./Team";

type CreateTeamResponse = {
  teamId: string;
};

type GenerateJoinLinkResponse = {
  link: string;
};

class TeamService {
  async getTeamsByUser(): Promise<TeamByUser[]> {
    const response: GetTeamsResponse = await client.get({
      route: API_ENDPOINT.GET_TEAMS
    });

    return response.teams;
  }

  async createTeam(team: CreateTeamRequest): Promise<CreateTeamResponse> {
    return await client.post({
      route: API_ENDPOINT.CREATE_TEAM,
      body: { team }
    });
  }

  async getTeamById(id: string): Promise<GetTeamResponse> {
    return await client.get({
      route: API_ENDPOINT.GET_TEAM,
      queryParams: { id },
    });
  }

  async generateJoinLink(teamId: string): Promise<GenerateJoinLinkResponse> {
    const resp: { token: string } = await client.post({
      route: ROUTES.GENERATE_JOIN_LINK,
      body: { teamId },
    });

    return { link: `${window.location.origin}/join/${resp.token}` };
  }
}

const teamService = new TeamService();

export default teamService;
