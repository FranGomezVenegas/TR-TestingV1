// Acciones para 
export const ACTIONS = {
  createNewFolder: async (page) => {
    await page.getByLabel('create_new_folder').click();
    await page.pause();
    console.log('Clicked on "Create New Folder" button');
  },

  newInstrumentsName: async (page) => {
    await page.getByLabel('* New Instrument Name').click();
    await page.pause();
    await page.pause();
    await page.getByLabel('* New Instrument Name').fill('testing');
  },

  selectFamily: async (page) => {
    await page.getByLabel('* Family').click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: 'Viscosimetro' }).click();
  },

  model: async (page) => {
    await page.getByLabel('* Model').click();
    await page.pause();
    await page.pause();
    await page.getByLabel('* Model').fill('1');
  },

  selectSupplier: async (page) => {
    await page.getByLabel('* Supplier').click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: 'Mettler Toledo' }).click();
  },
  
  serialNumber: async (page) => {
    await page.getByLabel('* Serial Number').click();
    await page.pause();
    await page.pause();
    await page.getByLabel('* Serial Number').fill('1'); 
  },

  selectManafucterName: async (page) => {
    await page.getByLabel('* ManufacturerName').click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: 'Perkin Elmer' }).click();
  },

  selectResponsible: async (page) => {
    await page.getByLabel('Responsible', { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: 'admin', exact: true }).click();
  },

  selectResponsibleBackup: async (page) => {
    await page.getByLabel('Responsible Backup', { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByRole('option', { name: 'admin', exact: true }).click();

  },

  purchaseDate: async (page) => {
    await page.getByLabel('Purchase Date', { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel('Purchase Date').fill('2024-09-01');
  },

  installationDate: async (page) => {
    await page.getByLabel('* Installation Date', { exact: true }).click();
    await page.pause();
    await page.pause();
    await page.getByLabel('* Installation Date').fill('2024-09-01');
  },

  cancelOrAccept: async (page) => {
    await page.getByRole('button', { name: 'Cancel' }).click();
  }
  
};
