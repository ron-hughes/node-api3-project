const express = require("express");
const db = require("./userDb.js");
const router = express.Router();

router.post("/", async  (req, res, next) => {
try {
  const data = await db.insert (req.body )
  res.status(201).json(data)
} catch (err) {
  next(err)
}
// console.log(req.body)

});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", async (req, res, next) => {
  try { 
    const users = await db.get()
    res.status(200).json(users);
  }
  catch (err) {
    next()
  }
  

});

router.get("/:id", (req, res, next) => {
  try {
    const data = db.getById(req.params.id)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }

});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
