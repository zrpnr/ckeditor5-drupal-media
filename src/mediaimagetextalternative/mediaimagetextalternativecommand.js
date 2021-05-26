import { Command } from 'ckeditor5/src/core';
import { isDrupalMedia } from '../utils';

/**
 * The media image text alternative command.
 *
 * This is used to change the `alt` attribute of `<drupalMedia>` elements.
 *
 * @see https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-image/src/imagetextalternative/imagetextalternativecommand.js
 */
export default class MediaImageTextAlternativeCommand extends Command {
  /**
   * The command value: `false` if there is no `alt` attribute, otherwise the value of the `alt` attribute.

  /**
   * @inheritDoc
   */
  refresh() {
    const element = this.editor.model.document.selection.getSelectedElement();

    this.isEnabled = false;
    if (isDrupalMedia(element)) {
      this._isMediaImage(element).then((hasImageField) => {
        this.isEnabled = hasImageField;
      });
    }

    if (isDrupalMedia(element) && element.hasAttribute('alt')) {
      this.value = element.getAttribute('alt');
    } else {
      this.value = false;
    }
  }

  /**
   * Executes the command.
   *
   * @param {Object} options
   * @param {String} options.newValue The new value of the `alt` attribute to set.
   */
  execute(options) {
    const model = this.editor.model;
    const imageElement = model.document.selection.getSelectedElement();

    model.change((writer) => {
      writer.setAttribute('alt', options.newValue, imageElement);
    });
  }

  async _isMediaImage(modelElement) {
    const options = this.editor.config.get('drupalMedia');
    if (!options) {
      return null;
    }

    const { isMediaUrl } = options;
    const query = new URLSearchParams({
      uuid: modelElement.getAttribute('data-entity-uuid'),
    });
    const response = await fetch(`${isMediaUrl}?${query}`);
    if (response.ok) {
      return JSON.parse(await response.text());
    }

    return null;
  }

}
