export function isNational(textLower) {
  return textLower.includes('național') || textLower.includes('national');
}

export function isNetwork(textLower, operator) {
  return textLower.includes('rețea') || textLower.includes('retea') || textLower.includes(operator);
}

export function isRoaming(textLower) {
  return textLower.includes('see') || textLower.includes('roaming') || textLower.includes('internațional') || textLower.includes('international');
}