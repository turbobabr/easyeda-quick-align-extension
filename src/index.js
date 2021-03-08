import EventMonitor from './event-monitor';
import { Actions } from './event-monitor';
import { showPanel, PanelVariant } from './UI/align-panel/panel';
import showMessage from './UI/message-box';

import { getActiveTabDocumentType, DocumentType, activeDocumentHasSelectedItems } from './easy-fns';
import { checkForNewVersions } from './updates-checker';

const EXTENSION_IDENTIFIER = 'extension-quickalign-id';
(() => {
  try {
    const monitor = new EventMonitor();
    setTimeout(() => {
      monitor.setup();
    }, 1);

    monitor.on(Actions.AlignComponents, (mousePointerInEditor) => {
      const validDocTypes = [
        DocumentType.Schematic,
        DocumentType.SchematicModule,
        DocumentType.PCB,
        DocumentType.SpiceSymbol,
        DocumentType.PCBModule,
        DocumentType.Footprint
      ];

      const docType = getActiveTabDocumentType();
      if (validDocTypes.includes(docType)) {
        if (!activeDocumentHasSelectedItems()) {
          showMessage('[quick-align]: Select two or more objects to be aligned', 2500);
          return;
        }

        showPanel(mousePointerInEditor, docType, PanelVariant.ComponentAlign);
      }
    });

    monitor.on(Actions.AlignPrefixes, (mousePointerInEditor) => {
      const validDocTypes = [
        DocumentType.PCB,
        DocumentType.PCBModule,
        DocumentType.Footprint
      ];

      const docType = getActiveTabDocumentType();
      if (validDocTypes.includes(docType) && activeDocumentHasSelectedItems()) {
        showPanel(mousePointerInEditor, docType, PanelVariant.PrefixAlign);
      }
    });

  } catch (e) {
    console.error(e);
  }

  return EXTENSION_IDENTIFIER;
})();