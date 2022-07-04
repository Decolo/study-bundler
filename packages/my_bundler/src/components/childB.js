import { createElement } from '../common.js';
import { childC } from './childC.js';

export const childB = createElement('div', {}, [childC]);