export const adjustQuantity={
    select: "Lot2024-06-01T18:31:27.130847",
    buttonName: "receipt-text",
    buttonAccept:{label:"Accept"},
    buttonCancel:{label:"Cancel"},
    fldAdjustQuantity:{label:"* Adjust (new)quantity", value:"2"},
    fldUOM: {label: "* UOM", value: "mL"},

    screenShotsBeforeClickAdjustQuantity: "Before Click The Button Adjust Quantity",
    
    textInNotif1: "Adjust",
    textInNotif2: "quantity",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["ADJUST_INV_LOT_QUANTITY"]
    },
}