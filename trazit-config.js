export const ConfigSettings={
    platformUrl: "http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/",
    // platformUrl:"https://demo.trazit.net/",
    // platformUrll:"https://demo.trazit.net/dashboard",
    backendUrl: "https://platform.trazit.net:8443/TRAZiT-API/userinterface/UserInterfaceTesting",
    //backendUrl: "http://localhost:8080/TRAZiT-API/userinterface/UserInterfaceTesting",
     

    finalToken: "eyJ1c2VyREIiOiJwcm9jc2FkbWluIiwiZGF0ZXRpbWVGb3JtYXRBdFBsYXRmb3JtTGV2ZWwiOiJESVNBQkxFRCIsInByb2NzTW9kdWxlTmFtZSI6ImFwcCphcHAiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6ImFwcCoxKi0xIiwiZVNpZ24iOiJmaXJtYWRlbW8iLCJ1c2VyREJQYXNzd29yZCI6InRyYXppdDRldmVyIiwidXNlck1haWwiOiJpbmZvQHRyYXppdC5uZXQiLCJ1c2VyX3Byb2NlZHVyZXMiOiJbYXBwXSIsImFwcFNlc3Npb25JZCI6IjUxNDQiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJNb24gQXByIDE1IDIwOjM4OjQ0IFVUQyAyMDI0IiwidXNlclJvbGUiOiJwcm9jX21hbmFnZW1lbnQiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMTcifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.1DpDWrSgE4kWjRohuEgjfMdFG-9C5q2QTGudULYYhD4",
    dbName:"demo_v0_9_2",
    procInstanceName:"",
    zuserAdmin: "admin",
    zuserAdminPss : "trazit",
   

    login:{
        fldUser:{label:"User", value:"admin"},
        fldPss:{label:"Password", value:"trazit", actionName: "Enter"}, 
    },

    procdefinition: {
        fldUser:{label:"User", value:"procsadmin"},
        fldPss:{label:"Password", value:"trazit4ever", actionName: "Enter"}, 
    },
    
    confirmDialog:{
        userCredentials:{
            fldUser:{name: 'User'},
            fldPassword:{label: "Current Password"},
            btnAccept:{name: "Accept" },
            btnCancel:{name: "Cancel" }
        },
        eSignCredentials:{
            fldEsign:{name: 'esg'},
            btnAccept:{name: "Accept" },
            btnCancel:{name: "Cancel" }
        }        
    },
    screenShotsContentType: "image/png",  
    screenShotsCredencials: {
        screenShotsName: "credentials",
        pageElementName: ".header"
    },
    mobileHamburguerMenu: "mwc-icon-button.menu",
    
    platformSreenShotsName: {
        mySettings: {
            MenuOpen: "mySettingMenuOpen",
            windowOpen:{
                HolidaysCalendarWindowsOpen: "windowopenholidays",
                Incident: "windowopen", 
                EndPoints: "windowopenendpoints",
                UserProfile: "windowopenuser",
                VideoTutorial: "windowopentutorial",
                Logouts: "windowopenlogouts", 

            },
        },

        procedure: {
            MenuOpen: "menuProcedureOpen",
            windowOpenProcedure:{
                Procedure: "windowopenprocedure",
            },
        },

        myCertification: {
            MenuOpen: "menuMyCertificationOpen",
            windowOpenMyCertification:{
                Procedure: "windowopenmycertification",
            },
        },

        changeLanguage: {
            MenuOpen: "menuChangeLanguageOpen",
            windowOpenChangeLanguage:{
                Procedure: "windowopenchangelanguage",
            },
        },
       
        logout:{
            MenuOpen: "menulogoutOpen",
            windowOpenLogout:{
                Procedure: "windowopenclosesession",
            },
        },

        userProfile:{
            MenuOpen: "menuUserProfile",
            windowOpenUserProfile:{
                Procedure: "windowsopenuser"
            }
        }
    }   
}

