import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppComponent } from '../../app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ HomeComponent ],
      providers: [AppComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`validation have filter all letters`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);

    fixture.detectChanges();
 
    let letters:any = fixture.debugElement.queryAll(By.css('.breadcrumb-item'));

    expect(letters.length).toEqual(27);

  })

  
  it(`should have all or asome records`, async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    setTimeout(() => {

      //let imagesCards = fixture.nativeElement.query(By.css(".card"));
      let items:any = fixture.debugElement.queryAll(By.css('div.inlaze-item'))
      //let imagesCards:any = fixture.debugElement.queryAll(By.css('button'))
      console.log("items", items)
  
      expect(items.length).not.toEqual(0);

    }, 1000);
  });
});


