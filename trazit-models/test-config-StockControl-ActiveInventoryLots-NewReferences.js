export const NewReferences={
    buttonName: "note_add",

    fldReferenceName: {
        label: "* New Reference Name", 
        value: "REF{TZ_DATE}"
    },
    fldCategory: {
        label: "* Category", 
        option: "Otros"
    },
    fldMinStock: {
        label: "Min Stock",
        value: "1",
    },
    fldUOM: {
        label: "* UOM",
        value: "cL",
    }, 
    fldOtherAllowedUOMs:{
        label: "Other Allowed UOMs",
        locator: "#multilist1",
        value: "L",
    },
    fldMinStockType: {
        label: "min Stock Type",
        option: "Quantity",
    },

    fldMinUse:{
        label: "* Min Available for use",
        value: "1",
    },
    fldType: {
        label: "Type",
        option: "Quantity",
    },
    fldQualificationVariablesSet: {
        label: "Qualification Variables Set",
        option: "Is ciertified?",
    },
    buttonAccept: "Accept",
    buttonCancel: "Cancel",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsAccept: "Accept",
    screenShotsCancel: "Cancel",

    textInNotif1: "",
    textInNotif2: "",
    textInNotif3: "",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIG_ADD_REFERENCE"]
    }
}