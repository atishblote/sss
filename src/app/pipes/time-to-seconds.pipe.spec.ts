import { TimeToSecondsPipe } from './time-to-seconds.pipe';

describe('TimeToSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeToSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
