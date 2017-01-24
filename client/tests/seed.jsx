import * as defaults from 'stateDefaults';

//setting up seed data to automatically be updated with
//future properties added to the state defaults
//   - resolves issue of future errors if the future properties
//     are queried for in the component and do not exist

export var registerProps = {
  ...defaults.registerDefault,
  error: {...defaults.errorDefault}
};
