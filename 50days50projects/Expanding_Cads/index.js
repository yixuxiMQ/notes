// const list = document.getElementsByClassName('panel');
const panels = document.querySelectorAll('.panel');

// const panels = [].slice.call(list);

panels.forEach((element) => {
    element.addEventListener('click', () => {
        removeClassName(element);
        element.className += ' active';
    });
});

function removeClassName(element){
    panels.forEach(element => {
        element.className = 'panel';
    });
}
