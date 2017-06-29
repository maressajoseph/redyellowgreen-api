// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations


    const { user } = hook.params

    hook.data.userId = user._id,
    hook.data.number = hook.data.number
    hook.data.starts = hook.data.starts
    hook.data.ends = hook.data.ends

    return Promise.resolve(hook);
  };
};
