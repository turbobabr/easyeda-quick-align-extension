export const DocumentType = {
  Schematic: '1',
  Symbol: '2',
  PCB: '3',  
  Footprint: '4',
  SpiceSymbol: '7',
  SchematicModule: '13',
  PCBModule: '14',
  PCB2DRendering: '12',
  Unknown: 'unknown'
};

export const Commands = {
  // Prefix Position
  SetPrefixPositionLeft: 'reset_pre(left)',
  SetPrefixPositionTop: 'reset_pre(top)',
  SetPrefixPositionRight: 'reset_pre(right)',
  SetPrefixPositionBottom: 'reset_pre(bottom)',
  SetPrefixPositionCenter: 'reset_pre(center)',
};

export const doEasyCommand = (cmd, args = []) => {
  return easyeda.extension.doCommand(cmd,args);
};

export const easyCallByEditor = (method, args = []) => {
  return callByEditor({
    func: method,
    args
  });
};

export const easyEditorCall = (cmd, args = []) => {
  return api('editorCall', {
    cmd,
    args
  });
};

export const getActiveTabInfo = () => {
  return easyCallByEditor('getActiveTabInfo');
};

export const getActiveTabDocumentType = () => {
  const info = easyCallByEditor('getActiveTabInfo');
  if(!info) {
    return DocumentType.Unknown;
  }
  
  return info.docType;
};

export const getTabFrameById = (id) => {
  return easyCallByEditor('getTabById', [id])
};

export const getActiveTabFrame = () => {
  const info = getActiveTabInfo();
  if (!info) {
    return null;
  }

  return getTabFrameById(info.tabid);
}

export const focusOnActiveTabFrame = () => {
  const frame = getActiveTabFrame();
  if (!frame) {
    return;
  }

  frame.focus();
};

export const AlignActions = {
  Left: 'left',
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  HorizontalCenter: 'horzCenter',
  VerticalCenter: 'vertCenter',
  DistributeHorizontally: 'distributeHorizontally',
  DistributeVertically: 'distributeVertically',
  Center: 'center'
};

export const performAlignAction = (action) => {
  switch (action) {
    case AlignActions.Left:
      easyEditorCall('align_left');
      break;

    case AlignActions.Top:
      easyEditorCall('align_top');
      break;

    case AlignActions.Right:
      easyEditorCall('align_right');
      break;

    case AlignActions.Bottom:
      easyEditorCall('align_bottom');
      break;

    case AlignActions.HorizontalCenter:
      easyEditorCall('align_vertical_center');
      break;

    case AlignActions.VerticalCenter:
      easyEditorCall('align_horizontal_center');
      break;

    case AlignActions.DistributeHorizontally:
      easyEditorCall('align_horizontal_equidistant');
      break;

    case AlignActions.DistributeVertically:
      easyEditorCall('align_vertical_equidistant');
      break;

    case AlignActions.Center:
      easyEditorCall('align_horizontal_center');
      easyEditorCall('align_vertical_center');
      break;

    default:
      console.warn(`[API.performAlignAction]: Unknown align action - '${action}'`);
      break;
  }
};

export const performPrefixAlignAction = (action) => {
  switch (action) {
    case AlignActions.Left:
      doEasyCommand(Commands.SetPrefixPositionLeft);
      break;

    case AlignActions.Top:
      doEasyCommand(Commands.SetPrefixPositionTop);
      break;

    case AlignActions.Right:
      doEasyCommand(Commands.SetPrefixPositionRight);      
      break;

    case AlignActions.Bottom:
      doEasyCommand(Commands.SetPrefixPositionBottom);
      break;

    case AlignActions.Center:
      doEasyCommand(Commands.SetPrefixPositionCenter);      
      break;

    default:
      console.warn(`[API.performPrefixAlignAction]: Unknown align action - '${action}'`);
      break;
  }  
};

export const getSelection = () => {
  const str = api('getSelectedIds');
  if(str === "") {
    return [];
  }

  return str.split(',');
};

export const select = (ids) => {
  api('select', { ids: ids });
}

export const activeDocumentHasSelectedItems = () => {
  const selection = getSelection();
  return selection && selection.length > 1;
}

export const fetchLocalFile = (extensionId,fileName) => {
  const extension = easyeda.extension.instances[extensionId];
  if(!extension) {
    return Promise.reject();
  }

  const url = extension.blobURLs[fileName];
  if(!url) {
    return Promise.reject();
  }

  return fetch(url)
    .then(res => { return res.json() });    
};

export const getActiveDocumentSourceAsObject = () => {
  return api('getSource',{ type: 'json' });
};