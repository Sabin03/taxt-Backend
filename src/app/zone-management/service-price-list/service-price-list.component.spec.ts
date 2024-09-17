import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePriceListComponent } from './service-price-list.component';

describe('ServicePriceListComponent', () => {
  let component: ServicePriceListComponent;
  let fixture: ComponentFixture<ServicePriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePriceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicePriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
