import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaqueriaDetailPage } from './taqueria-detail.page';

describe('TaqueriaDetailPage', () => {
  let component: TaqueriaDetailPage;
  let fixture: ComponentFixture<TaqueriaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaqueriaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaqueriaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
