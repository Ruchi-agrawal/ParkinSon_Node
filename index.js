require("./config/db")
const express = require("express")
const cors = require("cors")
const app =express()
const path = require("path")
const swaggerDocument = require("./swagger.json")
const swaggerUi = require('swagger-ui-express')
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors())

const postRoutes = require("./routes/postsRoute")
const fileRoutes = require("./routes/fileRoute")
const userRoutes = require("./routes/userRoute")
app.use("/node", express.static(path.join(__dirname, 'uploads')))
app.use("/node/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/node/api/posts", postRoutes)
app.use("/node/api/files", fileRoutes)
app.use("/node/api/user", userRoutes)


app.listen(port, ()=>{console.log("ParkinSons API is listening Port ", port)})