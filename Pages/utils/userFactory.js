// util/userFactory.js
const { faker } = require('@faker-js/faker');
const slug = (str) => faker.helpers.slugify(str).toLowerCase();

  function createRandomUser() {
  const firstName = faker.person.firstName();
  console.log(`Generated first name: ${firstName}`);
  const lastName  = faker.person.lastName();
  console.log(`Generated last name: ${lastName}`);
  const email = `${slug(firstName)}.${slug(lastName)}@yopmail.com`;
  console.log(`Generated email: ${email}`);
  const password = faker.internet.password({ length: 12 });
  console.log(`Generated password: ${password}`);
  const telephone = faker.phone.number('+54 9 261 #### ####');
  console.log(`Generated telephone: ${telephone}`);

  return {
    firstName,lastName,email,password,telephone
  }
}

module.exports = { createRandomUser };


