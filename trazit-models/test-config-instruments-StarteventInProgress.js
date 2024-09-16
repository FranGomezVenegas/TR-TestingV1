export const EventInProgress={
    endpoints:{
        Queries:[""],
        endpointsActions:["INSTRUMENT_EVENTS_INPROGRESS"],
    },
}


export const ReOpen={
    selectInstrument: "pr",
    buttonReOpen: "Reopen",
    buttonName: "replay",
    buttonRefresh: {name: "refresh", locator: "#reactivateObjectDialog"},

    fldUser: {label: "User", value: "admin"},
    fldPassword: {label: "Password", value: "trazit"},
    fldJustificationPhrase: {label: "Justification Phrase", value: "prueba"},

    screenShotsAfterButtonReopen: "Reopen",
    buttonDays: { label: "Number of Days", value: "10076" },
    screenShotsAfterTheForm: "After the Form",
    
    buttonAccept: { label: "Accept"},
    screenShotsAccept: "Accept",
    
    buttonCancel: { label: "Cancel"},
    screenShostsAfterCancelTheForm: "Cancel",
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",


    endpoints:{
        Queries:[""],
        endpointsActions:["REOPEN_EVENT"],
    },
}


export const verification={
    buttonName: "Ver",
    screenShotsAfterClickButton: "AfterClickButton",

    endpoints:{
        Queries:[""],
        endpointsActions:["START_VERIFICATION"],
    },

    textInNotif1: "Verification",
    textInNotif2: "started",
    textInNotif3: "success",
}


export const service={
    buttonName: "Ser",
    screenShotsAfterClickButton: "AfterClickButton",

    endpoints:{
        Queries:[""],
        endpointsActions:["START_SERVICE"],
    },

    textInNotif1: "Service",
    textInNotif2: "started",
    textInNotif3: "success",
}


export const calibration={
    buttonName: "Start Calibration",
    selectInstruments: "w",
    screenShotsAfterClickButton: "AfterClickButton",
    
    endpoints:{
        Queries:[""],
        endpointsActions:["START_CALIBRATION"],
    },

    textInNotif1: "Calibration",
    textInNotif2: "started",
    textInNotif3: "success",
}


export const prevMaint={
    buttonName: "Prev",
    screenShotsAfterClickButton: "AfterClickButton",

    endpoints:{
        Queries:[""],
        endpointsActions:["START_PREVENTIVE_MAINTENANCE"],
    },

    textInNotif1: "Preventive Maintenance",
    textInNotif2: "started",
    textInNotif3: "success",
}


export const Audit={
    selectInstrument: "prueba",
    // selectName: "Lot2024-07-31T11:24:37.393284",
    buttonAudit: "rule",
     sign: "#tooltip-403 > div > mwc-icon", 
    // sign: "#tooltip-403 > div > mwc-icon",
    messageError: "No se encontró el icono.",
    justificationPrase: {label: "Justification Phrase", value: "testing"},
    buttonAccept: "Accept",

    screenShotsSelectName: "Select",
    screenShotsAudit: "Audit", 
    screenShotsSign: "Sign",
    screenShotsAccept: "Accept",


    endpoints:{
        Queries:[""],
        endpointsActions:["INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT"]
                         ["INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED"],
    },

    textInNotif1: "Audit",
    textInNotif2: "started",
    textInNotif3: "success",
}
