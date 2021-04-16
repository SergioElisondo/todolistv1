// set this up from TOP to BOTTOM as you see it
// alert('working!') -- this is test that it is connected

const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('.todoItem span')
const todoComplete = document.querySelectorAll('.todoItem span.completed')

// add event listener to ALL of them -- Array.from(deleteBtn) this is an array of all Deletes
Array.from(deleteBtn).forEach((element)=>{ // forEach loops through each array 
    element.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', undo)
})

//function deleteTodo (){
    // alert('clicked delete') // check that it is working
//}

// the funtion works, BUT we have a problem... 

// JS a single threaded language DO NOT have the ability make a request to a server, since JS run in the browswer, it CAN however use FETCH
// only thing that can make a REQUEST from the CLIENT side? FETCH. aka 'async' function, then try{}catch{}


// this is what we can to delete: <span><%=zebra[i].todo%> </span>
// bacause we are in a CLICK EVENT and  you JUST clicked on DELETE while on index.ejs, 'this' refers to the 'delete span' from index.ejs



// NOTES START FROM HERE FOR THE FUNCTION BELOW!
// async function deleteTodo (){
//     // this = delete, parentNode = li, childNodes[1] =<span><%=zebra[i].todo%></span>
//     const todoText = this.parentNode.childNodes[1].innerText
//     try{
//        const response = await fetch ('deleteTodo', { // deleteTodo is the route our fetch will be on and the name of our API and the 'fetch' it can also take in an object - this is where we all the stuff about the fetch we're about to make
//             //     this is the info that we send along with the FETCH 
//             method: 'delete', // this is a 'delete' request
//             headers: {'Content-type': 'application/json'}, // what type of info we are sending is in the headers, how it's formatted - we are sending JSON
//             body: JSON.stringify({ // sending a requset body with out fetch
//                 'rainbowUnicorn': todoText // equal to whatever the text was next to thing that we clicked on that had the word delete -- we can pull out text from 'delete' button by using 'rainbowUnicorn'
//             }) 
           
//          })
//      const data = await response.json() // this is info we grab from 'response' above, now parsed as JSON
//             console.log(data) // checking to see if it works
//             location.reload() // refreshes page 
//     catch{

//     }
// }
// }


// NOTES FOR THIS ARE ABOVE!!!!
async function deleteTodo(){
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}







// adding an event listener for line-through effect 
// ADDED AT THE TOP OF PAGE 
//const todoItem = document.querySelectorAll('.todoItem span')// any span inside of .todoItem list

// ADDED TP THE TOP OF PAGE UNDER FIRST ARRAY 
// Array.from(todoItem).forEach((element)=>{ // forEach loops through each array 
// element.addEventListener('click', markComplete)
// } )

async function markComplete(){
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', { // changing what we are pulling -- grabbing text
            method: 'put', //not a delete request, but a PUT request
             headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function undo(){
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}