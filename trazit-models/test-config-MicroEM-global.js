export const Menu={
    MicroEMSreenShotsName: {
        PlatformMicroEM: {
            MenuOpen: "PlatformMicroEM",
            windowOpen:{
                Lots: "windowopenMicroEM",
                LotsCreation: "windowopenMicroEM", 
            },
        },
    },
    clickMenu: "menu",
}


export const MenuMicroEM={
    MicroEM: {
        main: {
            pageElement:{ label:'Micro EM'},
            screenShotsName: "myMicroEMMenuOpen",
            screenShotsNameMicroEM: "formFilled", 
            name: "mb_em",
        },

        mobile: {
            pageElement:".mb_em",
            screenShotsName: "myMicroEMMonitoringMenuOpen",
        },

        ReportBrowser: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=Browser&filterName=",
            screenShotsName: "Report Browser",
        },

        ActiveProductionLots: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=ProductionLots&filterName=",
            screenShotsName: "Active Production Lots",
        },

        LoginNewSamples: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=LogSamples&filterName=",
            screenShotsName: "Login New Samples",
        },

        PendingSamplingLocation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SamplePendingSampling&filterName=LOCATION",
            screenShotsName: "Pending Sampling Location",
        },

        PendingSamplingPersonal: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SamplePendingSampling&filterName=PERSONAL",
            screenShotsName: "Pending Sample Personal",
        },

        PendingSamplingInterval: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SamplePendingSamplingInterval&filterName=LOCATION",
            screenShotsName: "Pending Sampling Interval",
        },

        Samples1stIncubation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleIncubation1&filterName=",
            screenShotsName: "Samples 1st Incubation",
        },

        Samples1stIncubation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleIncubation1&filterName=",
            screenShotsName: "Samples 1st Incubation",
        },

        Samples2ndIncubation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleIncubation2&filterName=",
            screenShotsName: "Samples 2nd Incubation",
        },
        
        SamplesIncubations: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleIncubation&filterName=",
            screenShotsName: "Samples Incubations",
        },

        PlateReading : {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SamplePlateReading&filterName=LOCATION",
            screenShotsName: "Plate Reading",
        },

        SecondPlateReading: {
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SamplePlateReadingSecondEntry&filterName=LOCATION",
            screenShotsName: "Second Plate Reading",
        },

        MicroorganismIdentification: {
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleMicroorganism&filterName=LOCATION",
            screenShotsName: "Microorganism Identification",
        },

        Revision : {
            pageElement:"https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SampleRevision&filterName=LOCATION",
            screenShotsName: "Revision", 
        },

        Program: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=Programs&filterName=",
            screenShotsName: "Program",
        }, 

        Deviation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=Deviation&filterName=",
            screenShotsName: "Deviation",
        },

        IncubatorsList: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=Incubators&filterName=",
            screenShotsName: "Incubators List",
        },

        ScheduledSamplesReport: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=mb_em&viewName=SchedSamples&filterName=",
            screenShotsName: "Scheduled Samples Report",
        },
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
