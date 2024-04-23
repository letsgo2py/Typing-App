import express from 'express';
import { generate, count } from "random-words";

const app = express();
const PORT = 3000;

app.use(express.static("public"))

const randomLen = [15, 16, 17, 18, 19, 20]

let randIdx = Math.floor(Math.random()*randomLen.length)
const randomTextArr = generate(randomLen[randIdx])

let  randomText = ""
for(let i = 0; i<randomLen[randIdx]; i++){
    randomText += randomTextArr[i] + " "
}

console.log(randomText)
app.get("/", (req, res) => {
    res.render("home.ejs", {
        text : randomText
    })
})
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))