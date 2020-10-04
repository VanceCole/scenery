import { PATH, log } from '../js/helpers.js';

export default class Scenery extends FormApplication {
  constructor() {
    super();
    this.variations = [];
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      closeOnSubmit: false,
      popOut: true,
      editable: game.user.isGM,
      width: 700,
      template: `${PATH}/templates/scenery.hbs`,
      id: 'scenery-config',
      title: game.i18n.localize('Scenery'),
    });
  }

  close() {}

  /* -------------------------------------------- */

  /**
   * Obtain module metadata and merge it with game settings which track current module visibility
   * @return {Object}   The data provided to the template when rendering the form
   */
  async getData() {
    const flag = canvas.scene.getFlag('scenery', 'data') || {};
    const bg = flag.bg || canvas.scene.data.img;
    const gm = flag.gm || canvas.scene.data.img;
    const pl = flag.pl || canvas.scene.data.img;
    if (this.variations.length === 0) {
      // Add default variation
      this.variations.push({
        name: 'Default',
        file: bg,
      });
      if (flag.variations) flag.variations.forEach((v) => this.variations.push(v));
    }

    // Add extra empty variation
    this.variations.push({ name: '', file: '' });
    // Return data to the template
    return { variations: this.variations, gm, pl };
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * This method is called upon form submission after form data is validated
   * @param {Event} event      The initial triggering submission event
   * @param {Object} formData  The object of validated form data with which to update the object
   * @private
   */
  async _updateObject(event, formData) {
    const fd = expandObject(formData);
    this[event.submitter.name](fd);
  }

  scan() {
    log(this.variations);
  }

  add() {
    this.render(true);
  }

  async submit(formData) {
    const bg = formData.variations[0].file;
    const variations = Object.values(formData.variations)
      .slice(1)
      .filter((v) => v.file);
    const gm = formData.variations[formData.gm].file;
    const pl = formData.variations[formData.pl].file;
    if (!gm || !pl) {
      ui.notifications.error('GM & Player view must have a file');
      return;
    }
    const data = { variations, bg, gm, pl };
    await canvas.scene.update({ img: bg });
    canvas.scene.setFlag('scenery', 'data', data);
    this.close();
  }

  static setImage(img, draw = true) {
    canvas.scene.data.img = img;
    if (draw) canvas.draw();
  }

  static _onCanvasInit() {
    const data = canvas.scene.getFlag('scenery', 'data');
    if (!data) return;
    const img = (game.user.isGM) ? data.gm : data.pl;
    if (img) Scenery.setImage(img, false);
  }

  static _onUpdateScene(scene, data) {
    if (hasProperty(data, 'flags.scenery.data')) {
      const img = (game.user.isGM) ? data.flags.scenery.data.gm : data.flags.scenery.data.pl;
      if (img) Scenery.setImage(img);
    }
  }
}
