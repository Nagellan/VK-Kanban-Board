function addCard(btn) {
    var cardsWrapper = btn.parentElement.getElementsByClassName('cards-wrapper')[0],
        emptyCard = getElementFromTemplate(document.getElementById('empty-card'));
    
    cardsWrapper.appendChild(emptyCard)

    replaceBlock(btn, getElementFromTemplate(document.getElementById("save-cancel-card")));
    emptyCard.firstElementChild.focus();
}

function saveCard(btn) {
    var card = getGrandParent(btn).getElementsByClassName('new')[0],
        cardInput = card.firstElementChild,
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (cardInput.value.replace(/\s/g, '') != "") {
        cardInput.readOnly = true;
        card.classList.remove('new');
        replaceBlock(btn.parentElement, addCardBtn);
    }
    else {
        cardInput.value = "";
        cardInput.focus();
    }
}

function cancelCard(btn) {
    var newCard = getGrandParent(btn).getElementsByClassName('new')[0],
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));
        
    newCard.remove();
    replaceBlock(btn.parentElement, addCardBtn);
}

function replaceBlock(block1, block2) {
    block1.parentNode.replaceChild(block2, block1);
}

function getGrandParent(el) {
    return el.parentElement.parentElement;
}

/**
 * Transform given template block into the element.
 * @param {HTMLElement} template - Template block.
 * @returns {HTMLElement} Block inside the template.
 */
function getElementFromTemplate(template) {
    return template.content.children.item(0).cloneNode(true);
}