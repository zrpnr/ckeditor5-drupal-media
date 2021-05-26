import { isWidget } from 'ckeditor5/src/widget';

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
