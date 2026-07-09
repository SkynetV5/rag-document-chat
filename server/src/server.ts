import app from './app';

const PORT = process.env.PORT
const URL = process.env.URL

app.listen(PORT, () => {
    console.log(`Server is running on ${URL}`);
});