require("./config/db")
const express = require("express")
const cors = require("cors")
const app =express()
const swaggerDocument = require("./swagger.json")
const swaggerUi = require('swagger-ui-express')
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors())

const postRoutes = require("./routes/postsRoute")
const fileRoutes = require("./routes/fileRoute")

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/posts", postRoutes)
app.use("/api/files", fileRoutes)


app.listen(port, ()=>{console.log("ParkinSons API is listening Port ", port)})