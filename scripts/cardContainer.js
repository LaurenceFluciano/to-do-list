let cards = null;

function handleCardContainer(allElements){
    let container = allElements.container
    let dropzones = allElements.dropzones

    cards = container.querySelectorAll(".cards");
    arrowDropHandler(cards);
    
    const editableTitles = container.querySelectorAll(".component-title"); 
    limitTitle(40, editableTitles);

    handlerArrowEvent(dropzones)
}

function arrowDropHandler() {
    document.querySelectorAll(".arrow_drop_down").forEach(arrow => {
        arrow.removeEventListener("click", toggleContent);
        arrow.addEventListener("click", toggleContent);
    });
}

function toggleContent(event) {
    const card = event.target.closest(".cards");
    if (!card) return;

    const contentComponent = card.querySelector(".content-component");
    if (contentComponent) {
        contentComponent.classList.toggle("hidden");
    }
}

function limitTitle(size, editableTitles){
    editableTitles.forEach(title => {
        title.addEventListener("input", function (event) {
            if (this.textContent.length > size) {
                this.textContent = this.textContent.substring(0, size);
                event.preventDefault(); 
            }
        });
    });
}

function deleteCard(button){
    const closest_card = button.closest('.cards');
    if (closest_card) closest_card.remove();
}

function handleMouseEnterAndOutInCard(){
    document.querySelectorAll('.p').forEach(element => {
        element.addEventListener('mouseenter', function(){
            let card = this.closest(".cards");
            if (card) card.setAttribute('draggable', 'false');
        });

        element.addEventListener('mouseleave', function(){
            let card = this.closest(".cards");
            if (card) card.setAttribute('draggable', 'true');
        });
    });
}

function handlerArrowEvent(dropzones){
    document.querySelectorAll(".arrowMove").forEach(arrowMove => {
        arrowMove.removeEventListener("click", (event) => { handleMoveCard(event,arrowMove,dropzones) } );
        arrowMove.addEventListener(   "click", (event) => { handleMoveCard(event,arrowMove,dropzones) } );
    });
}

function handleMoveCard(event, arrowMove, dropzones) {
    const card = event.target.closest(".cards"); 
    const attributeCard = card.getAttribute("data-current-dropzone");
    const id = arrowMove.getAttribute("data-id"); 

    const arrayDropzones = Array.from(dropzones); 
    let currentIndex = findCurrentDropzoneIndex(attributeCard, arrayDropzones);
    let nextIndex = getNextIndex(id, currentIndex, arrayDropzones); 


    card.setAttribute("data-current-dropzone", arrayDropzones[nextIndex].id); 

    moveToOtherDropzone(arrayDropzones[nextIndex], card);
}

function moveToOtherDropzone(next_dropzone, card) {
    next_dropzone.appendChild(card); 
}

function findCurrentDropzoneIndex(attributeCard, arrayDropzones) {
    let currentIndex = -1;
    for (let i = 0; i < arrayDropzones.length; i++) {
        if (arrayDropzones[i].id === attributeCard) {
            currentIndex = i;
            break;
        }
    }
    if (currentIndex === -1) return; 
    return currentIndex; 
}

function getNextIndex(id, currentIndex, arrayDropzones) {
    let nextIndex = id === "down" ? currentIndex + 1 : currentIndex - 1; // Calcula o índice da próxima zona
    
    if (nextIndex < 0) {
        nextIndex = arrayDropzones.length - 1;
    } else if (nextIndex >= arrayDropzones.length) {
        nextIndex = 0;
    }
    return nextIndex; 
}