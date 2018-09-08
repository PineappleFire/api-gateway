db.createUser({
  user: "pineapplefire",
  pwd: "iloveicons",
  roles: [
    { role: "readWrite", db: "users" }
  ]
});

db.users.insert({
  name: "pineapplefire"
});
