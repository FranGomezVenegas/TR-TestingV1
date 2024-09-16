export const addAttachment={
    selectInstrument: "w",
    buttonName: "add_link",
    screenShotsAfterTheForm: "AfterTheForm",
    fldUrl:{label:"* Doc Url", value: "https://www.trazit.net/"},
    //value:"https://www.google.com/"}, 
    fldTittle:{label:"Title", value:"TRAZiT", actionName: "CapsLock"}, 
    buttonAccept: { label: "Accept"},
    buttonCancel: { label: "Cancel"},
    screenShostsAfterAcceptTheForm: "Accept",
    screenShostsAfterCancel: "Cancel",
    screenShotsFormFilled:"Form Filled",

    textInNotif1: "Attachment",
    textInNotif2: "added",

    endpoints:{
        Queries:[""],
        endpointsActions:["ADD_ATTACHMENT"]
    },
}


export const openAttachment={
    selectInstrument: "w",
    buttonName: "attach_file",
    screenShotsButton: "Open Attachment",
    url: "https://www.google.com/?hl=es",
    acceptGoogle: "Aceptar todo",
    screenShotsUrl: "Url Page1 Screenshot",
    error: "Browser context is not available.",
    

    textInNotif1: "",
    textInNotif2: "",
    textInNotif3: "",

    endpoints:{
        Queries:[""],
        endpointsActions:["REMOVE_ATTACHMENT"]
    }
}

export const removeAttachment={
    selectInstrument: "w",
    buttonName: "link_off",
    screenShotsAfterTheForm: "AfterTheForm",
    screenShotsFormFilled:"Form Filled",
    screenShotsFormEmpty:"Form Empty",
    screenShostsAfterCancel: "AfterClickCancel",
    screenShostsAfterAccept: "AfterClickAccept",


    fldLink:{label:"Link", value:"https://www.google.com/?hl=es"}, 
    fldTittle:{label:"Title", value:"Google"}, 
    buttonCancel: { label: "Close"},
    buttonAccept: { label: "Accept"},

    textInNotif1: "Attachment",
    textInNotif2: "removed",

    endpoints:{
        Queries:[""],
        endpointsActions:["REMOVE_ATTACHMENT"]
    }
}