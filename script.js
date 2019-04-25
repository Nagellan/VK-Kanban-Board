function addCard(btn) {
    var cardsWrapper = btn.parentElement.getElementsByClassName('cards-wrapper')[0],
        emptyCard = getElementFromTemplate(document.getElementById('empty-card'));
    
    emptyCard.id = "card-" + document.getElementsByClassName('card').length;
    cardsWrapper.appendChild(emptyCard)

    replaceBlock(btn, getElementFromTemplate(document.getElementById("save-cancel-panel")));
    emptyCard.firstElementChild.focus();
}

function saveCard(btn) {
    var card = getGrandParent(btn).getElementsByClassName('card new')[0],
        cardInput = card.firstElementChild,
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (cardInput.value.replace(/\s/g, '') != "") {
        cardInput.readOnly = true;
        card.classList.remove('new');
        card.setAttribute('draggable', true);
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
    else {        
        cardInput.value = "";
        cardInput.focus();
    }
}

function cancelCard(btn, e=null) {
    if (e.key == 'Escape')
        btn = getGrandParent(btn).parentElement.getElementsByClassName('cancel-btn')[0];

    if (e == null || e.key == 'Escape') {
        var newCard = getGrandParent(btn).getElementsByClassName('new')[0],
            addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

        newCard.remove();
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
}

function addColumn(btn) {
    if (document.getElementsByClassName('column new').length == 0) {
        var emptyColumn = getElementFromTemplate(document.getElementById('empty-column'));

        document.getElementsByTagName('main')[0].insertBefore(emptyColumn, btn);
        emptyColumn.getElementsByClassName('col-title')[0].focus();
    }
}

function saveColumn(btn) {
    var column = document.getElementsByClassName('column new')[0],
        colTitle = column.getElementsByClassName('col-title')[0],
        addCardBtn = getElementFromTemplate(document.getElementById("add-card"));

    if (colTitle.value.replace(/\s/g, '') != "") {
        colTitle.readOnly = true;
        column.classList.remove('new');
        replaceBlock(btn.parentElement, addCardBtn);
        addCardBtn.focus();
    }
    else {
        colTitle.value = "";
        colTitle.focus();
    }
}

function cancelColumn(btn, e) {
    if (e.key == 'Escape')
        btn = btn.parentElement.getElementsByClassName('cancel-btn')[0];

    if (e == null || e.key == 'Escape') {
        var newColumn = document.getElementsByClassName('column new')[0];
        newColumn.remove();
        document.getElementsByClassName('add-column')[0].focus();
    }
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

function drag(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('card-id', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e, block) {
    e.preventDefault();
    var cardId = e.dataTransfer.getData('card-id');
    block.getElementsByClassName('cards-wrapper')[0].appendChild(document.getElementById(cardId))
}