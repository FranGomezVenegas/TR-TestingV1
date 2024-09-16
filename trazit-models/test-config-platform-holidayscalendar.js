export const newCalendar={
    buttonName: "Create",
    fldName:{label:"name", value:"Frontend Testing {TZ_DATE}"},
    fldDescription:{label:"name", value:"Frontend Testing {TZ_DATE}"},
    
    screenAfterClickCreate: "afterClickCreate",

    endpoints:{
        Queries:["GET_ALL_HOLIDAY_DATES_LIST_ALL_CALENDARS"],
        actions:["NEW_CALENDAR"]
    },

    viewNameInModel: "PlatformInstruments",
    viewNameOrTextToGet: "Active",
	fldName:{label:"New", value:"Frontend Testing {TZ_DATE}"}, 
    fldFamily:{label:"Family", value:"HPLC"},
    fldModel:{label:"Model", value:"123"},
    fldSupplier:{label:"Supplier", value:"Leica Bio"},
    fldSerial:{label:"Serial", value:"456"},
    fldResponsible:{label:"Responsible", value:"admin"},
    fldResponsibleBackup:{label:"Backup", value:"procsadmin"},
    fldPurchase:{label:"Purchase", value:"12032023"},
    fldInstallation:{label:"Installation", value:"12042023"},
    textInNotif1: "Instrument",
    textInNotif2: "created",
    textInNotif3: "success",
}

export const newInstrumentAlreadyExists={
    viewNameInModel: "PlatformInstruments",
    viewNameOrTextToGet: "Active",
	fldName:{label:"New", value:"Frontend Testing 101"},
    fldFamily:{label:"Family", value:"HPLC"},
    fldModel:{label:"Model", value:"123"},
    fldSupplier:{label:"Supplier", value:"Leica Bio"},
    fldSerial:{label:"Serial", value:"456"},
    fldManufacturer:{label:"Manufacture", value:"Mettler Toledo"},
    fldResponsible:{label:"Responsible", value:"admin"},
    fldResponsibleBackup:{label:"Backup", value:"procsadmin"},
    fldPurchase:{label:"Purchase", value:"12032023"},
    fldInstallation:{label:"Installation", value:"12042023"},
    textInNotif1: "Instrument",
    textInNotif2: "already",
    textInNotif3: "exists",
}
export const deactivate={
    buttonTitle:"Deactivate",
    tableFilterValue: "Frontend",
    tableFilterValueRegression: newInstrumentSuccess.fldName.value,
    textInNotif1: "Instrument",
    textInNotif2: "success",
    textInNotif3: "decommissioned",
}

export const newInstrumentRegression={
    viewNameInModel: "PlatformInstruments",
    viewNameOrTextToGet: "Active",
	fldName:{label:"New", value:"Frontend Testing {TZ_DATE}"}, 
    fldFamily:{label:"Family", value:"HPLC"},
    fldModel:{label:"Model", value:"123"},
    fldSupplier:{label:"Supplier", value:"Leica Bio"},
    fldSerial:{label:"Serial", value:"456"},
    fldManufacturer:{label:"Manufacture", value:"Mettler Toledo"},
    fldResponsible:{label:"Responsible", value:"admin"},
    fldResponsibleBackup:{label:"Backup", value:"procsadmin"},
    fldPurchase:{label:"Purchase", value:"12032023"},
    fldInstallation:{label:"Installation", value:"12042023"},
    textInNotif1: "Instrument",
    textInNotif2: "created",
    textInNotif3: "success",
}
