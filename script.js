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



addBtn.addEventListener('click' ,  function(){
 if(!isModalPresent){
     modalCont.style.display = "flex";
    }else{
     modalCont.style.display = "none";
 }
 isModalPresent = !isModalPresent;
})  

allPriorityColors.forEach(function(colorElement){
    colorElement.addEventListener('click' , function(){
        allPriorityColors.forEach(function(priorityColorElement){
        priorityColorElement.classList.remove("active");
    });
    colorElement.classList.add("active");
    modalPriorityColor = colorElement.classList[0];

});
});

modalCont.addEventListener("keydown" , function(e){
    let key  = e.key;
    if(key == "Shift"){
     createTicket(modalPriorityColor , textAreaCont.value);

     modalCont.style.display = "none";
     isModalPresent = false;
    //  modalPriorityColor = colorElement.classList[1];
    }
});


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






