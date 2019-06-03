const buttons = document.getElementsByClassName('delete-button');
const modalbox = document.getElementById('modalbox');
const modalboxclose = document.getElementById('modalbox-close');
const deletebutton = document.getElementById('deletebutton');

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener(
        'click', function(e){
            e.preventDefault();
            modalbox.classList.add('shown');
            // console.log(e.target.parentElement);
            // console.log($(e.target).parent());
            modalbox.setAttribute('data-current', e.target.parentElement.getAttribute('id'));
        }
    );
}

modalboxclose.addEventListener('click', function(e){
    modalbox.classList.remove('shown');
    modalbox.setAttribute('data-current', '');
});

deletebutton.addEventListener('click', function(e){
    const target = modalbox.getAttribute('data-current');
    document.getElementById(target).submit();
    modalbox.setAttribute('data-current', '');
});
// buttons.addEventListener(
//     'click', function(e){
//         e.preventDefault();
//         console.log('clicked');
//     }
// );