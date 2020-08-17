import SceneryConfig from '../classes/SceneryConfig.js';

const PATH = '/modules/scenery/templates';

Hooks.once('init', () => {
  console.log(`Scenery | Init`);
});

Hooks.on('getSceneNavigationContext', async (html, entryOptions) => {
  const viewOption = {
    name: "Scenery",
    icon: '<i class="fas fa-images"></i>',
    condition: (li) => game.user.isGM,
    callback: (li) => {
      let sc = new SceneryConfig().render(true);
      console.log(sc);
    }
  };
  entryOptions.push(viewOption);

});