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
let removeBtn = document.querySelector(".remove-btn");
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";



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
    ticketCont.style.margin = "3rem"
    ticketCont.setAttribute("class" , "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}" ></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area ">${data}</div>

    <div class = "ticket-lock">
    <i class="fa-solid fa-lock"></i>
    </div>
    `;
    mainCont.appendChild(ticketCont);

    textAreaCont.value= "";
    handleRemoval(ticketCont , id);
    handleColor(ticketCont , id);
    handleLock(ticketCont , id);

    if(!ticketId){
        ticketArr.push({ticketColor , data , ticketId : id});
        localStorage.setItem("tickets" , JSON.stringify(ticketArr));
    }
};


// get all tickets from local storage

if(localStorage.getItem("tickets")){
    ticketArr = JSON.parse(localStorage.getItem("tickets"));
    ticketArr.forEach(function(ticketArrObj){
        createTicket(ticketArrObj.ticketColor , ticketArrObj.data , ticketArrObj.ticketId);

    })
}

// filter ticket on the basis of ticket color 

for(let i = 0 ; i < toolBoxColor.length ; i++){
 
    toolBoxColor[i].addEventListener("click" , function(){
    let currToolBoxColor = toolBoxColor[i].classList[0];

    let filteredTicket = ticketArr.filter(function(ticketObj) {
        if(currToolBoxColor == ticketObj.ticketColor){
            return ticketObj;
        }
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

// funtion to display all tickets when double clicked

toolBoxColor[i].addEventListener("dblclick" , function(){
    // remove all the present tickets
    let allTicket = document.querySelectorAll(".ticket-cont");
    for(let i = 0 ; i < allTicket.length ; i++){
        allTicket[i].remove();
        
    }
    
    // display all the tickets
    ticketArr.forEach(function(ticketObj){
        createTicket(ticketObj.ticketColor , ticketObj.data , ticketObj.ticketId);
    });
    
})

}
// remove btn clicking , color change to red.
let removeBtnActive = false;
removeBtn.addEventListener("click" , function(){
       if(removeBtnActive){
           removeBtn.style.color = "green";
       }
       else{
           removeBtn.style.color = "blue";
       }
       removeBtnActive = !removeBtnActive;
});
  

// removed deleted tickets from UI and local Storage
function handleRemoval(ticket , id) {
    ticket.addEventListener("click" , function(){
        if(!removeBtnActive) return;

        let idx  = getTicketIdx(id); // get idx of the ticket to be removed
         ticketArr.splice(idx , 1); // clicked ticket removed from ticket array

         localStorage.setItem("tickets" , JSON.stringify(ticketArr));
         ticket.remove();
    });

}

// returns the id of the ticket that is removed .
function getTicketIdx(id) {
    let ticketIdx = ticketArr.findIndex(function (ticketobj) {
      return ticketobj.ticketId == id;
    })
    return ticketIdx;
}

// changes the priority of the ticket
function handleColor(ticket , id) {
    
  let ticketColorStrip = ticket.querySelector(".ticket-color");

  ticketColorStrip.addEventListener("click" , function(){
      let currTicketColor = ticketColorStrip.classList[1];

      let currTicketColorIdx = color.indexOf(currTicketColor);

      let newTicketColorIdx = currTicketColorIdx + 1;

      newTicketColorIdx = newTicketColorIdx % color.length;

      let newticketcolor = color[newTicketColorIdx];

      ticketColorStrip.classList.remove(currTicketColor);
      ticketColorStrip.classList.add(newticketcolor);

      // setting it up in local storage

      let ticketIdx = getTicketIdx(id);
      ticketArr[ticketIdx].ticketColor = newticketcolor;
      localStorage.setItem("tickets" , JSON.stringify(ticketArr)); 
  });
}
  
function handleLock(ticket , id) {

    let ticketLockEle = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockEle.children[0];
     let ticketTastArea = ticket.querySelector(".task-area");

     ticketLock.addEventListener("click" , function(){
         let ticketIdx = getTicketIdx(id);
         if(ticketLock.classList.contains(lockClass)){
             ticketLock.classList.remove(lockClass);
             ticketLock.classList.add(unlockClass);
             ticketTastArea.setAttribute("contenteditable" , "true");
         }else{
             ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTastArea.setAttribute("contenteditable" , "false");
         }

        ticketArr[ticketIdx].data = ticketTastArea.innerText;

        localStorage.setItem("tickets" , JSON.stringify(ticketArr));

        // ticketArr[ticketIdx].data = ticketTastArea.innerText;
        // localStorage.setItem("tickets", JSON.stringify(ticketArr));
      //hello i was here b. huihui
     });
}
