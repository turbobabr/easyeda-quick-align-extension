import {
  getActiveTabFrame,
  AlignActions,
  performAlignAction,
  focusOnActiveTabFrame,
  performPrefixAlignAction
} from '../../easy-fns';
import KeyCodes from '../../key-codes';
import {
  preventEvent
} from '../../utils';
import {
  Theme,
  themeForDocType
} from './theme';
import './styles.scss';
import './animations.scss';

export const PanelVariant = {
  ComponentAlign: 'componentAlign',
  PrefixAlign: 'prefixAlign'
};

import selectAllPrefixes from './select-all-prefixes';

import componentAlignDarkPanelSVG from './assets/component-align-dark-panel.svg';
import componentAlignLightPanelSVG from './assets/component-align-light-panel.svg';
import prefixAlignDarkPanelSVG from './assets/prefix-align-dark-panel.svg'

const ROOT_CONTAINER_ID = 'quick-align-root-ui-container';
const PANEL_CONTAINER_ID = 'quick-align-panel-container';

const getPanelContainer = () => {
  return $(`#${PANEL_CONTAINER_ID}`).get(0);
};

export const isPanelActive = () => {
  const container = getPanelContainer();
  if (!container) {
    return false;
  }

  return $(container).is(':visible');
};

const dismiss = () => {
  const container = getPanelContainer();
  if (!container) {
    return;
  }

  $(container).hide();
};


const getCurrentPanelTheme = () => {
  const container = getPanelContainer();
  if (!container) {
    return Theme.Dark;
  }

  return $(container).attr('data-theme');
};

const getCurrentPanelVariant = () => {
  const container = getPanelContainer();
  if (!container) {
    return Theme.Dark;
  }

  return $(container).attr('data-variant');
};

export const purgePanel = () => {
  const rootContainer = $(`#${ROOT_CONTAINER_ID}`);
  if (!rootContainer) {
    return;
  }

  $(rootContainer).remove();
};

const shouldAutoDismissOnAction = (e) => {
  return !e.shiftKey;
};

const doGenericAlign = (alignAction, e, aligner = () => {}) => {
  preventEvent(e);
  aligner(alignAction);
  if (shouldAutoDismissOnAction(e)) {
    dismiss();
    focusOnActiveTabFrame();
  }
}

const doComponentAlign = (alignAction, e) => {
  doGenericAlign(alignAction, e, performAlignAction);
};

const doPrefixAlign = (alignAction, e) => {
  doGenericAlign(alignAction, e, performPrefixAlignAction);
};

const svgForTheme = (theme, variant) => {
  if (variant === PanelVariant.PrefixAlign) {
    return prefixAlignDarkPanelSVG;
  }

  switch (theme) {
    case Theme.Dark:
      return componentAlignDarkPanelSVG;

    case Theme.Light:
      return componentAlignLightPanelSVG;

    default:
      return componentAlignDarkPanelSVG;
  }
};

const injectPanel = (theme, variant) => {
  const style = `left: ${0}px; top: ${0}px;`;
  $('body').append(`<div id='${ROOT_CONTAINER_ID}'><div id='${PANEL_CONTAINER_ID}' style='${style}' tabindex='0'></div></div>`);
  $(`#${PANEL_CONTAINER_ID}`).append(svgForTheme(theme, variant));

  const container = getPanelContainer();
  if (!container) {
    console.error('[quick-align]: Something went wrong!');
    return;
  }

  $(container).attr('data-theme', theme);
  $(container).attr('data-variant', variant);

  container.addEventListener('blur', () => {
    dismiss();
  });

  container.addEventListener('click', () => {
    dismiss();
    focusOnActiveTabFrame();
  });

  container.addEventListener('keydown', (e) => {
    if (!isPanelActive()) {
      return;
    }

    switch (e.keyCode) {
      case KeyCodes.Esc:
      case KeyCodes.A_Key:
        dismiss();
        focusOnActiveTabFrame();
        break;

      default:
        return;
    }
  });

  let aligner = variant === PanelVariant.PrefixAlign ? doPrefixAlign : doComponentAlign;

  $('#gr-left-hovered').click(e => aligner(AlignActions.Left, e));
  $('#gr-top-hovered').click(e => aligner(AlignActions.Top, e));
  $('#gr-right-hovered').click(e => aligner(AlignActions.Right, e));
  $('#gr-bottom-hovered').click(e => aligner(AlignActions.Bottom, e));

  if (variant === PanelVariant.ComponentAlign) {
    $('#gr-center-hovered').click(e => aligner(AlignActions.HorizontalCenter, e));
    $('#distribute-vertically-button').click(e => aligner(AlignActions.DistributeVertically, e));
    $('#distribute-horizontally-button').click(e => aligner(AlignActions.DistributeHorizontally, e));
    $('#align-vertically-center-button').click(e => aligner(AlignActions.VerticalCenter, e));
    $('#align-center-center-button').click(e => aligner(AlignActions.Center, e));
  } else {
    $('#gr-center-hovered').click(e => aligner(AlignActions.Center, e));

    // FIXME: Should be enabled again after implementation of 'selectAllPrefixes' function...
    /*
    $('#select-all-prefixes-button').click(e => {
      preventEvent(e);
      selectAllPrefixes();
      if (shouldAutoDismissOnAction(e)) {
        dismiss();
        focusOnActiveTabFrame();
      }
    });
    */
  }

  return container;
}

const setPanelPosition = (position) => {
  const container = getPanelContainer();
  if (!container) {
    return;
  }

  $(container)
    .css('left', position.x)
    .css('top', position.y);
};

const show = (position, theme, variant) => {
  let container = getPanelContainer();
  if (!container) {
    container = injectPanel(theme, variant);
  }

  setPanelPosition(position);
  $(container).show();
  container.focus();
};

export const showPanel = (mousePointerInEditor, docType, variant) => {
  const activeTabFrame = getActiveTabFrame();
  if (!activeTabFrame) {
    return;
  }

  const frameBounds = activeTabFrame.getBoundingClientRect();
  const absolutePosition = {
    x: frameBounds.x + mousePointerInEditor.x - 118,
    y: frameBounds.y + mousePointerInEditor.y - 96
  };

  const theme = themeForDocType(docType, variant);
  if (getCurrentPanelTheme() !== theme || getCurrentPanelVariant() !== variant) {
    purgePanel();
  }

  show(absolutePosition, theme, variant);
};