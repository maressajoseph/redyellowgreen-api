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
      photo: "https://www.google.nl/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiDmNCg59vUAhWMY1AKHZEfDPIQjRwIBw&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F416338%2Faccount_friend_person_profile_silhouette_user_icon&psig=AFQjCNH3pOhnZkGarbad8oeGmryfFMxgDQ&ust=1498576663192453",
      evaluation: [{
        color: "Red",
        remark: "Step up your game yo",
        day: new Date(2017, 06, 26)
      }]
    },
    {
      name: "Han Kortekaas",
      photo: "https://www.google.nl/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiDmNCg59vUAhWMY1AKHZEfDPIQjRwIBw&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F416338%2Faccount_friend_person_profile_silhouette_user_icon&psig=AFQjCNH3pOhnZkGarbad8oeGmryfFMxgDQ&ust=1498576663192453",
      evaluation: [{
        color: "Red",
        remark: "Step up your game yo",
        day: new Date(2017, 06, 26)
      }]
    },
    {
      name: "Steve Galili",
      photo: "https://www.google.nl/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiDmNCg59vUAhWMY1AKHZEfDPIQjRwIBw&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F416338%2Faccount_friend_person_profile_silhouette_user_icon&psig=AFQjCNH3pOhnZkGarbad8oeGmryfFMxgDQ&ust=1498576663192453",
      evaluation: [{
        color: "Red",
        remark: "Step up your game yo",
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