export const platformMenuNames={
    mySettings: {
        main: {
            pageElementName: 'sp-action-menu#dashboardmysettings',
            screenShotsName: "mySettingsMenuOpen",
            screenShotsNameIncident: "formempty",
        },

        mobile: {
            pageElement:"md-list-item#dashboardmysettings",
            screenShotsName: "mySettingsMenuOpen",
        },


        holidaysCalendar: {
            pageElementName:  "dashboard/holidayscalendar",
            screenShotsName: "windowsopenholidays",
        },


        incidents: {
            pageElementName: "dashboard/incidents",
            screenShotsName: "windowopenincident",
        },
        

        endPoints: {
            pageElementName: "dashboard/endpoints",
            screenShotsName: "windowopenendpoints",
        },


        userProfile: {
            pageElementName: "dashboard/user",
            screenShotsName: "windowopenuser",
        },


        
        videotutorial: {
            pageElementName: "dashboard/tutorial",
            screenShotsName: "windowsopentutorial",
        }, 
        
    },

    procedure: {
        main: {
            pageElementName: "sp-action-menu#dashboardprocedures",
            screenShotsName: "window open procedure",
        },

        mobile: {
            pageElementName: "md-list-item#dashboardmyprocedures",
            //pageElementName: "mwc-list-item#dashboardmyprocedures",
            screenShotsName: "windows open procedure",
        }
    },

    myCertification: {
        main: {
            pageElementName: "#cert-menu",
            textToClick: "My Certifications",
            screenShotsName: "formemptymycertifications",
        },
        
        mobile: {
            pageElementName: "mwc-list-item#dashboardmycertifications",
            screenShotsName: "windowsopenprocedure",
        },


        analytical: {
            pageElementName: "dashboard/certifications?filterData=analytic",
            pageElementName2: "http://demo.ff2024.s3-website.eu-west-3.amazonaws.com/dashboard/certifications?filterData=analytic",
            screenShotsName: "formemptyanalytical",
        }, 

        SOP: {
            pageElementName: "dashboard/certifications?filterData=sop",
            screenShotsName: "formemptysop",
        },
    
    },

    logouts: {
        pageElementName: "sp-menu-item#logout",
        screenShotsName: "close session",
    },

    logoutsMobile: {
        //pageElementName: "mwc-list-item#logout",
        pageElementName: "md-list-item#logout",
        screenShotsName: "close session",
    },


    notification: {
        main: {
            pageElementName: "sp-action-menu#notif-menu", 
            pageElementNameDiv: "sp-menu-item#notif-item",
            // pageElementName: "sp-action-menu#dashboardnotifications",
            screenShotsName: "Notification", 
        },

        mobile:{
            pageElementMenu: "md-filled-icon-button.menu",
            screenShotsMenu: "Menu",
            pageElement: "md-list-item#dashboardnotifications",
            screenShotsName: "Notification",
        }
    },

    
    Notification: {
        MenuOpenNotifications: "NotificationMenu",

        main: {
            
            // pageElement: "sp-action-menu#dashboardnotifications",
            pageElement: "sp-action-menu#notif-menu",
            screenShotsName: "Notifications",

            pageElementdiv: "#notif-item-div",
            screenShotsdivNotification: "Last Notification" ,
        },

        mobile: {
            //pageElement: "mwc-list-item#dashboardnotifications",
            pageElement: "mwc-list-item#notif-menu",
            screenShotsName: "Notifications",
        }

    },

    changeLanguage: {
        main:{
            pageElementName: "mwc-icon-button#changelang",
            screenShotsName: "formemptychangelang",
        },

        mobile:{
            pageElement: "mwc-icon-button#changelang",
            screenShotsName: "foremptychngelang",
        }
    },

    logout: {
        main:{
            pageElementName: "sp-action-item#logout",
            screenShotsName: "Close Session",
        },

        mobile: {
            pageElement: "mwc-list-item#logout",
            screenShotsName: "Close Session",
        }
    }
}