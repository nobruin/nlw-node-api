import express from 'express';

const app = express();


app.get("/", (request, response) => {
    return response.json({message: "Hello world - nlw04"});
});

app.post("/", (request, response) => {
    return response.json({message: "Dados enviados - nlw04"});
});

app.listen(3333, () => console.log('Running'));