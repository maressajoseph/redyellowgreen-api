// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    console.log(hook)

    const url = hook.params.headers.referer
    const studentid = url.split('/').pop()

    console.log(hook.data)

    if (hook.data.delete === undefined) return Promise.resolve(hook);

    return hook.app.service("batches").get(hook.id)
      .then((batch) => {
        const { students } = batch
        const student = students.find((s) => (s._id.toString() === studentid))


        const filteredStudents = students.filter(s => s._id.toString() !== studentid)



        hook.data = {
               students: filteredStudents
             }


      })

    return Promise.resolve(hook);
  };
};
