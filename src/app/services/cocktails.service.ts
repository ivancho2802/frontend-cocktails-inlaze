import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlApi, key } from './config';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  apiUrl = urlApi + key;

  constructor(
    private http: HttpClient,

  ) { }

  getMorePopuarCocktail(){
    return this.http.get<any>(this.apiUrl  + '/popular.php')
  }

  getCocktailById(id:string){
    return this.http.get<any>(this.apiUrl + '/lookup.php?i='+id)
  }

  getCategories(){
    return this.http.get<any>(this.apiUrl + '/list.php?c=list' )
  }

  getCocktailsFilter(query: any | null){
    return this.http.get<any>(this.apiUrl + '/' +query)
  }

  getCocktailsByCategory(){
    return this.http.get<any>(this.apiUrl + '/list.php?c=list' )
  }

  getCocktailsByIngredient(name:string){
    return this.http.get<any>(this.apiUrl + '/filter.php?i='+name )
  }
}
