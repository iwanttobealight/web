import Color from 'color';

import { getRandomNumber } from './get-random-number';

enum HexColorTone {
  Reddish = 'Reddish',
  Bluish = 'Bluish',
  Greenish = 'Greenish',
}

function getRandomHexadecimalNum(): string {
  const randomNum = getRandomNumber(0, 255);
  const hexadecimalNum = Math.abs(randomNum).toString(16);

  return hexadecimalNum.length === 1 ? `0${hexadecimalNum}` : hexadecimalNum;
}

function getRandomHexColor(tone: HexColorTone = HexColorTone.Reddish) {
  switch (tone) {
    case HexColorTone.Reddish:
      return `#FF${getRandomHexadecimalNum()}${getRandomHexadecimalNum()}`;
    case HexColorTone.Bluish:
      return `#${getRandomHexadecimalNum()}${getRandomHexadecimalNum()}FF`;
    case HexColorTone.Greenish:
      return `#${getRandomHexadecimalNum()}FF${getRandomHexadecimalNum()}`;
    default:
      return `#${getRandomHexadecimalNum()}${getRandomHexadecimalNum()}FF`;
  }
}

export function colorHash(index: number) {
  let hex =
    index % 2
      ? getRandomHexColor(HexColorTone.Reddish)
      : getRandomHexColor(HexColorTone.Bluish);

  hex =
    index % 5 || index === 0 ? hex : getRandomHexColor(HexColorTone.Greenish);

  return Color(hex).alpha(0.6).string();
}
