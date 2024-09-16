import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'custom-sidebar-addon';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Ejemplo',
    render: ({ active, key }) => {
      const container = document.createElement('div');
      container.style.padding = '10px 15px';
      container.innerHTML = `
        <h3>Ejemplo</h3>
        <p>Este es un ejemplo de contenido personalizado para el menú lateral.</p>
        <a href="https://demo.trazit.net">Enlace a más información</a>
      `;
      return container;
    },
  });
});