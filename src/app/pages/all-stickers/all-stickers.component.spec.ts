import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStickersComponent } from './all-stickers.component';

describe('AllStickersComponent', () => {
  let component: AllStickersComponent;
  let fixture: ComponentFixture<AllStickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStickersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllStickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
