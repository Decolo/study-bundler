import { createElement } from '../common.js';
import { baz } from './childD.js';

export const childE = createElement('div', {}, [baz]);