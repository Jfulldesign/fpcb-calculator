// @flow strict

export function gatedKeyPress(
  keys: Array<string>,
  cb: (event: Event) => void
): (event: KeyboardEvent) => boolean {
  return (event: KeyboardEvent) => {
    if (keys.includes(event.code)) {
      event.stopPropagation;
      cb(event);
    }

    return true;
  };
}
