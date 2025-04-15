import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreeFormComponent } from './refree-form.component';

describe('RefreeFormComponent', () => {
  let component: RefreeFormComponent;
  let fixture: ComponentFixture<RefreeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
