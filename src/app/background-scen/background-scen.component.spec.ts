import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundScenComponent } from './background-scen.component';

describe('BackgroundScenComponent', () => {
  let component: BackgroundScenComponent;
  let fixture: ComponentFixture<BackgroundScenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundScenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundScenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
