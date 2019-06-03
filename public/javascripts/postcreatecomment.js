// when form is submitted, stop its default behavior
// extract data from form and submit using fetch post to /comments
// route will validate input and if there is an error, return
// failed = true to client and client using if conditional will toggle
// hidden error message and when user resubmits
// the same process repeats and assume this time validation passed
// so value gets saved to DB and using returned row data
// return it to client along with failed = false and
// using if conditional toggle error message so it is hidden again
// , clear textarea, and insert a comment using returned data row
// into DOM at the top of comments list and increment post comments count by 1

let commentform = document.getElementById('commentform');
let commentformurl = '/comments';
let commentformpostid = url.substring(url.lastIndexOf('/')+1);
let commentformtextarea = document.getElementById('commentformtextarea');
let commentformerrors = document.getElementsByClassName('commentformerrors');
let emptyerror = document.getElementById('emptyerror');
let lengtherror = document.getElementById('lengtherror');
let commentscount = document.getElementsByClassName('commentscount');

commentform.addEventListener('submit', (e)=> {
    e.preventDefault();
    emptyerror.classList.add('hidden');
    lengtherror.classList.add('hidden');
    let description = commentformtextarea.value;
    fetch(commentformurl, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({description: description, postid: commentformpostid})
    }).then(response => response.json()).then(result => {
            if (!result.status) {
                for (let i = 0; i < result.errors.length; i++) {
                    if (result.errors[i].msg === "Empty comment.") {
                        emptyerror.classList.remove('hidden');
                    }
                    if (result.errors[i].msg === "Comment must be between 5-300 characters.") {
                        lengtherror.classList.remove('hidden');
                    }
                }
            }
            else {
                    for (let i = 0; i < commentscount.length; i++){
                        commentscount[i].innerText = (Number(commentscount[i].innerText) + 1) + '';
                    }
                    // commentscount.innerText = (Number(commentscount.innerText) + 1) + '';
                    emptyerror.classList.add('hidden');
                    lengtherror.classList.add('hidden');
                    commentformtextarea.value = '';
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
                    link1.setAttribute("href", `/users/${result.comment[0].userid}`);
                    const avatar = document.createElement("img");
                    avatar.setAttribute("src", result.comment[0].imageurl);
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
                    link2.setAttribute("href", `/users/${result.comment[0].userid}`);
                    link2.classList.add("bold");
                    link2.innerText = result.comment[0].username;
                    cardMoreRightTop.appendChild(link2);
                    cardMoreRightMedium.innerText = result.comment[0].description;
                    cardMoreRightBottom.innerText = moment(result.comment[0].datecreated).format('LLL');
                    const deletebutton = document.createElement("button");
                    deletebutton.classList.add("btn");
                    deletebutton.classList.add("btn-primary");
                    deletebutton.classList.add("pd-10-20");
                    deletebutton.classList.add("deletecomment");
                    deletebutton.setAttribute("data-url", `/comments/${result.comment[0].id}`);
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
                    cardBody.appendChild(cardMore);
                    container.insertBefore(card, container.firstChild);
                }
            });
        });

