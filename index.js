import http from "http"
import fetch from 'node-fetch';


const server = http.createServer ((req, res) => {
    const url = req.url;
    let tableData = "<table border='1'><tr><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>"   
    if (url === '/') {
       res.write("Home Page") 
       res.end('<img src = "https://dummyimage.com/600x400/000/fff" />')
    } 
    if (url === '/list') {
        fetch("https://swapi.dev/api/people")
            .then((res) => res.json())
            .then((data) => {
                createData(data.results);
                res.write(tableData);
                res.end();
            });
    }        
    else res.write('Error 404. Sorry! Page Not Found')
        res.end ()

    function createData(data) {
        //console.log(data.results);
        data.forEach(element => {
            tableData+=`<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
            })
            tableData+=`</table>`
        };

    
}).listen(7500,console.log('Server is running on port 7500'));
