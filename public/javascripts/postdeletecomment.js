const buttons = document.getElementsByClassName("deletecomment");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e){
        const url = e.target.getAttribute("data-url");
        fetch(url, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
        }).then(response => response.json())
            .then(result => {
                e.target.parentElement.parentElement.parentElement.parentElement.remove();
                let commentscount = document.getElementsByClassName('commentscount');
                for (let i = 0; i < commentscount.length; i++){
                    commentscount[i].innerText = (Number(commentscount[i].innerText) - 1) + '';
                }
            });
    });
}