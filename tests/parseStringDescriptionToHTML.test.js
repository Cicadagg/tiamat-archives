
  
const parseF = require('./parseStringDescriptionToHTML');

test('parse string description to HTML', () => {
  expect(
    parseF('@2@$[On Hit]$Накладывает 2 #sinking#')).toBe(
    '<img className="coin2"/><span className="condition condition--onhit">[On Hit]</span>Накладывает 2 <img className="status" src="../images/tags/sinking.webp"/><span className="status--name">sinking</span>'
    );
});