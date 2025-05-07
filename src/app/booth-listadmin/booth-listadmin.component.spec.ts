import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothListadminComponent } from './booth-listadmin.component';

describe('BoothListadminComponent', () => {
  let component: BoothListadminComponent;
  let fixture: ComponentFixture<BoothListadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoothListadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoothListadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
