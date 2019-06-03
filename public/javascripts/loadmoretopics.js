
const loadMore = document.querySelector('#loadMore');
const container = document.querySelector('#container');
let url = window.location.pathname;
let count = document.getElementsByClassName('item').length;
let total = 70;
let skip = count;
let loading = false;
const API_URL = window.location.hostname.includes("dev") ? `https://www.mediumclone.com.dev/api/topics` : `https://www.mediumclone.com/api/topics`;

document.addEventListener('scroll', () => {
    const rect = loadMore.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading) {
        loading = true;
        if (count < total) {
            fetch(API_URL + `?skip=${skip}`).then(response => response.json()).then(result => {
                result.results.forEach(topic => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.classList.add("item");
                    card.classList.add("mb-30");
                    const cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");
                    card.appendChild(cardBody);
                    const link1 = document.createElement("a");
                    link1.setAttribute("href", `/topics/${topic.id}`);
                    link1.classList.add("mr-15");
                    const avatar = document.createElement("img");
                    avatar.setAttribute("src", topic.imageurl);
                    avatar.classList.add("width-60");
                    avatar.classList.add("height-60");
                    avatar.classList.add("border-radius");
                    link1.appendChild(avatar);
                    cardBody.appendChild(link1);
                    const link2 = document.createElement("a");
                    link2.setAttribute("href", `/topics/${topic.id}`);
                    link2.classList.add("bold");
                    link2.innerText = topic.name;
                    cardBody.appendChild(link2);
                    container.appendChild(card);
                });
                count = document.getElementsByClassName('item').length;
                skip = count;
                loading = false;
            });
        }
    }
});

