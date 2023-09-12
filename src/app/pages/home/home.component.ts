import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { AppComponent } from '../../app.component';
import { CockteilDataModel, CockteilsDataModel, CockteilsModel, CockteilDetailDataModel } from '../../interfaces/cockteils-model'
import { dataDummy, nameImagesBackgrgound, alphabet, dls } from '../../services/config';
import { CategoriesModel } from '../../interfaces/categories-model'
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

/* import jsdom from "jsdom";
const { JSDOM } = jsdom; */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cocktails_') pdfTable: ElementRef | any;

  public cocktailpopular: CockteilsModel | any = null
  public cocktails: CockteilsModel[] = [];
  public categories: CategoriesModel[] = [];
  public cocktailsGroups: any[] = [];
  public cocktailsGroupsAux: any[] = [];
  public nameImagesBackgrgound: any[] = nameImagesBackgrgound;
  public alphabetData: string[] = alphabet;
  public filterByLetter: string | null = '';
  public filterByIngredient: string | null = '';
  public filterByName: string | null = '';



  constructor(
    public cocktailsService: CocktailsService,
    public appComponent: AppComponent,
    public helperService: HelperService,
    public activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadImagesBackground();
    this.getMorePopuarCocktail();
    this.filterByLetter = this.activatedroute.snapshot.paramMap.get("f")
    this.filterByIngredient = this.activatedroute.snapshot.paramMap.get("i")
    this.filterByName = this.activatedroute.snapshot.paramMap.get("s")
    console.log(this.filterByName)

    setTimeout(() => { 
      this.getCocktailsByAlcoholic();
    }, 1000);
  }

  /**
   * make get cocktails from api for the cocktail more populate
   * Observable @CockteilDataModel
   */
  getMorePopuarCocktail() {
    this.cocktailsService.getMorePopuarCocktail()
      .subscribe((cocktailDatapopular: CockteilDataModel) => {

        this.cocktailpopular = cocktailDatapopular.drinks

        let id = this.cocktailpopular?.idDrink;
        let dummyData: any = null

        if (id == "1") {
          id = dataDummy.idDummy;
          dummyData = dataDummy
        }

        if (id) {

          this.cocktailsService.getCocktailById(id)
            .subscribe((cocktailDatapopular: CockteilDetailDataModel) => {
              console.log("getMorePopuarCocktail - getCocktailById", cocktailDatapopular);

              let drinks: any[] = cocktailDatapopular.drinks

              this.cocktailpopular = drinks[0];

              if (dummyData) {
                this.cocktailpopular.strDescription = dataDummy.descriptionDummy
                this.cocktailpopular.strDrinkThumb = dataDummy.strDrinkThumb
              }

            }, (errorcocktailpopular) => {
              console.log("getMorePopuarCocktail - errorcocktailpopular", errorcocktailpopular);
              let msg = ''

              this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
            })

        }


      }, (errorcoctailpopular) => {
        console.log("getMorePopuarCoctail - errorcoctailpopular", errorcoctailpopular);
        let msg = ''

        this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
      })
  }

  /**
   * get the cocktail alcoholic or filter
   * Observable @CockteilsDataModel
   */
  async getCocktailsByAlcoholic() {

    let allProds: any = dls.drinks;

    this.cocktails = allProds;

    allProds = await this.setImageDls(allProds);

    this.cocktails = allProds;

    console.log("allProds", this.cocktails);

    this.cocktailsGroups = this.helperService.split(this.cocktails, 12);

    this.cocktailsGroupsAux = this.cocktailsGroups;

    this.fixArrayImagesBackground();
    return;


    if (!this.filterByLetter && !this.filterByIngredient && !this.filterByName) {
      this.getCocktailsNoAlcoholic()
    } else {

      this.cocktailsGroups = this.helperService.split(this.cocktails, 8);

      this.cocktailsGroupsAux = this.cocktailsGroups;
      this.fixArrayImagesBackground();

    }

    let filter = ""

    if (this.filterByLetter) {
      filter = "search.php?f=" + this.filterByLetter;
    } else if (this.filterByIngredient) {
      filter = "filter.php?i=" + this.filterByIngredient;
    } else if (this.filterByName) {
      filter = "search.php?s=" + this.filterByName;
    } else {
      filter = "filter.php?a=Alcoholic"
    }

    this.cocktailsService.getCocktailsFilter(filter)
      .subscribe((cocktailsData: CockteilsDataModel) => {
        console.log("getMorePopuarCocktail - cocktailsData", cocktailsData);
        console.log("getMorePopuarCocktail - cocktailsData length", cocktailsData.drinks.length);

        this.cocktails = cocktailsData.drinks;

        if (!this.filterByLetter && !this.filterByIngredient && !this.filterByName) {
          this.getCocktailsNoAlcoholic()
        } else {

          this.cocktailsGroups = this.helperService.split(this.cocktails, 8);

          this.cocktailsGroupsAux = this.cocktailsGroups;
          this.fixArrayImagesBackground();

        }

      }, (errorcategories) => {
        console.log("getMorePopuarCocktail - errorcategories", errorcategories);
        let msg = ''

        this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
      })

  }

  /**
   * get the cocktail no alcoholic
   * Observable @CockteilsDataModel
   */
  getCocktailsNoAlcoholic() {

    let filter = "filter.php?a=Non_Alcoholic"

    this.cocktailsService.getCocktailsFilter(filter)
      .subscribe((cocktailsData: CockteilsDataModel) => {
        console.log("getMorePopuarCocktail - getCocktailsNoAlcoholic cocktailsData", cocktailsData);
        console.log("getMorePopuarCocktail - cocktailsData length", cocktailsData.drinks.length);

        this.cocktails = this.cocktails.concat(cocktailsData.drinks);

        this.cocktailsGroups = this.helperService.split(this.cocktails, 8);

        this.cocktailsGroupsAux = this.cocktailsGroups;

        console.log("getCocktailsNoAlcoholic cocktailsGroups", this.cocktailsGroups);
        this.fixArrayImagesBackground();

      }, (errorcategories) => {
        console.log("getMorePopuarCocktail - errorcategories", errorcategories);
        let msg = ''

        this.appComponent.presentAlertOptions("Error", "obteniendo datos", msg, null, null, false);
      })

  }

  /**
   * in this function ajust array with the names of file for the background 
   * for repead for show images of form proportional to this.cocktailsGroups
   */
  fixArrayImagesBackground() {

    try {
      let lengthCocktailsGroups = this.cocktailsGroups.length;

      let arrayCustom: any[] = [];

      console.log("arrayCustom", arrayCustom)
      console.log("this.nameImagesBackgrgound", this.nameImagesBackgrgound)
      console.log("lengthCocktailsGroups", lengthCocktailsGroups)
      console.log("while", lengthCocktailsGroups > this.nameImagesBackgrgound.length)

      while (this.nameImagesBackgrgound.length !== 0 && lengthCocktailsGroups > this.nameImagesBackgrgound.length) {
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

  /**
   * Air/Water Syringe Tip Bag 250 Pcs
   * air-water-syringe-tip-bag-250-pcs-30
   * @param name 
   */
  fixLink(name: String) {
    let resultName = '';

    resultName = name.toLowerCase();
    resultName = resultName.replaceAll(' ', '-');

    return resultName;
  }

  public downloadPDF(): void {

    let DATA: any = document.getElementById('cocktails_');
    html2canvas(DATA).then((canvas) => {

      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm', [216, 279]);
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      doc.save('Downld.pdf');


      /* let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', [297, 210]);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf'); */
    });

  }

  async getBase64ImageFromUrl(url: string) {

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = async () => {

        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx: any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  async getBase64ImageFromFile(url: string) {//: Promise<Observable<string>>

    let img = await fetch(url).then(function (response) {
      return response.blob();
    });

    console.log("getBase64ImageFromFile img", img)

    return new Promise((resolve) => {
      const reader: any = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(img);
    });


    /*  const reader:any = new FileReader();
     reader.onloadend = () => {return (reader.result)};
     reader.readAsDataURL(img); */

    /* convertFile(file : File) { : Observable<string>{*/

    /* const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(img);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result; */
    /* }*/ 
  }

  async setImageDls(allProds: any[]) {

    let urlimagedls = 'https://dlsmedicalusa.odoo.com/web/image?model=product.template&field=image_1920&id=';

    let allProdsFormat: any[] = [];

    allProds.map(async (cocktail) => {
      if (cocktail?.id) {
        cocktail.strDrinkThumb = await this.getBase64ImageFromUrl(urlimagedls + cocktail?.id).then();
      } else {
        cocktail.strDrinkThumb = cocktail.strDrinkThumb + '/preview';

      }
      return cocktail
      allProdsFormat.push(cocktail);
    });

    allProdsFormat = allProds;

    return allProdsFormat;
  }

  loadImagesBackground() {
    let arrayCustom: any[] = []

    this.nameImagesBackgrgound.forEach(async (el) => {
      let resImage64: any = await this.getBase64ImageFromFile('../../../assets/cocktails/' + el).then();
      arrayCustom.push(resImage64);
    });

    this.nameImagesBackgrgound = arrayCustom
  }

}
