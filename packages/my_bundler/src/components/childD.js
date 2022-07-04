import { createElement } from '../common.js';
import { childE } from './childE.js';

export var baz = 'baz'

export const childD = createElement('div', { class: 'd' }, ['bar', childE]);