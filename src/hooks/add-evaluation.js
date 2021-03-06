// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    console.log(hook.data)

    if (hook.data.addevaluation === undefined) return Promise.resolve(hook);

    const url = hook.params.headers.referer
    const studentid = url.split('/').pop()

    return hook.app.service("batches").get(hook.id)
      .then((batch) => {
        const { students } = batch
        // const student = students.find((s) => (s._id.toString() === studentid))
        //
        // const evaluation = student.evaluation

        const updatedStudents = students.map((student) => {
          if (student._id.toString() === studentid) {
            student.evaluation = student.evaluation.concat(hook.data.addevaluation) }
          return student
        })
        batch.students = updatedStudents

        hook.data = {
          students: batch.students
        }

      })

    return Promise.resolve(hook);
  };
};
