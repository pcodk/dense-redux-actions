export interface GenericAction {
  type: string;
  _payload: any;
  _meta: any;
}

export class ActionCreator<T,R = undefined> {
  constructor(actionType: string) {
    this.type = actionType;
  }

  public readonly type: string;

  public payload(action: GenericAction): T {
    return action._payload;
  }

  public meta(action: GenericAction): R {
    return action._meta;
  }

  public create(_payload: T, _meta?: R) {
    return {
      type: this.type,
      _payload,
      _meta,
    };
  }
}
