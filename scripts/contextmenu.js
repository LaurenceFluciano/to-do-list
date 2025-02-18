let closest_card = null;
let copiedText = "";

function contextMenuEvent(elements){
    elements.container.addEventListener('contextmenu', (event) => {
        event.preventDefault(); 
        removeAttributeCard()
        showCustomContextMenu(event, elements.menu);

        closest_card = event.target.closest(".cards")
        if (closest_card) {
            closest_card.setAttribute('data-id','on__card')
        }
    });

    elements.container.addEventListener('click', () => {
        removeAttributeCard()
        hideCustomContextMenu(elements.menu)
    });

    elements.menu.querySelectorAll(".listener_context_menu").forEach(btn => {
        btn.addEventListener('click', () => {
            if (contextMenu_handleClicks[btn.id]) {  
                contextMenu_handleClicks[btn.id](elements.menu); 
            } else {
                console.error(`Nenhuma função encontrada para o botão com ID: ${btn.id}`);
            }
        });
        
    });
}

function showCustomContextMenu(event, menu){
    menu.style.display = 'flex'
    menu.style.left = `${event.pageX}px`; 
    menu.style.top = `${event.pageY}px`; 
    menu.classList.add("animation-apper-context-menu")
}

function hideCustomContextMenu(menu){
    menu.style.display = 'none';
    menu.classList.remove("animation-apper-context-menu")
}

const contextMenu_handleClicks = {
    createCardElement: (menu) => {
        const card = document.createElement("div");
        card.classList.add("cards");
        card.setAttribute("draggable", "true");
        

        const components = document.createElement("div");
        components.classList.add("components");

        components.innerHTML = `
            <div class="header-component">
                <span class="material-symbols-outlined arrow_drop_down">
                    arrow_drop_down
                </span>
                <h3 class="component-title" contenteditable="true">Example</h3>
                <button class="button-remove-component material-symbols-outlined" onclick=deleteCard(this)>
                    delete
                </button>
            </div>
            <hr class="seperator-line">
            <div class="content-component" draggable="false">
                <span class="input-component"><p contenteditable="true" class="p">Something to do</p></span>
            </div>
            <div class="footer-component mobile">
                <span class="arrowMove material-symbols-outlined" data-id="down" data-current-dropzone="to-do" >arrow_downward</span>
                <span class="arrowMove material-symbols-outlined" data-id="up" data-current-dropzone="to-do"   >arrow_upward</span>
            </div>
        `;

        card.appendChild(components);

        allElements.dropzones.forEach(dropzone => {
            if (dropzone.id == "to-do"){
                dropzone.appendChild(card);
                return;
            }
        })

        update()
    },
    copyCard: (menu) =>{
        const cardToCopy = document.querySelector(`[data-id='on__card']`);

        if (cardToCopy) {
            const clonedCard = cardToCopy.cloneNode(true); 
            allElements.dropzones.forEach(dropzone => {
                if (dropzone.id == "to-do"){
                    dropzone.appendChild(clonedCard);
                    return;
                }
            })
            update()
        } else {
            console.warn("Nenhum card encontrado para copiar.");
        }
    },
    copy: (menu) =>{
        console.warn("Deve ser implementado!")
    },
    paste: (menu) => {
        console.warn("Deve ser implementado!")
    },
    removeCard: (menu) =>{
        const cardToRemove = document.querySelector(`[data-id='on__card']`); // Encontra o cartão com esse ID
        if (cardToRemove) {
            cardToRemove.remove(); // Remove o cartão do DOM
        }
    }
}

function removeAttributeCard(){
    if (closest_card) {
        delete closest_card.dataset.id
        closest_card = null;
    }
}