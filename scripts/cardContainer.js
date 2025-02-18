let cards = null;

function handleCardContainer(allElements){
    let container = allElements.container
    let dropzones = allElements.dropzones

    cards = container.querySelectorAll(".cards");
    arrowDropHandler(cards);
    
    const editableTitles = container.querySelectorAll(".component-title"); 
    limitTitle(40, editableTitles);

    moveCardToBottom(dropzones)
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

function moveCardToBottom(dropzones){
    document.querySelectorAll(".arrowMove").forEach(arrowMove => {
        arrowMove.removeEventListener("click", (event) => { moveContent(event,arrowMove,dropzones) } );
        arrowMove.addEventListener(   "click", (event) => { moveContent(event,arrowMove,dropzones) } );
    });
}

function moveContent(event, arrowMove, dropzones){
    let currentCard= arrowMove.getAttribute("data-current-dropzone")
    let id = arrowMove.getAttribute("data-id")

    const card = event.target.closest(".cards");
    if (!card) return;

    
        if(id == "down"){
            if (dropzones[0].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[1].id)
                moveToOtherDropzone(dropzones[1],card)
            }
            if (dropzones[1].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[2].id)
                moveToOtherDropzone(dropzones[2],card)
            }
            if (dropzones[2].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[0].id)
                moveToOtherDropzone(dropzones[0],card)
            }
        } else {
            if (dropzones[0].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[2].id)
                moveToOtherDropzone(dropzones[2],card)
            }
            if (dropzones[1].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[0].id)
                moveToOtherDropzone(dropzones[0],card)
              
            }
            if (dropzones[2].id == currentCard) {
                arrowMove.removeAttribute("data-current-dropzone")
                arrowMove.setAttribute("data-current-dropzone",dropzones[1].id)
                moveToOtherDropzone(dropzones[1],card)
            }
        }
}

function moveToOtherDropzone(next_dropzone, card){
    next_dropzone.appendChild(card)
}