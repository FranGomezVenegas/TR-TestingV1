export const Menu={
    WaterMonitoringSreenShotsName: {
        PlatformWaterMonitoring: {
            MenuOpen: "PlatformWaterMonitoring",
            windowOpen:{
                Lots: "windowopenWaterMonitoring",
                LotsCreation: "windowopenWaterMonitoring", 
            },
        },
    },
    clickMenu: "md-filled-icon-button.menu",
    // Hacer clic en el botón de menú <md-filled-icon-button class="menu">
}


export const platformMenuNames={
    WaterMonitoring: {
        main: {
            pageElement:{ label:'Water Monitoring' },
            screenShotsName: "myWaterMonitoringMenuOpen",
            screenShotsNameWaterMonitoring: "formFilled", 
            name: "mon_water",
        },

        mobile: {
            pageElement:".mon_water",
            screenShotsName: "myWaterMonitoringMenuOpen",
        },

        ActiveProductionLots: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=ProductionLots&filterName=",
            screenShotsName: "Active Production Lots",
        },

        LoginNewSamples: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=LogSamples&filterName=",
            screenShotsName: "Login New Samples",
        },

        PendingSampling: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=SamplePending&filterName=",
            screenShotsName: "Pending Sampling",
        },

        FQandMBTestingPendingResultsMB:{
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=SampleEnterResult&filterName=ER-MB",
            screenShotsName: "MB Testing Pending Results",
        },

        FQandMBTestingPendingResultsFQ: {
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=SampleEnterResult&filterName=ER-FQ",
            screenShotsName: "FQ Testing Pending Results",

        },

        ActiveProductionLots2:{
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=ProductionLots2&filterName=",
            screenShotsName: "Active Production Lots",
        },

        ProgramList:{
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=Programs&filterName=",
            screenShotsName: "Program List",
        },
        
        Deviation:{
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=Deviation&filterName=",
            screenShotsName: "Deviation",
        },

        ReportsBrowser: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mon_water&viewName=Browser&filterName=",
            screenShotsName: "Reports Browser",
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
