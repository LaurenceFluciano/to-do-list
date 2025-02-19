function dragAndDropMethods() { 
    return {
        dragMethods: {
            dragStart: function(event) { 
                if (event.target.closest('.content-component')) {
                    event.preventDefault();
                    return;
                }
                this.classList.add("dragging"); 
            },
            dragEnd: function() { 
                this.classList.remove("dragging"); 
            },
            dragOver: function(event) { 
                event.preventDefault();
                this.classList.add("drag-over");
            },
            dragLeave: function() { this.classList.remove("drag-over"); }
        },
        dropMethods: {
            drop: function(event) {
                event.preventDefault();
                this.classList.remove("drag-over");

                const cardDraggingElement = document.querySelector('.dragging');
                if (cardDraggingElement) { 
                    cardDraggingElement.setAttribute("data-current-dropzone", this.id);
                    this.appendChild(cardDraggingElement);
                }
            }
        }
    };
}

function addDragAndDropListeners(draggables, dropzones, dragMethods, dropMethods) {
    draggables.forEach(draggable => { 
        draggable.addEventListener('dragstart', dragMethods.dragStart, true);
        draggable.addEventListener('dragend', dragMethods.dragEnd, true);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', dragMethods.dragOver, true);
        dropzone.addEventListener('dragleave', dragMethods.dragLeave, true);
        dropzone.addEventListener('drop', dropMethods.drop, true);
    });
}
