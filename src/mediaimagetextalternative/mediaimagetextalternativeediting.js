import MediaImageTextAlternativeCommand from './mediaimagetextalternativecommand';
import { Plugin } from 'ckeditor5/src/core';

/**
 * The image text alternative editing plugin.
 */
export default class MediaImageTextAlternativeEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'MediaImageTextAlternativeEditing';
  }

  /**
   * @inheritDoc
   */
  init() {
    this.editor.commands.add(
      'mediaImageTextAlternative',
      new MediaImageTextAlternativeCommand(this.editor),
    );
  }
}
