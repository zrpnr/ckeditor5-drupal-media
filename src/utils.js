import { isWidget } from 'ckeditor5/src/widget';

/**
 * Checks if the provided model element is `drupalMedia`.
 *
 * @param modelElement {Element} The model element to be checked.
 * @returns {boolean}
 */
export function isDrupalMedia(modelElement) {
  return !!modelElement && modelElement.is('element', 'drupalMedia');
}

export function isDrupalMediaWidget(viewElement) {
  return (
    isWidget(viewElement) && !!viewElement.getCustomProperty('drupalMedia')
  );
}

export function getSelectedDrupalMediaWidget(selection) {
  const viewElement = selection.getSelectedElement();
  if (viewElement && isDrupalMediaWidget(viewElement)) {
    return viewElement;
  }

  return null;
}
