export const addReferences={
    buttonReferences: "References",
    buttonName: "create_new_folder",
    
    fldNewReferences:{label:"* New Reference Name", value: "REF{TZ_DATE}", press: "CapsLock"},
    fldCategory:{label:"* Category", value:"Estándares Primarios"},
    fldMinStock:{label:"Min Stock", value:"7"},
    fldUOM:{label:"* UOM", option:"mL"},
    fldOtherAllowedUOMs:{
        label: "Other Allowed UOMs",
        locator: "#multilist1",
        value: "L",
    },
    fldMinStockType:{label:"min Stock Type", value:"Items"},
    fldMinAvailableForUse:{label:"Min Available for use", value:"2", locator:"label"},
    //fldType:{label:"Type", value:"Items"},
    fldQualificationVariablesSet:{label:"Qualification Variables Set", option: "Is certified?", press: "CapsLock"},

    buttonAccept:{label:"Accept"},
    buttonCancel:{label:"Cancel"},

    screenShotsFormEmpty: "Form Empty",
    screenShotsReferences: "References",
    screenShotsFormFilled: "Form Filled",

    screenResult: "Result",

    textInNotif1: "added",
    textInNotif2: "reference",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIG_ADD_REFERENCE"]
    },
}
