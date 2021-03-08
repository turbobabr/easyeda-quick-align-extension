import EventEmitter from 'event-emitter3';
import debounce from 'debounce';
import KeyCodes from './key-codes';
import { preventEvent } from './utils';

export const Actions = {
  AlignComponents: 'alignComponents',
  AlignPrefixes: 'alignPrefixes'
};

class DocumentInstanceEventMonitor extends EventEmitter {
  constructor() {
    super();

    this._frame = null;
    this._document = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  attachToDocument(documentId) {
    const mainDocument = EventMonitor.mainDocument;
    if (!mainDocument) {
      console.log('Cannot obtain main document!');
      return;
    }

    const frame = mainDocument.getElementById(`frame_${documentId}`);
    if (!frame) {
      console.log(`Cannot obtain iFrame for document with id: '${documentId}'`);
      return;
    }

    frame.contentWindow.document.addEventListener('keydown', this.onKeyDown, true);
    frame.contentWindow.document.addEventListener('mousemove', this.onMouseMove);    

    this._document = frame.contentWindow.document;
    this._frame = frame;
  }

  detach() {
    if (this._document) {
      this._document.removeEventListener('keydown', this.onKeyDown);
      this._document.removeEventListener('mousemove', this.onMouseMove);
    }

    this._frame = null;
    this._document = null;
  }

  onKeyDown(e) {
    this.emit('onKeyDown', e);
  }

  onMouseMove(e) {
    this.emit('onMouseMove', e);
  }
}

class EventMonitor extends EventEmitter {
  constructor() {
    super();

    this._observer = null;
    this._eventMonitors = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    
    this._restartEventMonitorsDebounced = debounce(() => {
      this.startEventMonitors();
    }, 1500);

    this._restartEventMonitorsDebounced = this._restartEventMonitorsDebounced.bind(this);

    this._mousePointerInEditor = {
      x: 0,
      y: 0
    };
  }

  static get openedDocumentIds() {
    const ids = [];
    const nodes = $("#tabbar_bodies").find("> div");
    nodes.each((_, node) => {
      const uuid = $(node).attr('uuid');
      if (uuid) {
        ids.push(uuid);
      }
    });

    return ids;
  }

  static get mainDocument() {
    return document;
  }

  static get editorContainer() {
    return EventMonitor.mainDocument.getElementById('tabbar_bodies');
  }

  setup() {
    this.startDocumentsObserving();
    this.restartEventMonitors();
  }

  startDocumentsObserving() {
    const documentsContainer = EventMonitor.editorContainer;
    if (!documentsContainer) {
      this._observer = null;
      return;
    }

    this._observer = new MutationObserver(() => {
      this.restartEventMonitors();
    });

    this._observer.observe(documentsContainer, {
      childList: true
    });
  }

  stopDocumentsObserving() {
    if (!this._observer) {
      return;
    }

    this._observer.disconnect();
    this._observer = null;
  }

  restartEventMonitors() {
    if (!this._restartEventMonitorsDebounced) {
      return;
    }

    this._restartEventMonitorsDebounced();
  }

  startEventMonitors() {
    this.stopEventMonitors();

    this._eventMonitors = [];

    const documentIds = EventMonitor.openedDocumentIds;
    documentIds && documentIds.forEach((id) => {
      const em = new DocumentInstanceEventMonitor();
      em.attachToDocument(id);
      em.on('onKeyDown', this.onKeyDown);
      em.on('onMouseMove', this.onMouseMove);
      this._eventMonitors.push(em);
    });
  }

  stopEventMonitors() {
    this._eventMonitors && this._eventMonitors.forEach((em) => {
      em.detach();
    });

    this._eventMonitors = null;
  }

  onMouseMove(e) {
    this._mousePointerInEditor = {
      x: e.clientX,
      y: e.clientY
    };
  }

  eventHasActiveModifiers(e) {
    return e.shiftKey || e.metaKey || e.ctrlKey || e.altKey;
  }

  eventHasShiftOnlyModifier(e) {
    return e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey;
  }

  onKeyDown(event) {
    const ignoreTypes = ['textarea', 'input'];
    if (ignoreTypes.includes(event.target.type)) {
      return;
    }

    if (event.keyCode === KeyCodes.A_Key && !this.eventHasActiveModifiers(event)) {
      preventEvent(event);
      this.emit(Actions.AlignComponents, this._mousePointerInEditor);
    } else if(event.keyCode === KeyCodes.A_Key && this.eventHasShiftOnlyModifier(event)) {
      preventEvent(event);
      this.emit(Actions.AlignPrefixes, this._mousePointerInEditor);
    }
  }
}

export default EventMonitor;