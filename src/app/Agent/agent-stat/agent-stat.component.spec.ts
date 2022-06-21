import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentStatComponent } from './agent-stat.component';

describe('AgentStatComponent', () => {
  let component: AgentStatComponent;
  let fixture: ComponentFixture<AgentStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
