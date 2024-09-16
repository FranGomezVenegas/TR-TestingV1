export const newInstrumentSuccess={
    buttonName: "create_new_folder",
	fldName:{label:"* New Instrument Name", value:"prueba{TZ_DATE}"}, 
    fldFamily:{label:"* Family", option:"Viscosimetro"},
    fldModel:{label:"* Model", value:"123"},
    fldSupplier:{label:"* Supplier", option:"PB Instruments"},
    fldSerial:{label:"* Serial Number", value:"456"},
    fldManufacturer:{label:"* ManufacturerName", option:"Mettler Toledo"},
    fldResponsible:{label:"Responsible", option:"admin"},
    fldResponsibleBackup:{label:"Responsible Backup", option:"admin"},
    fldPurchase:{label:"Purchase Date", value:"2024-09-01"},
    fldInstallation:{label:"* Installation Date", value:"2024-09-01"},
    buttonAccept: "Accept",
    buttonCancel: "Cancel",


    screenShotsEmptyForm: "Form Empty",
    screenShotsFilledForm: "Form Filled",
    screenShotsAccept: "Accept",
    screenShotsCancel: "Cancel",


    
    textInNotif1: "Instrument",
    textInNotif2: "created",
    textInNotif3: "success",
    

    endpoints:{
        Queries:[""],
        endpointsActions:["NEW_INSTRUMENT"]
    },
}

export const newInstrumentAlreadyExists={
    fldName:{label:"* New Instrument Name", value:"prueba"}, 
    
    textInNotif1: "Instrument",
    textInNotif2: "already",
    textInNotif3: "exists",
    
    buttonAccept: "Accept",
    screenResult: "result",
    screenformFilled: "formFilled",
    screenformNotifications: "Notifications",
    screenformLastNotifications: "Last notification",

    endpoints: {
        Queries: [""],
        endpointsActions: ["NEW_INSTRUMENT"],
    },
}





