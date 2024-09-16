const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  };
  
  export const NewProductionLots = {
    buttonNew: "create_new_folder",
    fldNewProductionLotsName: {
      label: "* New Production Lot Name", 
      value: `Name${getCurrentDate()}`, 
      press: "CapsLock"
    },
    buttonAccept: {label: "Accept"},
    buttonCancel: {label: "Cancel"},
    
    screenShotsButtonNew: "New",
    screenShotsformFilled: "Form Filled",
    screenShotsformEmpty: "Form Empty",
    screenShotsClickAccept: "Accept",
    screenShotsClickCancel: "Cancel",
    
    textInNotif1: "Lot",
    textInNotif2: "created",
    textInNotif3: "success",
    
    endpoints: {
      Queries: [""],
      endpointsActions: [""]
    },
  };
  
  export const formValues = {
    [NewProductionLots.fldNewProductionLotsName.label]: NewProductionLots.fldNewProductionLotsName.value,
    // Añade aquí más campos según sea necesario
  };
  
  export const ConfigSettingsAlternative = {
    screenShotsContentType: 'image/png'
  };
  
  // Si necesitas mantener la estructura MenuInstrumentsControl, puedes añadirla aquí
  export const MenuInstrumentsControl = {
    Notification: {
      main: {
        pageElement: '#notification-element',
        pageElementdiv: '#notification-div'
      }
    }
  };