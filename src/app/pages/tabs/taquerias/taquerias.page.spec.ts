import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaqueriasPage } from './taquerias.page';

describe('TaqueriasPage', () => {
  let component: TaqueriasPage;
  let fixture: ComponentFixture<TaqueriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaqueriasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaqueriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
