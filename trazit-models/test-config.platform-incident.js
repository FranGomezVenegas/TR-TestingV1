export const newTicket={
    buttonName: "add",
    optionIncident: ".reopenPart > button",
    fldProcedure: {label: "Procedure", actionName: "listbox", option: "Lots"},
    fldTitle: {label: "Title*", value: "Prueba"},
    fldPriority: {label: "Priority", value: "1"},
    fldNote: {label: 'Note', value: "Esto es una prueba"},
    buttonNew: "New",

    screenShotsNew: "After Click New",
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsButtonNew: "New",

    textInNotif1: "Incident",
    textInNotif2: "created",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["NEW_INCIDENT"],
    },
    
}


export const botonConfirm={
    selectNombre: "Prueba",
    //fldDetail:{label:"detail", value:"confirmado"},
    buttonNameConfirm: "check",
    fldNote:{label: "Note", value: "Confirm Prueba"}, 
    buttonConfirm: "Confirm",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsConfirm: "Confirm",
    screenShotsSelect: "Select Name",

    textInNotif1: "confirm",
    textInNotif2: "created",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIRM_INCIDENT"],
    },

}

export const botonNota={
    selectNombre: "Prueba",
    buttonNameNote: "note_add",
    fldNote:{label: "Note", value: "Add Note, prueba"}, 
    buttonAddNote: "Add Note",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsAddNote: "Add Note",
    screenShotsSelect: "Select Name",

    textInNotif1: "noted",
    textInNotif2: "created",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["ADD_NOTE_INCIDENT"],
    },
}

export const botonCloseIt={
    selectNombre: "Prueba",
    buttonCloseIt: {label: "Close it!", value: "close"},
    fldNote:{label: "Note", value: "Close, prueba"}, 
    buttonConfirmCloseIt: "Close it!",

    screenShotsSelectName: "Select Name",
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsCloseIt: "Close It",

    textInNotif1: "Incident",
    textInNotif2: "closed",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["CLOSE_INCIDENT"],
    },
}

export const botonReopenIt={
    selectNombre: "Prueba",
    buttonTitle: "lock_open",
    fldNumberOfDays: {label: "Number of Days", value: "7"},
    refresh: {locator: "#icdDialog", actionName: "refresh"},

    screenShotsSelectName: "Select Name",
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsReopenIt: "Reopen It",


    textInNotif1: "Incident",
    textInNotif2: "re-open",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["REOPEN_INCIDENT"],
    },
}