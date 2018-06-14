import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import './styles/styles.css';
import App from './App';

const rootElement = document.getElementById('root');

render(<App />, rootElement);
