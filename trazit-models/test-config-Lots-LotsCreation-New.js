export const LotsCreationNew={
    select: "Calcium Carbonate ALL",
    buttonNew: "create_new_folder",

	fldNameLot:{label:"* New Lot Name", value:"Lot{TZ_DATE}", actionName: "CapsLock"}, 
    fldQuantity:{label:"* Quantity", value:"7"}, 
    fldUOM:{label:"* UOM", value:"kg"}, 
    fldNumBulks:{label:"* Num Bulks", value:"1"}, 
    fldNumContainers:{label:"* Num Containers", value: "1"},
    
    screenShotsFormEmpty: "Form Empty",
    screenShotsFormFilled: "Form Filled",
    screenShotsAfterClickButtonAccept: "After Click The Button Accept",
    acreenShotsAfterClickButtonCancel: "After Click The Button Cancel",

    buttonAccept: { label: "Accept"},
    buttonCancel: { label: "Cancel"},
    //buttonAcceptConfirm: {label: "Accept"}

    textInNotif1: "Created",
    textInNotif2: "lot",
    textInNotif3: "success",
    
    
    endpoints:{
        Queries:[""],
        endpointsActions:["NEW_LOT"]
    },
}

