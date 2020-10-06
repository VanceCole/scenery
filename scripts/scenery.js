import Scenery from './classes/Scenery.js';
import { log } from './helpers.js';

Hooks.once('init', () => {
  // eslint-disable-next-line no-console
  log('Scenery | Init');
  loadTemplates(['modules/scenery/templates/variation.hbs']);
});

Hooks.on('getSceneNavigationContext', async (html, entryOptions) => {
  const viewOption = {
    name: game.i18n.localize('SCENERY.scenery'),
    icon: '<i class="fas fa-images"></i>',
    condition: () => game.user.isGM,
    callback: () => {
      new Scenery().render(true);
    },
  };
  entryOptions.push(viewOption);
});

Hooks.on('canvasInit', Scenery._onCanvasInit);
Hooks.on('updateScene', Scenery._onUpdateScene);

// eslint-disable-next-line no-unused-vars
Handlebars.registerHelper('debug', (data, breakpoint) => {
  // eslint-disable-next-line no-debugger
  debugger;
});

CONFIG.debug.scenery = true;
