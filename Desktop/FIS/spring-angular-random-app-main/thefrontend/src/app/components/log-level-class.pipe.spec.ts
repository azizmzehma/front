import { LogLevelClassPipe } from './log-level-class.pipe';

describe('LogLevelClassPipe', () => {
  it('create an instance', () => {
    const pipe = new LogLevelClassPipe();
    expect(pipe).toBeTruthy();
  });
});
