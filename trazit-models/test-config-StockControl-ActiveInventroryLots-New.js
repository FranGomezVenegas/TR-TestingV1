export const new_inventory_lot={
    "buttonName": "create_new_folder",
    "fldCategory":{"label": "Category", "value":"Reactivos Comerciales", "locator": "span"},
    "fldReference":{"label":"* Reference", "value":"REF1", "action": "CapsLock"}, 
    "fldIdLot":{"label":"* lot id", "value": "Lot{TZ_DATE}", "action": ""},
    "fldQuantity":{"label":"Quantity", "value": "70", "action": ""},
    "fldExpiryDate":{"label":"Expiry Date", "value":"2024-03-19", "action": "ArrowRight"},
    "fldExpiryDateInUse":{"label":"Expiry Date In Use", "value":"2024-03-19", "action": "ArrowRight"},
    "fldRetestDate":{"label":"Retest Date", "value": "2024-03-19", "action": "ArrowRight"},
    "fldVendor":{"label":"Vendor", "value":"V", "action": "CapsLock"},
    "fldVendorLot":{"label":"Vendor Lot","value":"V", "action": "CapsLock"},
    "fldVendorReference":{"label":"Vendor Reference", "value":"V", "action": "CapsLock"},
    "fldPurity":{"label":"Purity", "value":"Purity","action": "CapsLock"},
    "fldConservationCondition":{"label":"Conservation Condition", "value":"Room temperature"},
    "fldNumberOfEntries":{"label":"Number of Entries", "value":"1"},
    "buttonAccept":{"label":"Accept"},
    "buttonCancel":{"label":"Cancel"}, 

    "screenShotsFormEmpty": "Form Empty",
    "screenShotsFormFilled": "Form Filled",
    "screenResult": "Resultt",

    "textInNotif1": "Lot",
    "textInNotif2": "created",
    "textInNotif3": "success",
    

    "endpoints":{
        "Queries":[""],
        "endpointsActions":["NEW_INVENTORY_LOT"]
    },
}
