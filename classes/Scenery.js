const PATH = '/modules/scenery';

export default class Scenery extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      closeOnSubmit: true,
      submitOnClose: true,
      popOut: true,
      editable: game.user.isGM,
      width: 700,
      template: `${PATH}/templates/scenery.html`,
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
    const variations = [];
    variations.push({
      id: 'new',
      name: '',
    });
    // Return data to the template
    return {
      defaultURL: canvas.scene.data.img,
      variations,
    };
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
   * @param event {Event}       The initial triggering submission event
   * @param formData {Object}   The object of validated form data with which to update the object
   * @private
   */
  async _updateObject(event, formData) {
    console.log(formData);
    Object.entries(formData).forEach(async ([key, val]) => {

    });
  }
}
