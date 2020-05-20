import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import TaskBlock from './TaskBlock';

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render a greeting', () => {
  act(() => {
    render(<TaskBlock />, container);
  });

  expect(
    pretty(container.innerHTML),
  ).toMatchInlineSnapshot(); /* ... автоматически заполняется Jest ... */

  act(() => {
    render(<TaskBlock name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML),
  ).toMatchInlineSnapshot(); /* ... автоматически заполняется Jest ... */

  act(() => {
    render(<TaskBlock name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML),
  ).toMatchInlineSnapshot(); /* ... автоматически заполняется Jest ... */
});
