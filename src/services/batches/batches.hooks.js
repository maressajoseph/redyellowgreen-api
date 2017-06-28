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
    update: [
      ...restrict
    ],
    patch: [
      ...restrict
    ],
    remove: [
      ...restrict
    ]
  },

  after: {
    all: [
      populate({ schema: teacherSchema }),
    ],
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
