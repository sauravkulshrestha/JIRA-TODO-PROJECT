const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
let color = ['lightpink' , 'lightgreen' , 'lightblue' , 'black'];
let modalPriorityColor = color[color.length - 1];
let allPriorityColors = document.querySelectorAll(".priority-color");
let textAreaCont =  document.querySelector(".modal-Text");
let mainCont = document.querySelector(".main-cont");
let isModalPresent  = false;
var uid = new ShortUniqueId();
let ticketArr = [];
let toolBoxColor = document.querySelectorAll(".color");


// to open modal conatiner
addBtn.addEventListener('click' ,  function(){
 if(!isModalPresent){
     modalCont.style.display = "flex";
    }else{
     modalCont.style.display = "none";
 }
 isModalPresent = !isModalPresent;
})  

// to remove active class from priority color container 
// and to add the same active class on the clicked color element.
allPriorityColors.forEach(function(colorElement){
    colorElement.addEventListener('click' , function(){
        allPriorityColors.forEach(function(priorityColorElement){
        priorityColorElement.classList.remove("active");
    });
    colorElement.classList.add("active");
    modalPriorityColor = colorElement.classList[0];

});
});

// topp generate and display of tickets
modalCont.addEventListener("keydown" , function(e){
    let key  = e.key;
    if(key == "Shift"){
     createTicket(modalPriorityColor , textAreaCont.value);

     modalCont.style.display = "none";
     isModalPresent = false;
    //  modalPriorityColor = colorElement.classList[1];
    }
});

// function to create new tickets
function createTicket( ticketColor , data , ticketId){
    let id = ticketId || uid();
    let ticketCont  = document.createElement("div");
    ticketCont.setAttribute("class" , "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}" ></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area ">${data}</div>
    `;
    mainCont.appendChild(ticketCont);
    textAreaCont.value= "";
    
    if(!ticketId){
        ticketArr.push({ticketColor , data , ticketId : id});
        localStorage.setItem("Tickets" , JSON.stringify(ticketArr));
    }
};


// get all tickets from local storage

if(localStorage.getItem("Tickets")){
    ticketArr = JSON.parse(localStorage.getItem("Tickets"));
    ticketArr.forEach(function(ticketArrObj){
        createTicket(ticketArrObj.ticketColor , ticketArrObj.data , ticketArrObj.ticketId);

    })
}

// filter ticket on the basis of ticket color 

for(let i = 0 ; i < toolBoxColor.length ; i++){
 
    toolBoxColor[i].addEventListener("click" , function(){
    let currToolBoxColor = toolBoxColor[i].classList[0];

    let filteredTicket = ticketArr.filter(function(ticketObj) {
                 return currToolBoxColor == ticketObj.ticketColor ;
    });

    // remove all tickets
    let allTicket = document.querySelectorAll(".ticket-cont");
    for(let i = 0 ; i < allTicket.length ; i++){
        allTicket[i].remove();

    }

    // only disply the tickets whose color has been selected
    filteredTicket.forEach(function(ticketObj){
        createTicket(ticketObj.ticketColor , ticketObj.data , ticketObj.ticketId);
    })
    
       

    })



}





