const { authenticate } = require('feathers-authentication').hooks;
const { restrictToOwner, associateCurrentUser, restrictToAuthenticated } = require('feathers-authentication-hooks');
const { populate } = require('feathers-hooks-common');

const teacherSchema = {
  include: {
    service: 'users',
    nameAs: 'author',
    parentField: 'userId',
    childField: '_id'
  }
};

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
  restrictToOwner({
    ownerField: 'userId'
  })
];

const createBatch = require('../../hooks/create-batch');

const addStudent = require('../../hooks/add-student');

const addEvaluation = require('../../hooks/add-evaluation');

const deleteStudent = require('../../hooks/delete-student');

const editStudent = require('../../hooks/edit-student');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      restrictToAuthenticated(),
      associateCurrentUser({ as: 'userId' }),
      createBatch()
    ],
    update: [addStudent(), addEvaluation(), deleteStudent(), editStudent()],
    patch: [addStudent(), addEvaluation(), deleteStudent(), editStudent()],
    remove: [
      ...restrict
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
