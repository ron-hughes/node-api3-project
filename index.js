const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();
const port = 4000


server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
