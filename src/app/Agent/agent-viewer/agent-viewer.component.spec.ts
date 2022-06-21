import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentViewerComponent } from './agent-viewer.component';

describe('AgentViewerComponent', () => {
  let component: AgentViewerComponent;
  let fixture: ComponentFixture<AgentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
