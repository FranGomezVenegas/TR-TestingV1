export const EnterEventResult={
    selectInstruments: "CG001",
    buttonEnterEventResult: "document_scanner",
    fldEvent:{label: "textbox", value:"Yes", locator: "#erGrid", action: "Enter"},
    buttonSelectRow: "Select Row",

    screenShotsEnterEventResult: "After Click The Button Enter Event Result",
    screenShotsSelectInstruments: "After Click The Instrument",
    screenShotsAfterTheEnterEventResult: "After The Enter Event Result",

    endpoints:{
        Queries:[""],
        endpointsActions:["ENTER_EVENT_RESULT"]
    },

    textInNotif1: "Event",
    textInNotif2: "entered",
    textInNotif3: "success"
}

export const ReEnterEventResult={
    selectInstruments: "prueba",
    buttonEnterEventResult: "document_scanner",
    fldEvent:{label: "textbox", value:"1", locator: "#erGrid", action: "Enter"},
    buttonSelectRow: "Select Row",

    screenShotsEnterEventResult: "After Click The Button Enter Event Result",
    screenShotsSelectInstruments: "After Click The Instrument",
    screenShotsAfterTheEnterEventResult: "After The Enter Event Result",

    endpoints:{
        Queries:[""],
        endpointsActions:["REENTER_EVENT_RESULT"]
    },

    textInNotif1: "Event",
    textInNotif2: "re-entered",
    textInNotif3: "success"
}
