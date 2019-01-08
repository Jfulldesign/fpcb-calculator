// @flow strict

export function gatedKeyPress(
  keys: Array<string>,
  cb: () => void
): (event: KeyboardEvent) => boolean {
  return (event: KeyboardEvent) => {
    if (keys.includes(event.code)) {
      event.stopPropagation;
      cb();
    }

    return true;
  };
}
