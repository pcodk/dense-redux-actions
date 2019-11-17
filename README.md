# dense-redux-actions

Small "class based actions creators" to get type safe actions with TypeScript, to benefit from intellisense and to enable unified naming for ease of code navigation.   

## This is a test release please don't use (yet :-).

This version not release ready, expect it to be ready before 20 november 2019.

**Use with care**

## How to install

   yarn add dense-redux-actions

   or 

   npm install dense-redux-actions -- save

## How to use
### A simple example 

A vanilla action creator:
    
    // actions.ts
    import { ActionCreator } from 'dense-redux-actions';

    export const myActionCreator = new ActionCreator<string>('MY_ACTION_TYPE'); 

Dispatch an action

    import { myActionCreator } from '/actions';

    ...
    key: (str: sting) => dispatch(myActionCreator.create(str)), 
    
    or from a saga

    yield put(myActionCreator.create('some string'));    

Consume an action 

    switch(action.type) {
      case myActionCreator.type: {
        const payload = myActionCreator.payload(action);
      return {
        myPayload: payload
      }
      ...
    }

### Example for use with unified naming
Using the action type as name for the action creator makes navigating the code base 
easier since you don't have to remember what the creators name i for a given type. 

    //actions.ts
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


Dispatch the an action

    ...
    fetch: (resource, region) => 
      dispatch(API_SOME_RESOURCE_REQUEST.create(resource, region))

    ect.

Consume the action with something like

    import { GenericAction } from 'dense-redux-actions'; 
    import { API_SOME_RESOURCE_REQUEST } from './actions';

    function* processRequests(action: GenericAction) {
      switch (action.type) {
        case API_SOME_RESOURCE_REQUEST.type: {
          const { payload, meta } = API_SOME_RESOURCE_REQUEST.unpack(action);
    ...
    }

## API 
New action creator

    new ActionCreator<PayloadType, MetaType?>(actionType: string)

    ex.
    const ACTION = new ActionCreator<string, string>('ACTION');

    or 

    const ACTION = new ActionCreator<null>('ACTION');

Create a new action 

    create(payload: PayloadType, meta?: MetaType): ActionType
    
    ex.
    ACTION.create('test', 'me') // => {type: 'ACTION', _payload: 'test', _meta: 'me'}

Get typed payload from generic action

    payload(action: GenericAction): PayloadType

    ex.
    const payload = ACTION.payload(action); // ex. payload: string = 'test'

Get types mata data 

    mata(action: GenericAction): MetaType

    ex.
    const meta = ACTION.meta(action); // ex. meta: string = 'me'

Unpack both payload and meta data

    unpack(action: GenericAction): { payload: PayloadType, meta: MetaType }

    ex.
    const { payload, meta } = ACTION.unpack(action);