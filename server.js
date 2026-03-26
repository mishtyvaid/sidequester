app.post("/user", (req, res) => {
  const { username, interests } = req.body;
  const data = readData();

  if (!data.users[username]) {
    data.users[username] = {
      elixer: 0,
      streak: 0,
      skips: 0,
      interests: interests || ["social"],
      lastQuest: "",
      lastType: ""
    };
  } else {
    // allow updating interests
    data.users[username].interests = interests;
  }

  writeData(data);

  res.json(data.users[username]);
});