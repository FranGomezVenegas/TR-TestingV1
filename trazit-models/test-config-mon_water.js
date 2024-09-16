import { DemoStocks } from '../trazit-models/model_demo_stocks'
// El concepto de estas pruebas se basa en:
//	- Poder ver la diferencia entre una Referencia que 'requiere cualificación' (StdPrimario) y otra que no (StdSecundario Botella de agua)
//  - Gestión de entradas 'multi-entrada'
export const Config={
    procNameLabel: "Water monitoring"	
}

export const newInvLotStdPrimariosSuccess={
    viewNameInModel: "InventoryLots", 
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"NEW_INVENTORY_LOT",
    buttonLabel:"New",

    genericFormFields:[
        {type: "list", label_en: "Category", value: "Estándares Primarios"},
        {type: "text", label_en: "* Reference", value: "REF1"},
        {type: "text", label_en: "* Lot id", value: "Frontend Testing {TZ_DATE}"}
    ],	
    textInNotif1: "Lot",
    textInNotif2: "created",
    textInNotif3: "success",
}

export const newInvLotAlreadyExists={    
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"NEW_INVENTORY_LOT",
    buttonLabel:"New",
    genericFormFields:[
        {label_en: "Category", value: "Estándares Primarios"},
        {label_en: "* Reference", value: "REF1"},
        {label_en: "* Lot id", value: "Lot01"}
    ],
    fieldsOrig: [
        {"list1": {
          "label_en": "Category", "label_es": "Categoría", "optional": true,
          "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
          "valuesFromMasterData": {
            "propertyNameContainer": "category_and_references",
            "propertyNameContainerLevelPropertyKeyName": "name",
            "propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
          }, 
        }},
        {"text1": { "label_en": "Reference", "label_es": "Referencia", "value": "REF"}},
        {"text2": { "label_en": "lot id", "label_es": "id Lote" }, "value": "REF"},
        {"number1": {"label_en": "Quantity", "label_es": "Cantidad", "optional": true , "min_allowed":0, "max_dp":2}},			
        {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
        {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
        {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
        {"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
        {"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
        {"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
        {"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
        {"list7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true ,
            "items":[
                {"keyName":"ROOM_TEMP", "keyValue_en":"Room temperature", "keyValue_es":"Temperatura del recinto"},
                {"keyName":"15-25ºC", "keyValue_en":"15-25ºC", "keyValue_es":"15-25ºC"},
                {"keyName":"NMT 30ºc", "keyValue_en":"NMT 30ºc", "keyValue_es":"NMT 30ºc"},
                {"keyName":"2-8ºc", "keyValue_en":"2-8ºc", "keyValue_es":"2-8ºc"},
                {"keyName":"Freezer (-20ºC)", "keyValue_en":"Freezer (-20ºC)", "keyValue_es":"Congelador (-20ºC)"}
            ]}
        },
        {"number2": {"label_en": "Number of Entries", "label_es": "Unidades recepcionadas", "optional": true, "default_value": 1 }}		
      ]
}

export const tryTurnAvailableWhenNotQualified={
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"TURN_LOT_AVAILABLE",
	buttonLabel:"Turn Available",
	filtersInTable: [
		{colName: "Category", colValue:"Estándares Primarios"},
		{colName: "name", colValue:"Frontend Testing"},
	],    
    textInNotif1: "lot",
    textInNotif2: "not",
    textInNotif3: "qualified",
}


export const newInvLotStdSecundatioNoQualifSuccess={
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"NEW_INVENTORY_LOT",
    buttonLabel:"New",

    genericFormFields:[
        {type: "list", label_en: "Category", value: "Estándares Secundarios"},
        {type: "text", label_en: "* Reference", value: "Bote de agua"},
        {type: "text", label_en: "* Lot id", value: "Frontend Testing {TZ_DATE}"}
    ],	
    textInNotif1: "Lot",
    textInNotif2: "created",
    textInNotif3: "success",
}
export const newInvLotStdSecundariosAlternativeUnitsSuccess={
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"NEW_INVENTORY_LOT",
    buttonLabel:"New",

    genericFormFields:[
        {type: "list", label_en: "Category", value: "Estándares Secundarios"},
        {type: "text", label_en: "* Reference", value: "Bote de agua"},
        {type: "text", label_en: "* Lot id", value: "Frontend Testing {TZ_DATE}"},
        {type: "list", label_en: "* Quantity uom", value: "L"},
        {type: "text", label_en: "* Quantity", value: "1"}
        
    ],	
    textInNotif1: "Lot",
    textInNotif2: "created",
    textInNotif3: "success",
}


export const turnAvailableWhenQualifNotRequired={ 
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
    buttonName:"TURN_LOT_AVAILABLE",
	buttonLabel:"Turn Available",
	filtersInTable: [
		{colName: "Category", colValue:"Estándares Secundarios"},
		{colName: "Reference", colValue:"Bote de agua"},		
		{colName: "name", colValue:"Frontend Testing"},
	],    
    textInNotif1: "lot",
    textInNotif2: "not",
    textInNotif3: "qualified",
}



export const newInvLotRegressionStdPrimario={
    viewNameInModel: "InventoryLots",
    viewNameOrTextToGet: "New inventory Lot",
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
