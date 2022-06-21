export class AgentInfo {
  id: number;
  name: string;
  status: AgentStatus;
  createDate: Date;
  updateDate: Date;
}

export enum AgentStatus{
  Register,
  UnRegistered
}
