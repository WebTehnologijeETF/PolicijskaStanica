(function() {

    'use strict';

    var button = document.forms["contactForm"]["submit"];
    button.disabled = true;

    addNewEvent(
        document.forms["contactForm"]["ime"],
        'blur',
        validateContactName
    );

    addNewEvent(
        document.forms["contactForm"]["email"],
        'blur',
        validateContactEmail
    );

    addNewEvent(
        document.forms["contactForm"]["poruka"],
        'blur',
        validateContactMsg
    );

})();


function validateContactName() {

    if (!this.value) {
        addError(this, 'Morate unijeti ime', true);
        return;
    }

    addError(this, '');
};

function validateContactEmail() {

    var patern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!this.value.match(patern)) {
        addError(this, 'Morate unijeti email, ispravnog formata, primjer: primjer@primjer.primjer', true);
        return;
    }

    addError(this, '');

};

function validateContactMsg() {

    if (!this.value) {
        addError(this, 'Morate unijeti tekst poruke', true);
        return;
    }

    addError(this, '');
};


function addError(node, msg, isError) {
    var parentContainer = node.parentElement,
        errorLabel = parentContainer.getElementsByClassName('errorLabel')[0];

    if (!errorLabel) {
        errorLabel = document.createElement("span");
        errorLabel.className = ' errorLabel';

        parentContainer.appendChild(errorLabel);
    }

    errorLabel.textContent = msg;

    node.className = node.className.replace(' error', '');
    node.className = node.className.replace(' passed', '');

    isError && (node.className += ' error');
    !isError && (node.className += ' passed');

    toggleButton();
};

function toggleButton() {
    var form = document.forms["contactForm"],
        requirdFields = form.getElementsByClassName('required'),
        passedFields = form.getElementsByClassName('passed'),
        button = document.forms["contactForm"]["submit"];

    if( requirdFields.length !== passedFields.length ) {
        button.disabled = true;
        return;
    }    

    button.disabled = false;
};


function addNewEvent(element, evnt, funct) {
    
    if (element.attachEvent) {
        return element.attachEvent('on' + evnt, funct);
    } else {
        return element.addEventListener(evnt, funct, false);
    }
}
function showMenu(test, id) {

    var x = document.getElementById(id);
    if (test == 1) {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}
