const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
let postid = url.substring(url.lastIndexOf('/') + 1);
let count = document.getElementsByClassName('item').length;
let total = Number(document.getElementById('commentscount').innerText);
let skip = count;
let limit = 10;
let loading = false;
let userid = document.getElementById("user").getAttribute("data-user");
const API_URL = window.location.hostname.includes("dev") ? `https://www.mediumclone.com.dev/api/posts/${postid}` : `https://www.mediumclone.com/api/posts/${postid}`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result.results.forEach(comment => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.classList.add("item");
                    card.classList.add("mb-30");
                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    card.appendChild(cardBody);
                    const cardMore = document.createElement("div");
                    cardMore.classList.add("flex");
                    const cardMoreLeft = document.createElement("div");
                    const cardMoreRight = document.createElement("div");
                    cardMore.appendChild(cardMoreLeft);
                    cardMore.appendChild(cardMoreRight);
                    cardMoreLeft.classList.add("mr-15");
                    const link1 = document.createElement("a");
                    link1.setAttribute("href", `/users/${comment.userid}`);
                    const avatar = document.createElement("img");
                    avatar.setAttribute("src", comment.imageurl);
                    avatar.classList.add("width-60");
                    avatar.classList.add("height-60");
                    avatar.classList.add("border-radius");
                    link1.appendChild(avatar);
                    cardMoreLeft.appendChild(link1);
                    cardMoreRightTop = document.createElement("div");
                    cardMoreRightMedium = document.createElement("div");
                    cardMoreRightBottom = document.createElement("div");
                    cardMoreRight.appendChild(cardMoreRightTop);
                    cardMoreRight.appendChild(cardMoreRightMedium);
                    cardMoreRight.appendChild(cardMoreRightBottom);
                    cardMoreRightTop.classList.add("mb-5");
                    cardMoreRightMedium.classList.add("mb-5");
                    cardMoreRightBottom.classList.add("mb-5");
                    const link2 = document.createElement("a");
                    link2.setAttribute("href", `/users/${comment.userid}`);
                    link2.classList.add("bold");
                    link2.innerText = comment.username;
                    cardMoreRightTop.appendChild(link2);
                    cardMoreRightMedium.innerText = comment.description;
                    cardMoreRightBottom.innerText = moment(comment.datecreated).format('LLL');
                    if (Number(userid) === comment.userid) {
                        const deletebutton = document.createElement("button");
                        deletebutton.classList.add("btn");
                        deletebutton.classList.add("btn-primary");
                        deletebutton.classList.add("pd-10-20");
                        deletebutton.classList.add("deletecomment");
                        deletebutton.setAttribute("data-url", `/comments/${comment.id}`);
                        deletebutton.innerText = "Delete";
                        deletebutton.addEventListener('click', function(e){
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
                        cardMoreRight.appendChild(deletebutton);
                    }
                    cardBody.appendChild(cardMore);
                    container.appendChild(card);
                });
                count = document.getElementsByClassName('item').length;
                skip = count;
                loading = false;
            });
        }
    }
});

// <button type="submit" class="btn btn-primary pd-10-20 deletecomment" data-url="/comments/<%= results[1][i].id %>">Delete</button>

