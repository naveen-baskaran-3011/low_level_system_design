const symbols = [
  '🍇',
  '🍉',
  '🚗',
  '🍌',
  '🏠',
  '🥭',
  '🍎',
  '🐯',
  '🍒',
  '🍓',
  '🐵',
  '🥝',
  '🍿',
  '🏀',
  '🎱',
  '🐻',
  '🍜',
  '🍢',
  '🎓',
  '🍤',
  '🦀',
  '🍦',
  '🍩',
  '🎂',
  '🍫',
  '🍭',
  '🍼',
  '🪔',
  '🍺',
  '🐱',
  '🐶',
];

function randomSymbolSelect() {
  const symbolsSet = new Set();
  for(let i=0; i<8; ) {
    const randomPos = Math.floor(Math.random() * symbols.length);
    if (symbolsSet.has(symbols[randomPos])) {
      continue;
    }

    symbolsSet.add(symbols[randomPos]);
    i++;
  }

  return symbolsSet;
}

export function arrayGenerator() {
  let symbolArray = randomSymbolSelect();
  return [...symbolArray, ...[...symbolArray].sort()]
}