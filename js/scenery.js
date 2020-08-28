import Scenery from '../classes/Scenery.js';

Hooks.once('init', () => {
  // eslint-disable-next-line no-console
  console.log('Scenery | Init');
  loadTemplates(['modules/scenery/templates/variation.html']);
});

Hooks.on('getSceneNavigationContext', async (html, entryOptions) => {
  const viewOption = {
    name: 'Scenery',
    icon: '<i class="fas fa-images"></i>',
    condition: () => game.user.isGM,
    callback: () => {
      new Scenery().render(true);
    },
  };
  entryOptions.push(viewOption);
});
