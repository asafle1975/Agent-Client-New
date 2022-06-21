import { AgentStat } from './Models/AgentStat';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../General/data.service';
import { AgentUrl } from './AgentConfig';
import { AgentInfo } from './Models/AgentInfo';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private dataService: DataService) { }


GetAgentById(agentId: number):Observable<AgentInfo>{

    return this.dataService.getHttp<AgentInfo>(AgentUrl.GetAgentById, { agentId: agentId })
    .pipe(

    );
   }


   GetAllAgents():Observable<Array<AgentInfo>>{

     return this.dataService.getHttp<Array<AgentInfo>>(AgentUrl.GetAllAgents);
  }

  AddNewAgent(agentName: string):Observable<Array<AgentInfo>>{
    var options = new HttpParams().set('agentName', agentName.toString()) ;

    return this.dataService.postHttp<Array<AgentInfo>>(AgentUrl.AddNewAgent, options);
 }

 AgentHeartbit(agentId: number):Observable<Array<AgentInfo>>{
  var options = new HttpParams().set('agentId', agentId.toString()) ;

  return this.dataService.postHttp<AgentInfo>(AgentUrl.SetAgentHeartBit, options);
}

GetAgentStat():Observable<AgentStat>{
  let agentStat = this.dataService.getHttp<AgentStat>(AgentUrl.GetAgentStat);
  return agentStat;
}


 UnregisterAgent(agentId: number):Observable<Array<AgentInfo>>{
    var options = new HttpParams().set('agentId', agentId.toString()) ;

    return this.dataService.postHttp<Array<AgentInfo>>(AgentUrl.UnregisterAgent, options);
  }

  DeleteAgnet(agentId: number):Observable<Array<AgentInfo>>{
    var options = new HttpParams().set('agentId', agentId.toString()) ;

    return this.dataService.postHttp<Array<AgentInfo>>(AgentUrl.DeleteAgnet, options);
  }
}
