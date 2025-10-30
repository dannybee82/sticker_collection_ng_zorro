import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateStickerComponent } from './create-or-update-sticker.component';

describe('CreateOrUpdateStickerComponent', () => {
  let component: CreateOrUpdateStickerComponent;
  let fixture: ComponentFixture<CreateOrUpdateStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateStickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
