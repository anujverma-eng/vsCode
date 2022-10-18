// const fetch = require('fetch');
import fetch from "node-fetch";
const fetchData = async () => {

    try {
        const url = "http://localhost:8000";
        const res = await fetch(url);
        console.log(res);
        const data = await res.text();
        console.log(data);

    } catch (err) {
        console.log(err);
    }
};

fetchData();

// for (let i = 0; i < 10000; i++) {
//     fetchData(i)
// }