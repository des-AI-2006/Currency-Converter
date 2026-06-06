console.log("Hello Baccho....\n\n");

/*
                        fetch API
API: Application Programming Interface
The fetch API provides an interface for fetching(sending/receiving) resources. It uses "Request" and "Response" objects. The fetch() method is used to fetch a resource(data). 
 
Syntax:  let promise = fetch(url,[options]); 
*/

/*
     Simple APIs for Beginner Fetch Practice
1) JSONPlaceholder – fake online REST API with lots of endpoints
    Example: https://jsonplaceholder.typicode.com/posts
    Returns posts, comments, users, todos, etc.
2) ReqRes – fake data for users and login-style responses
    Base URL: https://reqres.in/api/users
3) Random User API – random user profiles
    https://randomuser.me/api/
    Good for fetching real-like JSON data.
4) DummyJSON – fake product/user data (like JSONPlaceholder)
    https://dummyjson.com/ (e.g., /products, /users)
*/
// const URL = "https://randomuser.me/api/";
// let  promise = fetch(URL);
// console.log(promise);

// const getrandomuser = async() => {
//     console.log("Getting data.... ");
//     let response = await fetch(URL);
//     console.log(response);
//     console.log(response.status);
// };
// getrandomuser();
// line 24, stores the api endpoint. This URL returns one random user in JSON format.
// line 28, this function always returns a Promise, u can use await inside it. 
// line 29, Runs immediately, this is just to show the request has started
// line 30, fetch(url): sends an http request to the server and returns a promise. await: pauses only this function and waits until the server responds. "resonse" becomes a Response object. This does not contain actual user data yet.
// line 31, prints the Response object, it contains metadata like: status,headers,body(as a stream).
/* line 32, prints the http status code, 200 means success.
 Common codes: 200 -> OK, 404 -> Not Found, 
 500 -> Server error */
// line 34, starts async operation. Function returns a Promise. 
// code return from line 24-34, does not read JSON data.This code fetches a random user, awaits for the response and logs response metadata, not the actual data.
/*  To have actual data, what to do?
Understanding terms:-
AJAX is Asynchronous JS and XML.
JSON is JavaScript Object Notation
json() method: returns a second promise that resolves with the result of parsing the response body text as JSON. 
(Input is JSON , Output is JS Object).
*/

const URL = "https://randomuser.me/api/";
const randomuser = document.querySelector("#randomuser");
let btn = document.querySelector("#btn");

const getrandomuser = async () =>{
    console.log("Getting data.....");
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(data.results[0]);
    // console.log(data.results[0]);
    console.log(data.results[0].name);
    console.log(`${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`);
    console.log(data.results[0].dob.age);
    console.log(data.results[0].email);
    randomuser.innerText= `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
    //randomuser.innerText= data.results[0].email;
};
// getrandomuser();
btn.addEventListener("click",getrandomuser);

// using promises 
// function getrandomuser(){
//     fetch(URL).then((response)=>{
//         return response.json();
//     }).then((data)=> {
//         console.log(data);
//         randomuser.innerText= `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
//     });
// }
// btn.addEventListener("click",getrandomuser);

/*
Requests & Response:

    Request:- A request is a message sent by client(browser/JS) to server, asking for something.A request contains: 
URL -> where to send
HTTP -> what action(get,post,etc.)
Headers -> extra info(content type)
Body -> data(mainly for post/put)

    Response:- A response is the message sent back by the server after processing the request. A response contains:
Status code -> result(200,404,500)
Headers -> metadata
Body -> actual data(JSON,text,etc.)

// A request asks,a response answers

    HTTP verbs :- HTTP verbs tell the server what action we want to perform on data. verbs describe intent, server decides what to allow.
 Common HTTP verbs: 
1) GET - Purpose: Read/fetch data 
         Does not change server data,GET requests usually have no body.
         fetch(url); // default is fetch
2) POST - Purpose: Send new data to server
          Creates something 
3) PUT - Purpose: Update existing data(replace)
         Sends full updated object
4) PATCH - Purpose: Update partial data
           Changes only specific fields
5) DELETE - Purpos: Removes data from server
// HTTP verbs tell the server what you want to do with the data.

    Response Status Code:- A response status code is a number sent by server that tells us what happened to our request.
Common status code groups: 
1) 2XX -> Success
        200 -> OK(request succeeded)
        201 -> Created(data successfully added)
2) 3XX -> Redirection
        301 -> Moved permanently
        302 -> Found(temporary redirect)
3) 4XX -> Client error
        400 -> Bad request(your request is wrong)
        401 -> Unauthorized
        403 -> Forbidden
        404 -> Not found  
4) 5XX -> Server error
        500 -> Internaal server error
        502 -> Bad gateway
        503 -> Service unavailable  
// Status code tells us how the server handled our request.

// HTTP response headers also conatin details about the responses such as content type, HTTP status code, etc.
*/