// const div = document.createElement('div');
// div.classList.add("et_pb_module");
// div.classList.add("et_pb_blurb");
// div.classList.add("et_pb_blurb_0");
// // div.classList.add("et_animated");
// div.classList.add("et_pb_bg_layout_light");
// div.classList.add("et_pb_text_align_left");
// div.classList.add("et_pb_blurb_position_left");
// div.classList.add("container-item");
// const div2 = document.createElement('div');
// div2.classList.add("et_pb_blurb_content");
// div.appendChild(div2);
// const div3 = document.createElement('div');
// div3.classList.add("et_pb_main_blurb_image");
// div2.appendChild(div3);
// const link = document.createElement('a');
// link.setAttribute("href", `/users/${result.comment[0].userid}`);
// const span = document.createElement('span');
// span.classList.add("et_pb_image_wrap");
// const img = document.createElement('img');
// img.setAttribute("src", result.comment[0].imageurl);
// // img.classList.add("et-waypoint");
// img.classList.add("et_pb_animation_top");
// img.classList.add("item-image");
// div3.appendChild(link);
// link.appendChild(span);
// span.appendChild(img);
// const div4 = document.createElement('div');
// div4.classList.add("et_pb_blurb_container");
// div2.appendChild(div4);
// const h4 = document.createElement('h4');
// h4.classList.add("et_pb_module_header");
// div4.appendChild(h4);
// const link2 = document.createElement('a');
// link2.classList.add("brown");
// link2.setAttribute("href", `/users/${result.comment[0].userid}`);
// link2.innerText = result.comment[0].username;
// h4.appendChild(link2);
// const div5 = document.createElement('div');
// div5.classList.add("et_pb_blurb_description");
// div4.appendChild(div5);
// const link3 = document.createElement('a');
// link3.classList.add("brown");
// link3.setAttribute("href", `/comments/${result.comment[0].id}`);
// link3.innerText = result.comment[0].description;
// div5.appendChild(link3);
// const p = document.createElement('p');
// const strong = document.createElement('strong');
// strong.innerText = moment(result.comment[0].datecreated).format('LLL');
// p.appendChild(strong);
// div5.appendChild(p);
// const div = document.createElement('div');
// div.classList.add("et_pb_module");
// div.classList.add("et_pb_blurb");
// div.classList.add("et_pb_blurb_0");
// // div.classList.add("et_animated");
// div.classList.add("et_pb_bg_layout_light");
// div.classList.add("et_pb_text_align_left");
// div.classList.add("et_pb_blurb_position_left");
// div.classList.add("container-item");
// const div2 = document.createElement('div');
// div2.classList.add("et_pb_blurb_content");
// div.appendChild(div2);
// const div3 = document.createElement('div');
// div3.classList.add("et_pb_main_blurb_image");
// div3.classList.add("pl-15");
// div2.appendChild(div3);
// const link = document.createElement('a');
// link.setAttribute("href", `/users/${result.comment[0].userid}`);
// const span = document.createElement('span');
// span.classList.add("et_pb_image_wrap");
// const img = document.createElement('img');
// img.setAttribute("src", result.comment[0].imageurl);
// // img.classList.add("et-waypoint");
// img.classList.add("et_pb_animation_top");
// img.classList.add("item-image");
// div3.appendChild(link);
// link.appendChild(span);
// span.appendChild(img);
// const div4 = document.createElement('div');
// div4.classList.add("et_pb_blurb_container");
// div2.appendChild(div4);
// // const h4 = document.createElement('h4');
// // h4.classList.add("et_pb_module_header");
// // div4.appendChild(h4);
// const link2 = document.createElement('a');
// link2.classList.add("hd");
// link2.setAttribute("href", `/users/${result.comment[0].userid}`);
// link2.innerText = result.comment[0].username;
// div4.appendChild(link2);
// const div5 = document.createElement('div');
// div5.classList.add("et_pb_blurb_description");
// div4.appendChild(div5);
// const link3 = document.createElement('a');
// link3.classList.add("brown");
// link3.setAttribute("href", `/comments/${result.comment[0].id}`);
// link3.innerText = result.comment[0].description;
// div5.appendChild(link3);
// const p = document.createElement('p');
// // const strong = document.createElement('strong');
// p.innerText = moment(result.comment[0].datecreated).format('LLL');
// // p.appendChild(strong);
// div5.appendChild(p);
// container.insertBefore(div, container.firstChild);
// //
// // const div = document.createElement('div');
// // div.classList.add("et_pb_module");
// // div.classList.add("et_pb_blurb");
// // div.classList.add("et_pb_blurb_0");
// // // div.classList.add("et_animated");
// // div.classList.add("et_pb_bg_layout_light");
// // div.classList.add("et_pb_text_align_left");
// // div.classList.add("et_pb_blurb_position_left");
// // div.classList.add("container-item");
// // const div2 = document.createElement('div');
// // div2.classList.add("et_pb_blurb_content");
// // div.appendChild(div2);
// // const div3 = document.createElement('div');
// // div3.classList.add("et_pb_blurb_container");
// // div2.appendChild(div3);
// // const h4 = document.createElement('h4');
// // h4.classList.add("et_pb_module_header");
// // div3.appendChild(h4);
// // const link = document.createElement('a');
// // link.setAttribute("href", `/comments/${result.comment[0].id}`);
// // link.innerText = result.comment[0].description;
// // h4.appendChild(link);
// // const div4 = document.createElement('div');
// // div4.classList.add("et_pb_blurb_description");
// // div3.appendChild(div4);
// // const link2 = document.createElement('a');
// // link2.classList.add("brown");
// // link2.setAttribute("href", `/users/${result.comment[0].userid}`);
// // link2.innerText = result.comment[0].username;
// // div4.appendChild(link2);
// // const p = document.createElement('p');
// // const strong = document.createElement('strong');
// // strong.innerText = moment(result.comment[0].datecreated).format('LLL');
// // p.appendChild(strong);
// // div4.appendChild(p);
