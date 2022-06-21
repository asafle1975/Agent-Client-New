import { environment } from "src/environments/environment";

export const BaseUrl = `${environment.apiUrl}/Agents`;
export const AgentUrl = {
  GetAgentById: `${BaseUrl}/GetAgentById`,
  AddNewAgent: `${BaseUrl}/AddNewAgent`,
  GetAllAgents: `${BaseUrl}/GetAllAgents`,
  UnregisterAgent: `${BaseUrl}/UnregisterAgent`,
  DeleteAgnet: `${BaseUrl}/DeleteAgnet`,
  SetAgentHeartBit: `${BaseUrl}/SetAgentHeartBit`,
  GetAgentStat: `${BaseUrl}/GetAgentStat`,
}
