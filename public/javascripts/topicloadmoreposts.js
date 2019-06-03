let loadMore = document.querySelector('#loadMore');
let container = document.querySelector('#container');
let url = window.location.pathname;
let topicid = url.substring(url.lastIndexOf('/') + 1);
let count = document.getElementsByClassName('item').length;
let total = Number(document.getElementById('postscount').innerText);
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.mediumclone.com.dev/api/topics/${topicid}` : `https://www.mediumclone.com/api/topics/${topicid}`;


document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result.results.forEach(post => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.classList.add("item");
                    card.classList.add("mb-30");
                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    card.appendChild(cardBody);
                    const cardTitle = document.createElement("h5");
                    cardTitle.classList.add("card-title");
                    cardTitle.classList.add("mb-15");
                    const link1 = document.createElement("a");
                    link1.setAttribute("href", `/posts/${post.id}`);
                    link1.classList.add("bold");
                    link1.innerText = post.name;
                    cardTitle.appendChild(link1);
                    cardBody.appendChild(cardTitle);
                    const cardText = document.createElement("p");
                    cardText.classList.add("card-text");
                    cardText.classList.add("mb-15");
                    cardText.innerText = post.description;
                    cardBody.appendChild(cardText);
                    const cardMore = document.createElement("div");
                    cardMore.classList.add("flex");
                    const cardMoreLeft = document.createElement("div");
                    cardMoreLeft.classList.add("mr-15");
                    const link2 = document.createElement("a");
                    link2.setAttribute("href", `/users/${post.userid}`);
                    const avatar = document.createElement("img");
                    avatar.setAttribute("src", post.userimageurl);
                    avatar.classList.add("width-60");
                    avatar.classList.add("height-60");
                    avatar.classList.add("border-radius");
                    link2.appendChild(avatar);
                    cardMoreLeft.appendChild(link2);
                    cardMore.appendChild(cardMoreLeft);
                    const cardMoreRight = document.createElement("div");
                    const cardMoreRightTop = document.createElement("div");
                    const link3 = document.createElement("a");
                    link3.setAttribute("href", `/users/${post.userid}`);
                    link3.classList.add("bold");
                    link3.classList.add("marginr-5");
                    link3.innerText = post.username;
                    const link4 = document.createElement("a");
                    link4.setAttribute("href", `/topics/${post.topicid}`);
                    link4.classList.add("bold");
                    link4.innerText = post.topicname;
                    cardMoreRightTop.appendChild(link3);
                    cardMoreRightTop.appendChild(link4);
                    cardMoreRight.appendChild(cardMoreRightTop);
                    const date = document.createElement('div');
                    date.innerText = moment(post.datecreated).format('LLL');
                    cardMoreRight.appendChild(date);
                    cardMore.appendChild(cardMoreRight);
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
