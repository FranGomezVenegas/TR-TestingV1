// PageActions.js
import { test } from '@playwright/test';

export class PageActions {
  constructor(page) {
    this.page = page;
  }

  async createNewItem(name, model, serialNumber, manufacturer) {
    await test.step('Create new instrument', async () => {
      await test.step('Fill instrument name', async () => {
        await this.page.getByLabel('* New Instrument Name').fill(name);
        await this.page.screenshot({ path: 'screenshots/fill-instrument-name.png' });
      });

      await test.step('Fill model', async () => {
        await this.page.getByLabel('* Model').fill(model);
        await this.page.screenshot({ path: 'screenshots/fill-model.png' });
      });

      await test.step('Fill serial number', async () => {
        await this.page.getByLabel('* Serial Number').fill(serialNumber);
        await this.page.screenshot({ path: 'screenshots/fill-serial-number.png' });
      });

      await test.step('Select manufacturer', async () => {
        await this.page.getByLabel('* ManufacturerName').click();
        await this.page.getByRole('option', { name: manufacturer }).click();
        await this.page.screenshot({ path: 'screenshots/select-manufacturer.png' });
      });
    });
  }

  async turnOnline() {
    await test.step('Turn instrument online', async () => {
      const turnOnlineButton = await this.page.getByTitle('Turn online').getByRole('img');
      if (turnOnlineButton) {
        await turnOnlineButton.click();
        await this.page.screenshot({ path: 'screenshots/turn-online.png' });
      } else {
        console.error('Turn online button not found.');
      }
    });
  }

  async turnOffline() {
    await test.step('Turn instrument offline', async () => {
      const turnOfflineButton = await this.page.getByTitle('Turn off-line').getByRole('img');
      if (turnOfflineButton) {
        await turnOfflineButton.click();
        await this.page.screenshot({ path: 'screenshots/turn-offline.png' });
      } else {
        console.error('Turn offline button not found.');
      }
    });
  }

  async checkActionsExist() {
    return await test.step('Check if actions exist', async () => {
      const createNewFolder = await this.page.$('[data-test-id="create_new_folder"]');
      const turnOnline = await this.page.$('[data-test-id="turn_online"]');
      const turnOffline = await this.page.$('[data-test-id="turn_offline"]');
      
      await this.page.screenshot({ path: 'screenshots/check-actions-exist.png' });
      
      return createNewFolder !== null && turnOnline !== null && turnOffline !== null;
    });
  }
}