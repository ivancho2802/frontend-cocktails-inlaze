import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { AppComponent } from '../../app.component';
import { CockteilDataModel, CockteilsDataModel, CockteilsModel, CockteilDetailDataModel } from '../../interfaces/cockteils-model'
import { dataDummy, nameImagesBackgrgound, alphabet } from '../../services/config';
import { CategoriesModel } from '../../interfaces/categories-model'
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cocktailpopular: CockteilsModel | any = null
  public cocktails:CockteilsModel[]= [];
  public categories:CategoriesModel[] = [];
  public cocktailsGroups:any[] = [];
  public cocktailsGroupsAux:any[] = [];
  public nameImagesBackgrgound:any[] = nameImagesBackgrgound;
  public alphabetData:string[] = alphabet;
  public filterByLetter:string|null = '';
  public filterByIngredient:string|null = '';
  public filterByName:string|null = '';

  constructor(
    public cocktailsService: CocktailsService,
    public appComponent: AppComponent,
    public helperService: HelperService,
    public activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getMorePopuarCocktail();
    this.filterByLetter = this.activatedroute.snapshot.paramMap.get("f")
    this.filterByIngredient = this.activatedroute.snapshot.paramMap.get("i")
    this.filterByName = this.activatedroute.snapshot.paramMap.get("s")
    console.log(this.filterByName)
    this.getCocktailsByAlcoholic();
  }

  /**
   * make get cocktails from api for the cocktail more populate
   * Observable @CockteilDataModel
   */
  getMorePopuarCocktail(){
    this.cocktailsService.getMorePopuarCocktail()
    .subscribe((cocktailDatapopular: CockteilDataModel )=>{
      console.log("getMorePopuarCocktail - getMorePopuarCocktail", cocktailDatapopular);

      this.cocktailpopular = cocktailDatapopular.drinks

      let id = this.cocktailpopular?.idDrink;
      let dummyData:any = null

      if(id == "1"){
        id = dataDummy.idDummy;
        dummyData = dataDummy
      }

      if(id){

        this.cocktailsService.getCocktailById(id)
        .subscribe((cocktailDatapopular: CockteilDetailDataModel )=>{
          console.log("getMorePopuarCocktail - getCocktailById", cocktailDatapopular);

          let drinks: any[] = cocktailDatapopular.drinks
    
          this.cocktailpopular = drinks[0];

          if(dummyData){
            this.cocktailpopular.strDescription = dataDummy.descriptionDummy
            this.cocktailpopular.strDrinkThumb = dataDummy.strDrinkThumb
          }

        }, (errorcocktailpopular)=>{
          console.log("getMorePopuarCocktail - errorcocktailpopular", errorcocktailpopular);
          let msg = ''
    
          this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
        })

      }
      

    }, (errorcoctailpopular)=>{
      console.log("getMorePopuarCoctail - errorcoctailpopular", errorcoctailpopular);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
    })
  }

  /**
   * get the cocktail alcoholic or filter
   * Observable @CockteilsDataModel
   */
  getCocktailsByAlcoholic(){

    let filter = ""
    
    if(this.filterByLetter){
      filter = "search.php?f=" + this.filterByLetter;
    } else if (this.filterByIngredient) {
      filter = "filter.php?i=" + this.filterByIngredient;
    } else if (this.filterByName) {
      filter = "search.php?s=" + this.filterByName;
    } else {
      filter = "filter.php?a=Alcoholic"
    }
    
    this.cocktailsService.getCocktailsFilter(filter)
    .subscribe((cocktailsData: CockteilsDataModel )=>{
      console.log("getMorePopuarCocktail - cocktailsData", cocktailsData);
      console.log("getMorePopuarCocktail - cocktailsData length", cocktailsData.drinks.length);

      this.cocktails = cocktailsData.drinks;

      if(!this.filterByLetter && !this.filterByIngredient && !this.filterByName){
        this.getCocktailsNoAlcoholic()
      } else {
 
        this.cocktailsGroups = this.helperService.split(this.cocktails, 8);
  
        this.cocktailsGroupsAux = this.cocktailsGroups;
        this.fixArrayImagesBackground();

      }

    }, (errorcategories)=>{
      console.log("getMorePopuarCocktail - errorcategories", errorcategories);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
    })

  }

  /**
   * get the cocktail no alcoholic
   * Observable @CockteilsDataModel
   */
  getCocktailsNoAlcoholic(){

    let filter = "filter.php?a=Non_Alcoholic"

    this.cocktailsService.getCocktailsFilter(filter)
    .subscribe((cocktailsData: CockteilsDataModel )=>{
      console.log("getMorePopuarCocktail - getCocktailsNoAlcoholic cocktailsData", cocktailsData);
      console.log("getMorePopuarCocktail - cocktailsData length", cocktailsData.drinks.length);

      this.cocktails = this.cocktails.concat(cocktailsData.drinks);
 
      this.cocktailsGroups = this.helperService.split(this.cocktails, 8);

      this.cocktailsGroupsAux = this.cocktailsGroups;

      console.log("getCocktailsNoAlcoholic cocktailsGroups", this.cocktailsGroups);
      this.fixArrayImagesBackground();

    }, (errorcategories)=>{
      console.log("getMorePopuarCocktail - errorcategories", errorcategories);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
    })
    
  }

  /**
   * in this function ajust array with the names of file for the background 
   * for repead for show images of form proportional to this.cocktailsGroups
   */
  fixArrayImagesBackground(){

    try {
      let lengthCocktailsGroups = this.cocktailsGroups.length;
  
      console.log("lengthCocktailsGroups", lengthCocktailsGroups)
      console.log("while", lengthCocktailsGroups > this.nameImagesBackgrgound.length)
  
      while (lengthCocktailsGroups > this.nameImagesBackgrgound.length) {
        let lengthOld = this.nameImagesBackgrgound.length;
        console.log("lengthOld", lengthOld)
  
        for (let index = 0; index < lengthOld; index++) {
          const element = this.nameImagesBackgrgound[index];
          this.nameImagesBackgrgound.push(element);
        }
      }
      
    } catch (error) {
      
      console.log("getDetailCocktailById - error", error);
      let msg = ''

      this.appComponent.presentAlertOptions("Error", "validando datos", msg, null, null, false);
    }

  }

}
