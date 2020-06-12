db.createUser(
  {
    user : "admin",
    pwd : "admin",
    roles : [
      {
        role : "readWrite",
        db : "amd-hack"
      }
    ]
  }
)
