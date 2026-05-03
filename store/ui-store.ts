import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const isGalleryExpandedAtom = atom(false);
export const showLabelsAtom = atomWithStorage('folio-show-labels', true);
