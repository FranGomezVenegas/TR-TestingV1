export const Menu={
    PlatformAdminSreenShotsName: {
        PlatformAdmin: {
            MenuOpen: "PlatformAdmin",
            windowOpen:{
                PlatformAdmin: "windowopenPlatformAdmin",
            },
        },
    },
    clickMenu: "menu",
}


export const MenuPlatformAdmin={
    PlatformAdmin: {
        main: {
            pageElement:{ label:'Platform Admin'},
            screenShotsName: "myPlatformAdminMenuOpen",
            screenShotsNameLots: "formFilled", 
        },

        mobile: {
            pageElement:".app",
            screenShotsName: "myPlatformAdminMenuOpen",
        },

        BlackIpList: {
            pageElement: "//dashboard/procedures?procName=app&viewName=BlackIpList&filterName=",
            screenShotsName: "Black Ip List",
        },

        WhiteIpList: {
            pageElement: "dashboard/procedures?procName=app&viewName=WhiteIpList&filterName=",
            screenShotsName: "White Ip List",
        },

        BusinessRules: {
            pageElement: "dashboard/procedures?procName=app&viewName=PlatformBusRules&filterName=",
            screenShotsName: "BusinessRule",
        }
    }
}