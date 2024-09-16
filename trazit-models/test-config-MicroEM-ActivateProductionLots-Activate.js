export const Activate={
    buttonName: "alarm_add",
    fldNumberofDays: {
        label: "Number of Days", 
        value: "7"
    },
    fldReactivate: {
        locator: "#reactivateObjectDialog",
        label: "refresh",
    },
    fldJustificationPhrase: {
        label: "Justification Phrase",
        value: "prueba",
    },

    buttonAccept: "Accept",
    buttonCancel: "Cancel",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsEmptyJustificationPhrase: "Empty Justification Phrase",
    screenShotsFilledJustificationPhrase: "Filled Justification Phrase",
    screenShotsAccept: "Accept",
    screenShotsCancel: "Cancel",

    textInNotif1: "Lot",
    textInNotif2: "activated",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["EM_ACTIVATE_PRODUCTION_LOT"]
    },
}


