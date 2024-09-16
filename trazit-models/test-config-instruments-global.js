export const InstrumentsConfig={
    procNameLabel: "instruments",  
}

export const Menu={
    InstrumentsSreenShotsName: {
        PlatformInstruments: {
            MenuOpen: "PlatformInstruments",
            windowOpen:{
                ActivateInstruments: "windowopenactivateInstrument",
                InstrumentsControl: "windowopenInstrumentsControl", 
                EventsInProgress: "windowopenEventsInProgress",
            },
        },
    },
    clickMenu: "menu",
}


export const MenuInstrumentsControl={
    Instruments: {
        main: {
            pageElement:{ label:'Intruments Control'},
            // pageElement: { label:'sp-action-menu#instruments'},
            screenShotsName: "my Instrument Menu Open",
            // screenShotsNameIncident: "formFilled", 
            name: "instruments",
        },

        mobile: {
            pageElement: ".instruments",
            screenShotsName: "my Instrument Menu Open",
        },

        activeInstrument: {
            // pageElement: { label: "Active Instrument" },
            pageElement: "dashboard/procedures?procName=instruments&viewName=PlatformInstruments&filterName=",
            screenShotsName: "active Instruments",
        },

        EventInProgress: {
        //pageElement: "vaadin-grid-cell-content:nth-child(18)",
            pageElement: "dashboard/procedures?procName=instruments&viewName=EventsInProgress&filterName=",
            screenShotsName: "my Events In Progress Menu Open",
        },

        deviations: {
            pageElement: "dashboard/procedures?procName=instruments&viewName=Deviations&filterName=",
            screenShotsName: "my Deviations Menu Open",
        },

        InstrumentFamilyList: {
            pageElement: "dashboard/procedures?procName=instruments&viewName=InstrumentFamilyList&filterName=",
            screenShotsName: "my Instrument Family List",

        },

        InstrumentBalances: {
            
            pageElement: "dashboard/procedures?procName=instruments&viewName=PlatformInstrumentsBalanzas&filterName=",
            screenShotsName: "active Instruments Balances",

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


export const MicroEM={
    main: {
        pageElement:{ label:'Micro EM Air' },
        screenShotsName: "AirMenuOpen",
    },

    deviation: {
        pageElement: { label: 'Deviation'},
        screenShotsName: "myDerivationMenuOpen",
    },

    incubatorsList: {
        pageElement: { label: 'Incubators list'},
        screenShotsName: "myIncubatorsListMenuOpen",
    }
}

