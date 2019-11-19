# dense-redux-actions

Small "class based actions creators" to get type safe actions with TypeScript, to benefit from intellisense and to enable unified naming for ease of code navigation.   

## This is a test release please don't use (yet :-).

This version is not release ready, expect it to be ready before 20 november 2019.

**Use with care**

## How to install

   yarn add dense-redux-actions

   or 

   npm install dense-redux-actions -- save

## How to use

### A simple example 

Create a vanilla action creator:
    
    // actions.ts
    import { ActionCreator } from 'dense-redux-actions';

    export const myActionCreator = new ActionCreator<string>('MY_ACTION_TYPE'); 

Dispatch an action:

    import { myActionCreator } from './actions';

    const mapDispatchToProps = (dispatch) => {
      return {
        on: (str: string) => dispatch(myActionCreator.create(str)),
      };
    }
    
    or from a saga

    yield put(myActionCreator.create('some string payload'));    

Consume an action:

    switch (action.type) {
      case myActionCreator.type: {
        const payload = myActionCreator.payload(action);
        // do something with payload
      }
    }

### Example for use with unified naming

Using the action type as name for the action creator makes navigating the code base 
easier since you don't have to remember what the creator's name is for a given type. 

    // actions.ts
    import { ActionCreator } from 'dense-redux-actions';
    
    interface ResourceType {
      type: string;
      id: string;
    }

    interface LocationType {
      region: string;
    }

    export const API_SOME_RESOURCE_REQUEST 
      = new ActionCreator<ResourceType, LocationType>('API_SOME_RESOURCE_REQUEST'); 


Dispatch an action:

    const mapDispatchToProps = (dispatch) => {
      return {
        fetch: (resource, region) => 
          dispatch(API_SOME_RESOURCE_REQUEST.create(resource, region))
      }
    }

Consume the action:

    import { GenericAction } from 'dense-redux-actions'; 
    import { API_SOME_RESOURCE_REQUEST } from './actions';

    function* processRequests(action: GenericAction) {
      switch (action.type) {
        case API_SOME_RESOURCE_REQUEST.type: {
          const { payload, meta } = API_SOME_RESOURCE_REQUEST.unpack(action);
          ...
        }
      }
    }

## API

Create a new action creator:

    new ActionCreator<PayloadType, MetaType?>(actionType: string)

    Ex:

    const ACTION = new ActionCreator<string, string>('ACTION');

    or 

    const ACTION = new ActionCreator<null>('ACTION');

Create a new action:

    create(payload: PayloadType, meta?: MetaType): ActionType
    
    Ex:

    ACTION.create('test', 'me') // => {type: 'ACTION', _payload: 'test', _meta: 'me'}

Get typed payload from generic action:

    payload(action: GenericAction): PayloadType

    Ex:

    const payload = ACTION.payload(action); // ex. payload: string = 'test'

Get type meta data:

    meta(action: GenericAction): MetaType

    Ex:

    const meta = ACTION.meta(action); // ex. meta: string = 'me'

Unpack both payload and meta data:

    unpack(action: GenericAction): { payload: PayloadType, meta: MetaType }

    Ex:

    const { payload, meta } = ACTION.unpack(action);

## Alternatives

If you are look for a framework for handling redux actions instead you may want to checkout:

* [typesafe-actions](https://www.npmjs.com/package/typesafe-actions)

or 

* [redux-toolbelt](https://www.npmjs.com/package/redux-toolbelt)

