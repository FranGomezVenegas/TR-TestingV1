export const consume={
    select: "fgv-02",
    buttonName: "receipt-text",

    buttonConsume:{label:"Consume", value:"receipt-text"},
    buttonAccept:{label:"Accept"},
    buttonCancel:{label:"Cancel"},

    fldQuantityConsume:{label:"* Quantity to consume", value:"7"},
    fldUOM: {label: "* UOM", value: "mL"},


    textInNotif1: "Quantity",
    textInNotif2: "consumed",
    textInNotif3: "success",

    
    screenShotsBeforeClickConsume: "Before Click The Button Consume",
    screenShotsFormEmpty: "Form Empty",
    screenShotsFormFilled: "Form Filled",
    screenResult: "Result",

    endpoints:{
        Queries:[""],
        endpointsActions:["CONFIG_ADD_REFERENCE"]
    }
}