import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmortizationPage } from './amortization.page';

describe('AmortizationPage', () => {
  let component: AmortizationPage;
  let fixture: ComponentFixture<AmortizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmortizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmortizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
