const { chromium } = require('playwright');
import { UserCredentialsPhrase } from './test-config-userCredentials';
import { JustificationPhrase } from './test-config-JustificationPhrase';
// Definino la clase JustificationPhrase
export class ConfirmDialogController {
  constructor(page) {
      this.page = page;
  }

  // Método para completar la justificación en un campo de texto
  async checkWhetherActionHasConfirmDialog(page, ConfigSettings, testData, testInfo) {
      //await page.waitForTimeout(2000); // Pausa antes de comenzar la interacción para asegurar que la página esté completamente cargada
      console.log('Into checkWhetherActionHasConfirmDialog');

      const justificationPhrase = new JustificationPhrase(this.page);
      const userCredentialsPhrase = new UserCredentialsPhrase(this.page);

      await page.goto(ConfigSettings.platformUrl);
      await page.waitForTimeout(1000); // Pausa después de la navegación para permitir que la página cargue completamente

      const procList = await page.evaluate(() => {
          const userSession = sessionStorage.getItem("userSession");
          if (userSession) {
              const sessionData = JSON.parse(userSession);
              return sessionData.procedures_list.procedures;
          }
          return null;  // or an empty array, depending on how you want to handle the absence of data
      });

      const pArr = procList.filter(p => p.procInstanceName == testData.procInstanceName);
      if (!pArr || pArr.length === 0) {
          return null;
      }

      let p = pArr[0];
      let justificationType = "";
      let justificationList = "";
      let confirmDialogType = "";
      let actionName = testData.endpoints.endpointsActions[0];

      if (p.actions_with_esign.indexOf(actionName) >= 0) {
          let idx = p.actions_with_esign.findIndex(p => p == actionName);
          --idx; // the object is on the previous index
          if (p.actions_with_esign[idx][actionName].type) {
              justificationType = p.actions_with_esign[idx][actionName].type;
              if (justificationType != "TEXT") {
                  justificationList = p.actions_with_esign[idx][actionName].list_entries;
              }
          }
          confirmDialogType = "esign";

      } else if (p.actions_with_confirm_user.indexOf(actionName) >= 0) {
          let idx = p.actions_with_confirm_user.findIndex(p => p == actionName);
          --idx; // the object is on the previous index
          if (p.actions_with_confirm_user[idx][actionName].type) {
              justificationType = p.actions_with_confirm_user[idx][actionName].type;
              if (justificationType != "TEXT") {
                  justificationList = p.actions_with_confirm_user[idx][actionName].list_entries;
              }
          }
          confirmDialogType = "user";
          await userCredentialsPhrase.checkUserCredentials(ConfigSettings, justificationType, justificationList, testInfo);

      } else if (p.actions_with_justification_phrase.indexOf(actionName) >= 0) {
          let idx = p.actions_with_justification_phrase.findIndex(p => p == actionName);
          --idx; // the object is on the previous index
          if (p.actions_with_justification_phrase[idx][actionName].type) {
              justificationType = p.actions_with_justification_phrase[idx][actionName].type;
              if (!justificationType || justificationType.length == 0 || justificationType == 'LABPLANET_FALSE') {
                  console.log('In procedure business rules, for action ' + actionName + ', No confirmDialogDetail specified, it will use TEXT then');
                  justificationType = "TEXT";
              }
              if (justificationType != "TEXT") {
                  justificationList = p.actions_with_justification_phrase[idx][actionName].list_entries;
              }
          }
          confirmDialogType = "justification";
          await justificationPhrase.fillJustification(page, ConfigSettings, justificationType, justificationList, testInfo);

      } else if (p.actions_with_action_confirm.indexOf(actionName) >= 0) {
          confirmDialogType = "confirm";
      } else {
          confirmDialogType = "";
      }

      console.log('confirmDialogType', confirmDialogType);
      return { confirmDialogType, justificationType, justificationList };
  }
}
