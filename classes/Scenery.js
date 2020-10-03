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

  /* -------------------------------------------- */

  /**
   * Obtain module metadata and merge it with game settings which track current module visibility
   * @return {Object}   The data provided to the template when rendering the form
   */
  async getData() {
    const flag = canvas.scene.getFlag('scenery', 'variations');
    const gm = flag.gm || canvas.scene.data.img;
    const pl = flag.pl || canvas.scene.data.img;
    if (this.variations.length === 0) {
      // Add default variation
      this.variations.push({
        name: 'Default',
        url: canvas.scene.data.img,
      });
      if (flag.variations) flag.variations.forEach((v) => this.variations.push(v));
    }

    // Add extra empty variation
    this.variations.push({ name: '', url: '' });
    // Return data to the template
    return { variations: this.variations, gm, pl };
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }

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
    const variations = Object.values(formData.variations)
      .slice(1)
      .filter((v) => v.url && v.name);
    const gm = formData.variations[formData.gm].url;
    const pl = formData.variations[formData.pl].url;
    const data = {
      variations,
      gm,
      pl,
    };
    log(data);
    await canvas.scene.setFlag('scenery', 'variations', data);
    this.close();
  }
}
