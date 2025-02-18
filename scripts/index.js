document.addEventListener("DOMContentLoaded", main);

let allElements;
let { dragMethods, dropMethods } = dragAndDropMethods(); 

function main(){  
    allElements = getAllElements()
    contextMenuEvent({container: allElements.container, menu: allElements.menu})
}

function update(){
    allElements = getAllElements();
    addDragAndDropListeners(allElements.draggables, allElements.dropzones, dragMethods, dropMethods);
    handleMouseEnterAndOutInCard()
    handleCardContainer(allElements)
}

function getAllElements() {
    return {
        draggables: document.querySelectorAll(".cards[draggable='true']")  ,
        dropzones: document.querySelectorAll(".dropzone") ,
        menu: document.getElementById("menu-container") ,
        container: document.querySelector(".container") 
    };
}

