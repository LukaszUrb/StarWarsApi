mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  db.createUser({
    user: "$MONGO_USERNAME",
    pwd: "$MONGO_PASSWORD",
    roles: [
      { role: 'readWrite', db: "$MONGO_INITDB_DATABASE" }
    ]
  })
  db.users.insertOne({
    "email" : "test@swapi.com",
    "name" : "test",
    "password" : "\$2a\$12\$zLi/jdjju85ff435GheaIugOxf6VEFayReOv3K7/Vw7bVNtdr3pL2",
    "createdAt" : new Date(),
    "updatedAt" : new Date()
})
EOF