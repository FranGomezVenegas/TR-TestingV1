export const UpdateIngredient={
    search:{label: "* Project", value: "Procaps", press:"CapsLock", action: "Search"},
    windowFormulation: "Formulation",

    selectFormula:{label: "formula3", locator: "div"},
    selectIngredient:{label: "Gelatina 50 false prueba nota"},
    buttonUpdateIngredient: {label: "playlist_add"},

    fldQuantity: {label: "* Quantity", value: "50"},    
    fldUom: {label: "* UOM", value: "g"},
    fldNotes: {label: "* Notes", value: "prueba nota", press: "ArrowLeft"},

    buttonAccept:{label:"Accept"},
    buttonCancel:{label:"Cancel"},

    screenShotsWindowFormulation: "Formulation",
    screenShotsSelectFormula: "Select Formula",
    screenShotsformFilled: "Form Filled",
    screenShotsformEmpty: "Form Empty",
    scrennShotsSearch: "Search",
    screenShotsClickAccept: "Accept",
    screenShotsClickCancel: "Cancel",

    textInNotif1: "Ingredient",
    textInNotif2: "updated",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["FORMULA_UPDATE_INGREDIENT"]
    },
}


