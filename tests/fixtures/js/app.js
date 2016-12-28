import leftpad from 'leftpad';

const input = document.querySelector('#number');
const output = document.querySelector('#output');

input.addEventListener('change', e => {
  output.textContent = leftpad(input.value, 10);
});
