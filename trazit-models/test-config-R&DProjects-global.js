export const MenuRDProjects={
    RD: {
        main: {
            pageElement:{ label:'R&D projects'},
            screenShotsName: "my R&D Projects Menu Open",
            screenShotsNameLots: "formFilled", 
            name: "RandD",
        },

        mobile: {
            pageElement:".RandD",
            screenShotsName: "myR&DProjectsMenuOpen",
        },

        ProductDevelopment: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=RandD&viewName=rdprojects&filterName=",
            screenShotsName: "Product Development",
        },

        MethodValidation: {
            pageElement: "https://demo.trazit.net/dashboard/procedures?procName=RandD&viewName=methodvalidation&filterName=",
            screenShotsName: "Method Validation",
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
