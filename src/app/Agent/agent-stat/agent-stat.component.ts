import { AgentStat } from './../Models/AgentStat';
import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-agent-stat',
  templateUrl: './agent-stat.component.html',
  styleUrls: ['./agent-stat.component.scss']
})
export class AgentStatComponent implements OnInit {

  totalRegisteredAgents: number = 0;
  totalUnRegisteredAgents: number = 0;
  constructor(private service: AgentService,) { }

  ngOnInit(): void {

    const counter = timer(0,5000);
    counter.subscribe( n => {
      this.service.GetAgentStat().subscribe( res => {
        this.totalRegisteredAgents = res.totalRegisteredAgents;
        this.totalUnRegisteredAgents = res.totalUnRegisteredAgents;

        console.log('agent stat updated');
      })
    }) ;

  }

}
