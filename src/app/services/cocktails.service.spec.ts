import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient  } from '@angular/common/http';
import { CocktailsService } from './cocktails.service';


describe('CocktailsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CocktailsService, HttpClient ]
  }));

  it('should be created', () => {
    const service: CocktailsService = TestBed.get(CocktailsService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: CocktailsService = TestBed.get(CocktailsService);
    expect(service.getCategories).toBeTruthy();
  });

});
