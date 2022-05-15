const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
let color = ['lightpink' , 'lightgreen' , 'lightblue' , 'black'];
let modalPriorityColor = color[color.length - 1];
let allPriorityColors = document.querySelectorAll(".priority-color");
let textAreaCont =  document.querySelector(".modal-Text");
let mainCont = document.querySelector(".main-cont");
let isModalPresent  = false;


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
     modalPriorityColor = colorElement.classList[1];
    }
});


function createTicket( ticketColor , data , ticketId){
    let ticketCont  = document.createElement("div");
    ticketCont.setAttribute("class" , "ticket-cont");
    ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}" ></div>
    <div class="ticket-id"></div>
    <div class="task-area ">${data}</div>
    `;
    mainCont.appendChild(ticketCont);
    textAreaCont.value= "";
}


    



