import AppInterface from '../appInterface';

const main = document.getElementById('main');
const app = new AppInterface(main);

test('Validate coordinates', () => {
  expect(app.validateCoordinates('51.50851, -0.12572')).toBeTruthy();
  expect(app.validateCoordinates('51.50851,-0.12572')).toBeTruthy();
  expect(app.validateCoordinates('[51.50851,-0.12572]')).toBeTruthy();
  expect(app.validateCoordinates('555555555')).not.toBeTruthy();
  expect(app.validateCoordinates('[some, words]')).not.toBeTruthy();
});
