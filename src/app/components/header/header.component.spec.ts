import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from '@angular/platform-browser'

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Menu'`, () => {
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance; 
    let title = fixture.nativeElement.querySelector('.nav-link.active');

    console.log("appasdasdasdasd", title.textContent)
    expect(title.textContent).toEqual('Menu');
  });
});
