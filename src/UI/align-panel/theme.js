import { DocumentType } from '../../easy-fns';

export const Theme = {
  Dark: 'dark',
  Light: 'light'
};

export const themeForDocType = (docType) => {
  switch(docType) {
    case DocumentType.Footprint:
    case DocumentType.PCB:
    case DocumentType.PCBModule:
      return Theme.Dark;

    default:
      return Theme.Light;
  }
};