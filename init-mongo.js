db.createUser(
  {
    user : "admin",
    pwd : "adminpass1234",
    roles : [
      {
        role : "readWrite",
        db : "amd-hack"
      }
    ]
  }
)
