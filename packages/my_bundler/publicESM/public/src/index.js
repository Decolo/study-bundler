import { childA } from './components/childA.js';
import { childB } from './components/childB.js';
import { childD } from './components/childD.js';

import { createElement, render } from './common.js'

import './style.css';

const rootNode = createElement('div', {}, [childA, childB,  childD])

render(rootNode, document.getElementById('root'));