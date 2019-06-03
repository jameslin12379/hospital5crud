//// if value of button is follow, when clicked an ajax POST request will be sent
// to insert a new row between current user and topic and if successful
// a response will be sent back and text of button should be changed to unfollow
//// if value of button is unfollow, when clicked an ajax DELETE request will be sent
// to remove a row with current user and topic and if successful a response
// will be sent back and text of button should be changed to follow

const URL = window.location.origin + '/likes';
const likescount = document.getElementById('likescount');
const button = document.getElementById('likeunlike');
button.addEventListener('click', function(event){
    if (button.classList.contains("op-05")) {
        likePost();
    } else {
        unlikePost();
    }
});

function likePost(){
    const postid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    fetch(URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postid: postid})
    }).then(response => response.json())
        .then(result => {
            button.classList.remove("op-05");
            likescount.innerText = (Number(likescount.innerText) + 1) + '';
        });
}

function unlikePost(){
    const postid = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    fetch(URL, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postid: postid})
    }).then(response => response.json())
        .then(result => {
            button.classList.add("op-05");
            likescount.innerText = (Number(likescount.innerText) - 1) + '';

        });
}

