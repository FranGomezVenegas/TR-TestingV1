export const setPassword={
    CurrentPassword: "Current Password",
    Accept: "Accept",

    screenBeforePasswordChange: 'Before Password Change',
    screenCompletedChangePasswordForm: 'Completed Change Password Form',
    screenEmptyForm: 'Empty Form to Confirm your Credencials',
    screenFilledForm: 'Filled Form to Confirm your Credencials',
    screenShotsAccept: "Accept",


    fldNewPwd: {
        label:"New Password", 
        originalValue: "trazit", 
        newValue:"trazitt", actionName: "published_with_changes"
    },

    textInNotif1: "password",
    textInNotif2: "changed",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["USER_CHANGE_PASSWORD"]
    },
}

export const setEsign={
    fldEsign: {label:"New Esign", newValue:"esign", actionName: "published_with_changes"},
    fldCurrentEsign: {label: "Current Esign", originalValue: "firmademo"},
    buttonAccept: "Accept",

    screenBeforeEsignChange: 'Before Esign Change',
    screenCompletedChangeEsignForm: 'Completed Change Esign Form',

    screenShotsEmptyForm: "Empty Form",
    screenShotsFilledForm: "Filled Form",
    screenShotsAccept: "Accept",

    textInNotif1: "e-sign",
    textInNotif2: "changed",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["USER_CHANGE_ESIGN"]
    },
}

export const setShift={
    fldShift: { 
        label:"Shift", 
        originalValue: "Morning 1", 
        newValue:"Night",
        actionName: "published_with_changes",
    },
    CurrentPassword: "Current Password",
    buttonAccept: "Accept",

    screenBeforeShiftChange: 'Before Shift Change',
    screenSelectOptionShift: 'Select Option Shift',
    screenEmptyForm: 'Empty Form to Confirm your Credencials',
    screenFilledForm: 'Filled Form to Confirm your Credencials',
    screenShotsAccept: "Accept",

    textInNotif1: "New",
    textInNotif2: "shift",
    textInNotif3: "set",

    endpoints:{
        Queries:[""],
        endpointsActions:["UPDATE_USER_SHIFT"]
    },

}

export const setAlias={
    fldAlias: { 
        label:"New Alias", 
        originalValue: "Admin alias", 
        newValue:"NEWAdmin alias",
        actionName: "published_with_changes",
    },

    CurrentPassword: "Current Password",
    buttonAccept: "Accept",

    screenBeforeAliasChange: "Before Shift Change",
    screenCompletedChangeAliasForm: 'Completed Change Alias Form',
    screenEmptyForm: 'Empty Form to Confirm your Credencials',
    screenFilledForm: 'Filled Form to Confirm your Credencials',
    screenShotsAccept: "Accept",

    textInNotif1: "New",
    textInNotif2: "alias",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["UPDATE_USER_ALIAS"]
    },
}

export const setMail={
    fldMail: {
        label:"New Mail", 
        originalValue: "trazit.info@gmail.com", 
        newValue:"NEWtrazit.info@gmail.com",
        actionName: "published_with_changes",
    },

    CurrentPassword: "Current Password",
    buttonAccept: "Accept",

    screenBeforeMailChange: "Before Mail Change",
    screenCompletedChangeMailForm: 'Completed Change Mail Form',
    screenEmptyForm: 'Empty Form to Confirm your Credencials',
    screenFilledForm: 'Filled Form to Confirm your Credencials',
    screenShotsAccept: "Accept",

    textInNotif1: "new",
    textInNotif2: "mail",
    textInNotif3: "success",

    endpoints:{
        Queries:[""],
        endpointsActions:["UPDATE_USER_MAIL"]
    },
}

export const save={
    buttonSave: "Save Open Tabs",

    screenAfterClickSave: "afterClickSave",

    textInNotif1: "",
    textInNotif2: "",
    textInNotif3: "",

    endpoints:{
        Queries:[""],
        endpointsActions:["SET_DEFAULT_TABS_ON_LOGIN"]
    },
    
}