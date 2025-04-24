/**
 * This defines a 'registry' on the document
 * That way, we have a reference to any of our component class instances
 * in the DOM, and can so call methods on them using the onevent html attributes
 */

const componentRegistryName = 'PL8ComponentRegistry';

class Component {
  /**
   * @constructor
   * @param {Function} updater Called to re-render component
   */
  constructor(updater) {
    // Set updater
    if(typeof updater != 'function') {
      throw "Updater required.";
    }

    this.updater = updater;

    // Give every component an ID
    this._id = Math.ceil(Math.random() * (new Date()).getTime());

    // Initialise component registry which gives us access to 'this'
    if(!document.pl8ComponentRegistry) {
      document[componentRegistryName] = {};
    }

    document[componentRegistryName][this._id] = this;
  }

  /**
   * Update component
   * @param {Component} updater
   */
  update() {
    this.updater(this);

    if(typeof this.afterRender == 'function') {
      this.afterRender.call(this);
    }
  }

  register(action) {
    return `document.${componentRegistryName}[${this._id}].${action}`;
  }
}

export default Component;
