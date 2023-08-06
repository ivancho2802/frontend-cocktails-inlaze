import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailsService } from '../../services/cocktails.service';
import { CockteilsModel, CockteilDetailDataModel } from '../../interfaces/cockteils-model'
import { AppComponent } from '../../app.component';
import { urlApiIngredientesImages, languages } from '../../services/config';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public filter: string | null = '';
  public cocktailDetail: CockteilsModel | any = null
  public cocktailIngredientes: any[] = []//CockteilsIngredientsModel[] | 
  public instructions: any[] = []
  public language: string = 'EN'
  public languages: string[] = languages;
  public instructionsNote: string = '';

  constructor(
    public activatedroute: ActivatedRoute,
    public cocktailsService: CocktailsService,
    public appComponent: AppComponent,
    public helperService: HelperService,

  ) { }

  ngOnInit(): void {
    this.filter = this.activatedroute.snapshot.paramMap.get("param");

    this.getDetailCocktailById();
  }

  /**
   * get cocktail by id 
   * @CockteilDetailDataModel
   * @CockteilDetailModel
   */
  getDetailCocktailById() {

    if (this.filter) {

      this.cocktailsService.getCocktailById(this.filter)
        .subscribe((cocktailDataDetail: CockteilDetailDataModel) => {
          console.log("getDetailCocktailById - getCocktailById", cocktailDataDetail);

          let drinks: any[] = cocktailDataDetail.drinks

          this.cocktailDetail = drinks[0];

          this.makeIngredinents();
          this.makeInstructions();

        }, (errorcocktaildetail) => {
          console.log("getDetailCocktailById - errorcocktaildetail", errorcocktaildetail);
          let msg = ''

          this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, {});
        })

    }
  }

  /**
   * set fix for order data for show detail from model cocktial geteed
   * @CockteilsModel
   */
  makeIngredinents() {

    try {

      let cocktailIngredientes = []
      for (let index = 1; index <= 15; index++) {
        let strIngredient = this.cocktailDetail['strIngredient' + index];
        let strMeasure = this.cocktailDetail['strMeasure' + index];
  
        if (strIngredient) {
          cocktailIngredientes.push({
            "strMeasure": strMeasure,
            "strDrink": strIngredient,
            "strDrinkThumb": urlApiIngredientesImages + strIngredient + "-Medium.png"
          });
  
        }
  
      }
  
      this.cocktailIngredientes = this.helperService.split(cocktailIngredientes, 6);
      console.log("this.cocktailIngredientes", this.cocktailIngredientes)
      console.log("cocktailIngredientes", cocktailIngredientes)
      
    } catch (error) {
      
      console.log("getDetailCocktailById - error", error);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "validando datos", msg, null, null, {});
    }
  }

  /**
   * get array from model cocktail for make data of  form dynamic
   * @returns null 
   */
  makeInstructions() {

    try {
    
      this.instructions = []
  
      if (this.cocktailDetail?.strInstructions) {
  
        let strInstructions: any[] = this.getInstructionsBylanguage(this.language);
  
        if (strInstructions.length == 0) {
          return
        }
  
        let index = strInstructions.findIndex(el => el.includes('Note:') || el.includes('NOTE:'));
  
        console.log("index", index)
  
        if (index !== -1) {
          this.instructionsNote = strInstructions[index]
          strInstructions.splice(index, 1)
        }
  
        strInstructions.forEach(el => {
          if (el) {
            this.instructions.push(el)
          }
        })
  
      }
      
    } catch (error) {
      
      console.log("getDetailCocktailById - error", error);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "validando datos", msg, null, null, {});
    }
  }

  /**
   * is for deploy filter of languajes for show makeInstructions 
   * @param event 
   */
  choose(event: any) {
    this.makeInstructions()
  }

  /**
   * for show correct instructions for the selection of languaje
   * @param currentlanguage 'EN', 'ES',   'DE',    'FR',    'IT'
   * @returns 
   */
  getInstructionsBylanguage(currentlanguage: string) {

    try {

      if (this.cocktailDetail.length == 0) {
        return []
      }
  
      let strInstructions: any[] = []
  
      if (currentlanguage == 'EN') {
        currentlanguage = ''
      }
  
      strInstructions = this.cocktailDetail['strInstructions' + currentlanguage].split('.');
  
      return strInstructions
      
    } catch (error) {
      
      console.log("getDetailCocktailById - error", error);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "validando datos", msg, null, null, {});
      return []
    }
  }

}
