import { FRAME as Frame } from '../../../contracts/Figma';
import { DurationTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeDurationTokensNoFrame,
  ErrorMakeDurationTokensNoChildren,
  ErrorMakeDurationTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma durations into a clean object
 */
export function makeDurationTokens(
  durationFrame: Frame,
  camelizeTokenNames?: boolean
): DurationTokens {
  if (!durationFrame) throw Error(ErrorMakeDurationTokensNoFrame);
  if (!durationFrame.children) throw Error(ErrorMakeDurationTokensNoChildren);

  const durations: Record<string, number> = {};
  const tokens = durationFrame.children.reverse();
  tokens.forEach((item: Frame) => makeDurationToken(item, durations, camelizeTokenNames));

  return durations as DurationTokens;
}

function makeDurationToken(
  item: Frame,
  durations: Record<string, number>,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.characters) throw Error(ErrorMakeDurationTokensMissingProps);

  const name = sanitizeString(item.name, camelizeTokenNames);
  durations[name] = parseFloat(item.characters);
}
