export const Menu={
    StocksSreenShotsName: {
        PlatformInstruments: {
            MenuOpen: "PlatformStocks",
            windowOpen:{
                Stocks: "windowopenStocks",
                ActiveInventoryLots: "windowopenStocksActiveInventoryLots", 
                InventoryControl: "windowsopenStockInventoryControl",
                ActiveInventoryLotsCultureMediaLots: "windosopenStockActiveInventoryLotsCultureMediaLots",
                ActiveInventoryPrimaryStandardLots: "windowsopenStockActiveInventoryPrimaryStandardLots",
                ActiveInventorySecondStandardLots: "windowsopenStockActiveInventorySecondStandardLots",
                ActiveInventoryConsumablesLots: "windowsopenStockActiveInventoryConsumablesLots",
                ActiveInventoryOtherLots: "windowsopenStockActiveInventoryOtherLots",
                EventsInProgress: "windowsopenStockEventInProgress",
                MasterOrReferences: "windowsopenStockMasterOrReferences"
            },
        },
    },
}

export const MenuStock={
    Stock: {
        main: {
            pageElement:{ label:'Stock Control'},
            screenShotsName: "myStocksControlMenuOpen",
            name: "stock",
            //screenShotsNameLots: "formFilled", 
        },

        mobile: {
            pageElement:".stock",
            screenShotsName: "myStockControlMenuOpen",
        },

        ActiveInventoryLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsGeneral&filterName=",
            screenShotsName: "Active Inventory Lots",
        },

        InventoryControl: {
            pageElement: "http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/procedures?procName=stock&viewName=InventoryControls&filterName=",
            screenShotsName: "Inventory Control",
        },

        ActiveInventoryLotsCultureMediaLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsMediosDeCultivo&filterName=",
            screenShotsName: "Active Inventory Lots Culture Media Lots",
        },

        ActiveInventoryPrimaryStandardLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsEstandPrim&filterName=",
            screenShotsName: "Active Inventory Primary Standard Lots",
        },        

        ActiveInventorySecondStandardLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsEstandSec&filterName=",
            screenShotsName: "Active Inventory Second Standard Lots",
        },   
    
        ActiveInventoryConsumablesLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsMatFung&filterName=",
            screenShotsName: "Active Inventory Consumables Lots",
        },

        ActiveInventoryOtherLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsOtros&filterName=",
            screenShotsName: "Active Inventory Other Lots"
        },

        ActiveInventoryOtherLots: {
            pageElement: "dashboard/procedures?procName=stock&viewName=InventoryLotsReactivos&filterName=",
            screenShotsName: "Active Inventory Other Lots"
        },

        QualificationInProgress: {
            pageElement: "dashboard/procedures?procName=stock&viewName=QualificationsInProgress&filterName=",
            screenShotsName: "Qualification In Progress"
        },

        MasterOrReferences: {
            pageElement: "dashboard/procedures?procName=stock&viewName=Config-Add%20References&filterName=",
            screenShotsName: "Master Or References"
        }, 

        Deviations: {
            pageElement: "dashboard/procedures?procName=stock&viewName=Deviations&filterName=",
            screenShotsName: "Deviations",
        },

        MasterDataConfig: {
            pageElement: "dashboard/procedures?procName=stock&viewName=Config-Add%20References&filterName=",
            screenShotsName: "Master Data Config"
        }
    },

    
    Notification: {
        MenuOpenNotifications: "NotificationMenu",

        main: {
            pageElement: "sp-action-menu#notif-menu",
            screenShotsName: "Notifications",

            pageElementdiv: "#notif-item-div",
            screenShotsdivNotification: "Last Notification" ,
        },
    },
}
