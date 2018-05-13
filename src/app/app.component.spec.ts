import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { default as fakeJs } from "../assets/js/fake-api";
import { Incident } from 'src/app/app.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let unsortedLst = new Array<Incident>();
  let objInc = new Incident(null, 1, 'test', 'faulty', 'look into', 1);
  let objInc1 = new Incident(null,1, 'test', 'faulty', 'look into', 2);
  unsortedLst.push(objInc); 
  unsortedLst.push(objInc1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [

      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('sorted method should return sorted list', () => {
    component.sorted(unsortedLst);
    const list=component.incidents.length;    
    expect(list).not.toBe(0);
  });
});
