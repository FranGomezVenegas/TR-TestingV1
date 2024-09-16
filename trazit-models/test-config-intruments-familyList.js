export const NewInstrumentFamilySuccess={
    buttonName: "create_new_folder",
    fldFamilyName:{label:"* New Instrument Family Name", value:"F{TZ_DATE}", actionName: "CapsLock"}, 
    fldDescription:{label:"* Description", value:"Prueba", actionName: "CapsLock"},
    buttonAccept: { label: "Accept"},
    buttonCancel: { label: "Cancel"},
    screenShotsFormFilled:"Form Filled",
    screenShotsAfterClickCancel: "AfterClickButtonCancel",
    screenShotsAfterClickAccept: "AfterClickButtonAccept",

    screenShotsAfterTheForm: "AfterCompletingTheForm",

    textInNotif1:"Family",
    textInNotif2:"created",
    textInNotif3:"success",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIG_NEW_INSTRUMENT_FAMILY"]
    },
}

export const NewInstrumentFamilyAlreadyExists={
    buttonName: "create_new_folder",
    buttonAccept: { label: "Accept"},
    screenShotsFormFilled:"Form Filled",
    screenShotsAfterClickAccept: "AfterClickButtonAccept",
    screenShotsAfterTheForm: "AfterCompletingTheForm",

    fldFamilyName:{label:"* New Instrument Family Name", value:"F0", actionName: "CapsLock"}, 
    fldDescription:{label:"* Description", value:"Prueba", actionName: "CapsLock"},

    textInNotif1:"Family",
    textInNotif2:"already",
    textInNotif3:"exists",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIG_NEW_INSTRUMENT_FAMILY"]
    },
}