export const newCalendar={
    buttonName: "Create",
    fldName:{label:"New calendar name", value:"Calendar1"},
    fldDescription:{label:"Description", value:"description"}, 
    buttonAccept: "Accept",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenAfterClickAccept: "Accept",

    textInNotif1: "calendar",
    textInNotif2: "created",
    textInNotif3: "success",

    endpoints:{
        Queries:["GET_ALL_HOLIDAY_DATES_LIST_ALL_CALENDARS"],
        endpointsActions:["NEW_CALENDAR"],
    },
    
    locators:{
        pageElementName:  "mvc-icon-button#",
    }
}

export const cancelCalendar={
    buttonName: "Create",
    fldName:{label:"New calendar name", value:"Frontend Testing {TZ_DATE}"},
    fldDescription:{label:"Description", value:"description"}, 
    buttonCancel: "Cancel",

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenAfterClickCancel: "Cancel",

    endpoints:{
        Queries:["GET_ALL_HOLIDAY_DATES_LIST_ALL_CALENDARS"],
        endpointsActions:["NEW_CALENDAR"],
    },

    textInNotif1: "",
    textInNotif2: "",
    textInNotif3: "",
}


export const selectCalendar={
    fldCalendarList:{ label:'Calendar Name', value: '(2023)'},
    
    screenAfterClickCalendar: "After Select Calendar",
    scrennShotsOptionCalendar: "Option Select Calendar",
}

export const cancelAddDate={
    buttonName: "event_available",

    buttonCancel: "Cancel",

    fldDate:{label:"Date Name", value:"Date {TZ_DATE}"},
    date: {label: '#date1', value: "2024-06-19"},
    
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsCancel: "Cancel",
}

export const completeAddDate={
    buttonName: "event_available",

    buttonAccept: "Accept",

    fldDate:{label:"Date Name", value:"Date {TZ_DATE}"},
    date: {label: '#date1', value: "2024-06-18"},
    
    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsAccept: "Accept",

    endpoints: {
        Queries:[""],
        endpointsActions:["ADD_DATE_TO_CALENDAR"]
    },

    screenAfterClickPrueba: "afterClickPruebaCalendar",
    screenAfterClickAdd: "afterClickAdd",
    screenAfterClickFillDateName: "afterFillDateName",

    textInNotif1: "calendar",
    textInNotif2: "reactivated",
    textInNotif3: "success",

}

export const removeDate={
    buttonRemove: "event_busy",
    selectName: "Date 2024-09-05T21:40:20.266459",

    screenShotsSelectName: "Select Name",
    screenShotsRemoveDate: "Click Remove Date",

    endpoints: {
        Queries:[""],
        endpointsActions:["DELETE_DATE_FROM_GIVEN_CALENDAR"]
    },
    
    
    textInNotif1: "Date",
    textInNotif2: "deleted",
    textInNotif3: "success",
}



//export const newInstrumentAlreadyExists={
    //viewNameInModel: "PlatformInstruments",
    //viewNameOrTextToGet: "Active",
	//fldName:{label:"New", value:"Frontend Testing 101"},
    //fldFamily:{label:"Family", value:"HPLC"},
    //fldModel:{label:"Model", value:"123"},
    //fldSupplier:{label:"Supplier", value:"Leica Bio"},
    //fldSerial:{label:"Serial", value:"456"},
    //fldManufacturer:{label:"Manufacture", value:"Mettler Toledo"},
    //fldResponsible:{label:"Responsible", value:"admin"},
    //fldResponsibleBackup:{label:"Backup", value:"procsadmin"},
    //fl/dPurchase:{label:"Purchase", value:"12032023"},
    //fldInstallation:{label:"Installation", value:"12042023"},
    //textInNotif1: "Instrument",
    //textInNotif2: "already",
    //textInNotif3: "exists",
//}
//export const deactivate={
    //buttonTitle:"Deactivate",
    //tableFilterValue: "Frontend",
    //tableFilterValueRegression: newInstrumentSuccess.fldName.value,
    //textInNotif1: "Instrument",
    //textInNotif2: "success",
    //textInNotif3: "decommissioned",
//}

//export const newInstrumentRegression={
    //viewNameInModel: "PlatformInstruments",
    //viewNameOrTextToGet: "Active",
	//fldName:{label:"New", value:"Frontend Testing {TZ_DATE}"}, 
    //fldFamily:{label:"Family", value:"HPLC"},
    //fldModel:{label:"Model", value:"123"},
    //fldSupplier:{label:"Supplier", value:"Leica Bio"},
    //fldSerial:{label:"Serial", value:"456"},
    //fldManufacturer:{label:"Manufacture", value:"Mettler Toledo"},
    //fldResponsible:{label:"Responsible", value:"admin"},
    //fldResponsibleBackup:{label:"Backup", value:"procsadmin"},
    //fldPurchase:{label:"Purchase", value:"12032023"},
    //fldInstallation:{label:"Installation", value:"12042023"},
    //textInNotif1: "Instrument",
    //textInNotif2: "created",
    //textInNotif3: "success",
//}
