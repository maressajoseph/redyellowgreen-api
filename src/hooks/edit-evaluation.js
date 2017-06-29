// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.editeva === undefined) return Promise.resolve(hook);

    console.log(hook.data)

    const url = hook.params.headers.referer
    const studentid = url.split('/').pop()

    console.log(studentid)

    return hook.app.service("batches").get(hook.id)
      .then((batch) => {
        const { students } = batch

        const student = students.find((s) => (s._id.toString() === studentid))

        const editEvaluations = students.map((student) => {
          if (student._id.toString() === studentid) {
            student.evaluation[student.evaluation.length-1].color = hook.data.editeva.color }

          if (student._id.toString() === studentid) {
            student.evaluation[student.evaluation.length-1].remark = hook.data.editeva.remark }
          return student
        })

        batch.students = editEvaluations
        console.log(batch.students)

        hook.data = {
          students: batch.students
        }

      })
    return Promise.resolve(hook);
  };
};
