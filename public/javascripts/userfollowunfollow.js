//// if value of button is follow, when clicked an ajax POST request will be sent
// to insert a new row between current user and topic and if successful
// a response will be sent back and text of button should be changed to unfollow
//// if value of button is unfollow, when clicked an ajax DELETE request will be sent
// to remove a row with current user and topic and if successful a response
// will be sent back and text of button should be changed to follow
const URL = '/userfollowings';
const followerscount = document.getElementById('followerscount');
const button = document.getElementById('followunfollow');
button.addEventListener('click', function(event){
    if (button.innerText === 'FOLLOW') {
        followUser();
    } else {
        unfollowUser();
    }
});

function followUser(){
    const userid = window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);
    fetch(URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userid: userid})
    }).then(response => response.json())
        .then(result => {
            button.innerText = 'UNFOLLOW';
            followerscount.innerText = (Number(followerscount.innerText) + 1) + '';
        });
}

function unfollowUser(){
    const userid = window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);
    fetch(URL, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userid: userid})
    }).then(response => response.json())
        .then(result => {
            button.innerText = 'FOLLOW';
            followerscount.innerText = (Number(followerscount.innerText) - 1) + '';
        });
}

