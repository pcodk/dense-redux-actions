import { ActionCreator, GenericAction } from './index';

interface TestType {
  testField1: string;
  testField2: number;
}

describe('Test action creator instantiation', () => {
  let TEST_ACTION: ActionCreator<TestType, string | undefined>;
  let action: GenericAction;

  beforeEach(() => {
    TEST_ACTION = new ActionCreator<TestType, string | undefined>('TEST_ACTION');
    action = TEST_ACTION.create(
      { testField1: 'Hello', testField2: 29 },
      'test',
    );
  });

  it('is a action creator', () => {
    expect(TEST_ACTION).toBeInstanceOf(ActionCreator);
    expect(TEST_ACTION.type).toBe('TEST_ACTION');
  });

  it('fail action creator construction', () => {
    expect(() => new ActionCreator<null>('')).toThrow();
  });

  it('can create action', () => {
    expect(action).toMatchObject({
      _payload: { testField1: 'Hello', testField2: 29 },
      _meta: 'test',
    });
  });

  it('can extract payload and meta data', () => {
    const { payload, meta } = TEST_ACTION.unpack(action);

    expect(payload).toMatchObject({ testField1: 'Hello', testField2: 29 });
    expect(meta).toBe('test');

    const payload1 = TEST_ACTION.payload(action);

    expect(payload1).toMatchObject({ testField1: 'Hello', testField2: 29 });

    const meta1 = TEST_ACTION.meta(action);

    expect(meta1).toBe('test');
  });

  it('fail on action type mismatch', () => {
    const TEST_ACTION_2 = new ActionCreator<null>('TEST_ACTION_2');

    expect(() => TEST_ACTION_2.unpack(action)).toThrow();
    expect(() => TEST_ACTION_2.payload(action)).toThrow();
    expect(() => TEST_ACTION_2.meta(action)).toThrow();
  });

  it('fail on invalid action', () => {
    let testAction: GenericAction;

    expect(() => TEST_ACTION.unpack(testAction)).toThrow();
    expect(() => TEST_ACTION.payload(testAction)).toThrow();
    expect(() => TEST_ACTION.meta(testAction)).toThrow();
  });
});
