const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");

let isModalPresent  = false;
console.log(addBtn);
addBtn.addEventListener('click' ,  function(){
 if(!isModalPresent){
     modalCont.style.display = "flex";
    }else{
     modalCont.style.display = "none";
 }
 isModalPresent = !isModalPresent;
})  

let allPriorityColors = document.querySelectorAll(".priority-color");
allPriorityColors.forEach(function(colorElement){
    colorElement.addEventListener('click' , function(){
        allPriorityColors.forEach(function(priorityColorElement){
        priorityColorElement.classList.remove("active");
    });
    colorElement.classList.add("active");
  
});
});

