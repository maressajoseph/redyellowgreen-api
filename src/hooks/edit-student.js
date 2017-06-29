// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.edit === undefined) return Promise.resolve(hook);

    const url = hook.params.headers.referer
    const studentid = url.split('/').pop()

    return hook.app.service("batches").get(hook.id)
      .then((batch) => {
        const { students } = batch

        const student = students.find((s) => (s._id.toString() === studentid))

        const editStudents = students.map((student) => {
          if (student._id.toString() === studentid) {
            student.name = hook.data.edit.name }
          if (student._id.toString() === studentid) {
            student.photo = hook.data.edit.photo }
          return student
        })

        hook.data = {
               students: editStudents
             }
      })

    return Promise.resolve(hook);
  };
};
