// @flow
// Creates action creators. Arg names are added as properties to action object

function generateActionCreator(type: string, ...argNames: any) {
  return (function () {
    const action = {
      type,
    };
    argNames.forEach((arg, index) => {
      if (typeof arg === 'object') {
        for (const key in arg) {
          action[key] = arg[key];
        }
      } else {
        action[argNames[index]] = undefined;
      }
    });
    return action;
  }());
}

export default generateActionCreator;
