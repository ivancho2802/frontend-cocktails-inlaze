export interface CockteilsModel {
    "idDrink": string
    "strDrink": string
    "strDescription"?: string

    "strDrinkAlternate"?: string

    "strTags"?: string
    "strVideo"?: string
    "strCategory"?: string
    "strIBA"?: string
    "strAlcoholic"?: string
    "strGlass"?: string
    "strInstructions"?: string
    "strInstructionsES"?: string
    "strInstructionsDE"?: string
    "strInstructionsFR"?: string
    "strInstructionsIT"?: string
    "strInstructionsZH-HANS"?: string
    "strInstructionsZH-HANT"?: string
    "strDrinkThumb"?: string
    "strIngredient1"?: string
    "strIngredient2 "?: string
    "strIngredient3"?: string
    "strIngredient4"?: string
    "strIngredient5"?: string
    "strIngredient6"?: string
    "strIngredient7"?: string
    "strIngredient8"?: string
    "strIngredient9 "?: string
    "strIngredient10"?: string
    "strIngredient11"?: string
    "strIngredient12"?: string
    "strIngredient13"?: string
    "strIngredient14"?: string
    "strIngredient15"?: string
    "strMeasure1"?: string
    "strMeasure2"?: string
    "strMeasure3"?: string
    "strMeasure4"?: string
    "strMeasure5"?: string
    "strMeasure6"?: string
    "strMeasure7"?: string
    "strMeasure8"?: string
    "strMeasure9"?: string
    "strMeasure10"?: string
    "strMeasure11"?: string
    "strMeasure12 "?: string
    "strMeasure13"?: string
    "strMeasure14"?: string
    "strMeasure15"?: string
    "strImageSource"?: string
    "strImageAttribution"?: string
    "strCreativeCommonsConfirmed"?: string
    "dateModified"?: string
}

export interface CockteilDataModel {
    "drinks": CockteilsModel
}

export interface CockteilsDataModel {
    "drinks": CockteilsModel[] | any[]
}

export interface CockteilDetailDataModel {
    "drinks": CockteilsModel | any[] | any
}

export interface CockteilsIngredientsDataModel {
    "ingredients": CockteilsIngredientsModel | any[] | any
}

export interface CockteilsIngredientsModel {
    "idDrink": string
    "strDrink": string
    "strDrinkAlternate": string | null
    "strTags":  string | null
    "strVideo":  string | null,
    "strCategory":  string | null
    "strIBA":  string | null
    "strAlcoholic":  string | null
    "strGlass":  string | null
    "strInstructions":  string | null
    "strInstructionsES":  string | null
    "strInstructionsDE":  string | null
    "strInstructionsFR": string | null
    "strInstructionsIT":  string | null
    "strInstructionsZH-HANS":  string | null
    "strInstructionsZH-HANT":  string | null
    "strDrinkThumb":  string | null
    "strIngredient1":  string | null
    "strIngredient2":  string | null
    "strIngredient3":  string | null
    "strIngredient4":  string | null
    "strIngredient5":  string | null
    "strIngredient6":  string | null
    "strIngredient7":  string | null
    "strIngredient8":  string | null
    "strIngredient9":  string | null
    "strIngredient10":  string | null
    "strIngredient11":  string | null
    "strIngredient12":  string | null
    "strIngredient13":  string | null
    "strIngredient14":  string | null
    "strIngredient15":  string | null
    "strMeasure1":  string | null
    "strMeasure2":  string | null
    "strMeasure3":  string | null
    "strMeasure4":  string | null
    "strMeasure5":  string | null
    "strMeasure6":  string | null
    "strMeasure7":  string | null
    "strMeasure8":  string | null
    "strMeasure9":  string | null
    "strMeasure10":  string | null
    "strMeasure11":  string | null
    "strMeasure12":  string | null
    "strMeasure13":  string | null
    "strMeasure14":  string | null
    "strMeasure15":  string | null
    "strImageSource":  string | null
    "strImageAttribution":  string | null
    "strCreativeCommonsConfirmed":  string | null
    "dateModified":  string | null
}