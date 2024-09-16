export const AdjustQuantity={
    buttonName: {
        locator: "#LOT_BULK_ADJUST_QUANTITY",
        label: "event"
    },
    
    fldAdjustBulkQuantity: {
        label: "* Quantity", 
        value: "7",
    },

    fldUOM: {
        label: "* UOM",
        option: "kg",
    },

    buttonAccept: "Accept",
    buttonCancel: "Cancel",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsAccept: "Accept",
    screenShotsCancel: "Cancel",


    
    textInNotif1: "Quantity",
    textInNotif2: "adjusted",
    textInNotif3: "success",
    
    endpoints:{
        Queries:[""],
        endpointsActions:["LOT_BULK_ADJUST_QUANTITY"]
    },
};