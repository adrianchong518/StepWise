export const nextTick = async (frames = 1) => {
  const _nextTick = async (idx: number) => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve(idx));
    });
  };
  for (let i = 0; i < frames; i++) {
    await _nextTick(i);
  }
};
