export const addAttachment={
    "desktopMode":{
        "pageElementName": "sp-action-menu#dashboardprocedures",
        "screenShotsName": "window open procedure",
        "label":"Intruments Control",
        "view":"Instruments",
        "viewScreenShotLabel":"Instruments",

        "pageElement": "dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=",
        "screenShotName": "Active Inventory Lots"    
    },
    "mobileMode":{
        "pageElementName": "md-list-item#dashboardmyprocedures",
        "clickMenu": "md-filled-icon-button.menu",
        "screenShotsName": "Opening the Procedure Menu",
        "label": ".instruments",
        "viewScreenShotLabel": "Instruments",

        "pageElement": "dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=",
        "screenShotName": "Active Inventory Lots"  
    },

    "tabletRetratoMode": {
        "pageElementName": "sp-action-menu#dashboardprocedures",
        "screenShotsName": "window open procedure",
        "label":"Intruments Control",
        "view":"Instruments",
        "viewScreenShotLabel":"Instruments",

        "pageElement": "dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=",
        "screenShotName": "Active Inventory Lots"

    },

    "xxxprocedureLabel":{ "label":"Intruments Control"},

    "xxxscreenShotsPageElement": "Instruments",

    "selectName": "prueba2024-09-22T15:16:05.550242",
    "phraseSelect": "Select Element",

    "buttonName": {
        "title": "Add Attachment",
        "label": "add_link"
    },

    "fldDocUrl": {
        "label": "* Doc Url",
        "value": "https://www.trazit.net/"
    },
    "fldTitle": {
        "label": "Title",
        "value": "TRAZiT"
    },

    "zzzfldJustificationPhrase": {
        "label": "Justification Phrase",
        "value": "testing"
    },

    "buttonAccept": "Accept",
    "buttonCancel": "Cancel",

    "screenShotsSelect": "Select Name",
    "screenShotsEmptyForm": "Empty Form",
    "screenShotsFilledForm": "Filled Form",
    "screenShotsAccept": "Accept",
    "screenShotsCancel": "Cancel",
    "screenShotsJustification": "Filled Justification",

    "textInNotif1": "Attachment",
    "textInNotif2": "added",
    "textInNotif3": "",


    "phrasePauses": "Execution Pauses",
    "phraseScreenShots": "Attach ScreenShots"

}














export const openAttachment={
    "selectInstrument": "w",
    "buttonName": "attach_file",
    "screenShotsButton": "Open Attachment",
    "url": "https://www.google.com/?hl=es",
    "acceptGoogle": "Aceptar todo",
    "screenShotsUrl": "Url Page1 Screenshot",
    "error": "Browser context is not available.",
    

    "textInNotif1": "",
    "textInNotif2": "",
    "textInNotif3": "",

    "endpoints":{
        "Queries":[""],
        "endpointsActions":["REMOVE_ATTACHMENT"]
    }
}

export const removeAttachment={
    "selectInstrument": "w",
    "buttonName": "link_off",
    "screenShotsAfterTheForm": "AfterTheForm",
    "screenShotsFormFilled":"Form Filled",
    "screenShotsFormEmpty":"Form Empty",
    "screenShostsAfterCancel": "AfterClickCancel",
    "screenShostsAfterAccept": "AfterClickAccept",


    "fldLink":{"label":"Link", "value":"https://www.google.com/?hl=es"}, 
    "fldTittle":{"label":"Title", "value":"Google"}, 
    "buttonCancel": { "label": "Close"},
    "buttonAccept": { "label": "Accept"},

    "textInNotif1": "Attachment",
    "textInNotif2": "removed",

    "endpoints":{
        "Queries":[""],
        "endpointsActions":["REMOVE_ATTACHMENT"]
    }
}