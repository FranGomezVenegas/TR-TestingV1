export const Menu={
    LotsSreenShotsName: {
        PlatformLots: {
            MenuOpen: "PlatformLots",
            windowOpen:{
                Lots: "windowopenlots",
                LotsCreation: "windowopenLotsCreation", 
            },
        },
    },
    clickMenu: "menu",
}


export const MenuLots={
    Lots: {
        main: {
            pageElement:{ label:'Lots'},
            screenShotsName: "myLotsMenuOpen",
            screenShotsNameLots: "formFilled", 
            name: "inspection_lot",
        },

        mobile: {
            pageElement:".inspection_lot",
            screenShotsName: "myLotsMenuOpen",
        },

        lotsCreation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=LotCreation&filterName=",
            screenShotsName: "Lots Creation",
        },

        lostView: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=LotView&filterName=",
            screenShotsName: "Lots View",
        },

        lotsSpecificationDesigns: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=SpecDesign&filterName=",
            screenShotsName: "Lots Specification Designs",
        },

        lotsSampleEnterResult: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=SampleEnterResult&filterName=RT-FQ",
            screenShotsName: "Lots Sample Enter Result"
        },

        lotsHome: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=Home&filterName=",
            screenShotsName: "Lots Home",
        },

        lotsAnalysisDesigner: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=analysisDesign&filterName=",
            screenShotsName: "Lot Analysis Designer",
        },

        deviationsView: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=inspection_lot&viewName=Deviation&filterName=",
            screenShotsName: "Deviations View",
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
