export interface GenericAction {
  type: string;
  _payload: any;
  _meta: any;
}

export class ActionCreator<PayloadType, MetaType = undefined> {
  constructor(actionType: string) {
    if (!this.isString(actionType) || actionType.length === 0) {
      throw new Error('ActionType needs to be a non empty string');
    }

    this.type = actionType;
  }

  private isString(str: string) {
    return Object.prototype.toString.call(str) === '[object String]';
  }

  private isObject(obj: object) {
    return typeof obj === 'object' && obj !== null;
  }

  public readonly type: string;

  public payload(action: GenericAction): PayloadType {
    if (!this.isObject(action)) {
      throw new Error(
        "Can't extract a payload from something that isn't an action",
      );
    }

    if (action.type !== this.type) {
      throw new Error(
        `Can't extract a payload. Expected action of type ${this.type} got ${action.type}`,
      );
    }

    return action._payload;
  }

  public unpack(action: GenericAction): { payload: PayloadType; meta?: MetaType } {
    if (!this.isObject(action)) {
      throw new Error("Can't unpack from something that isn't an action");
    }

    if (action.type !== this.type) {
      throw new Error(
        `Can't unpack action. Expected action of type ${this.type} got ${action.type}`,
      );
    }

    return { payload: action._payload, meta: action._meta };
  }

  public meta(action: GenericAction): MetaType {
    if (!this.isObject(action)) {
      throw new Error(
        "Can't extract a metadata from something that isn't an action",
      );
    }

    if (action.type !== this.type) {
      throw new Error(
        `Can't extract a metadata. Expected action of type ${this.type} got ${action.type}`,
      );
    }

    return action._meta;
  }

  public destruct(): {[actionType: string]: (_payload: PayloadType, _meta?: MetaType) => object} {
    return {
      [this.type]: (_payload: PayloadType, _meta?: MetaType) => {
        return {
          type: this.type,
          _payload,
          _meta,
        };
      }
    };
  }

  public create(_payload: PayloadType, _meta?: MetaType) {
    return {
      type: this.type,
      _payload,
      _meta,
    };
  }
}
