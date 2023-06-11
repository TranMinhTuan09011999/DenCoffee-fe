import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticateComponent } from './non-authenticate.component';

describe('NonAuthenticateComponent', () => {
  let component: NonAuthenticateComponent;
  let fixture: ComponentFixture<NonAuthenticateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
