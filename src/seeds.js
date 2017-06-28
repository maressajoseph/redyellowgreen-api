const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'Arno',
  email: 'arno@arno.com',
  password: 'abc123'
}

const batches = [{
  number: 8,
  starts: new Date(2017, 05, 15),
  ends: new Date(2017, 07, 11),
  students: [
    {
      name: "Jesse Borm",
      photo: "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
      evaluation: [{
        color: "Red",
        remark: "Step up your game yo",
        day: new Date(2017, 06, 26)
      }]
    },
    {
      name: "Han Kortekaas",
      photo: "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
      evaluation: [{
        color: "Yellow",
        remark: "Meeeh..",
        day: new Date(2017, 06, 26)
      }]
    },
    {
      name: "Steve Galili",
      photo: "https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png",
      evaluation: [{
        color: "Green",
        remark: "Good job",
        day: new Date(2017, 06, 26)
      }]
    }
  ]
}]

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
.then(() => {
  feathersClient.authenticate({
    strategy: 'local',
    email: user.email,
    password: user.password
  })
  .then(() => {
    batches.map((batch) => {
      feathersClient.service('batches').create(batch)
        .then((result) => {
          console.log('Batch seeded...', result.title);
        }).catch((error) => {
          console.error('Error seeding batch!', error.message);
        });
    })
  })
  .catch(function(error){
    console.error('Error authenticating!', error);
  });
})
.catch(function(error) {
  console.error('Error creating user!', error.message);
});
