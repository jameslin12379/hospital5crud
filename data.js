require("dotenv").config();
var faker = require('faker');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
var randomWords = require('random-words');
let mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

var connection = mysql.createConnection({
    host     : process.env.DB_HOSTNAME,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    port     : process.env.DB_PORT,
    database : process.env.DB_NAME,
    multipleStatements: true
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

// Generate 100000 users
function getusers(){
    let values = [];
    for (let i = 0; i < 10000; i++) {
        let randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
        //let randomP = faker.internet.password(); // Kassandra.Haley@erich.biz
        let randomUsername = faker.internet.userName(); // Rowan Nikolaus
        values.push([randomEmail,'$2a$10$rVFOUeAM6joFIUhPZofbeeN2THQUC5.f9ZwvYQXwQlWuj1eQWuMOu',randomUsername]);
        fs.appendFile("./data/users.txt", `Users# ${i} Email ${randomEmail} Password robot Username ${randomUsername} \n`, function(err) {
            if(err) {
                return console.log(err);
            }
            // console.log("The file was saved!");
        });
    }
    connection.query('INSERT INTO user (email,password,username) VALUES ?', [values], function(error, results, fields) {
    	if (error) throw error;
    	console.log('saved');
    	connection.end();
});	
}

// Generate 100000 posts of type text
function getpoststext(){
    let values = [];
    for (let i = 0; i < 10000; i++) {
        let randomName = faker.lorem.sentence();
        let randomDescription = faker.lorem.paragraph();
        let randomUserid = getRandomIntInclusive(1, 10000);
        let randomTopicid = getRandomIntInclusive(1, 70);       
        values.push([randomName,randomDescription,randomUserid,randomTopicid]);     
    }
    connection.query('INSERT INTO post (name,description,userid,topicid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

// Generate 100000 posts of type image
function getpostsimage(){
    let values = [];
    for (let i = 0; i < 10000; i++) {
        let imageurl = 'https://s3.amazonaws.com/imageappbucket/images/georgia-de-lotz-1371924-unsplash.jpg';
        let randomUserid = getRandomIntInclusive(1, 10000);
        let randomTopicid = getRandomIntInclusive(1, 70);
        values.push([imageurl,randomUserid,randomTopicid]);
    }
    connection.query('INSERT INTO post (imageurl,userid,topicid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

// Generate 100000 posts of type video
function getpostsvideo(){
    let values = [];
    for (let i = 0; i < 10000; i++) {
        let videourl = 'https://s3.amazonaws.com/imageappbucket/videos/180301_22_Timelapses_01.mp4';
        let randomUserid = getRandomIntInclusive(1, 10000);
        let randomTopicid = getRandomIntInclusive(1, 70);
        values.push([videourl,randomUserid,randomTopicid]);
    }
    connection.query('INSERT INTO post (videourl,userid,topicid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}


// Generate 100000 comments
function getcomments(){
    let values = [];
    for (let i = 0; i < 10000; i++) {
        let randomDescription = faker.lorem.paragraph();
        let randomUserid = getRandomIntInclusive(1, 10000);
        let randomPostid = getRandomIntInclusive(1, 10000);       
        values.push([randomDescription,randomUserid,randomPostid]);
    }
    connection.query('INSERT INTO comment (description,userid,postid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

// Generate topicfollowings (there are 700000 rows/generate 100 distinct followers for each topic thus 7000 rows)
function gettopicfollowings(){
    let values = [];
    /*for (let i = 1; i < 100001; i++) {
 	for (let j = 1; j < 71; j++) {
        	values.push([i,j]);
	}
    }*/
        for (let i = 1; i < 101; i++){
        	for(let j = 1; j < 71; j++){
        		values.push([i,j]);
	}    
        }
    connection.query('INSERT INTO topicfollowing (following, followed) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

function getuserfollowings(){
    let values = [];
    /*for (let i = 1; i < 100001; i++) {
        for (let j = 1; j < 71; j++) {
                values.push([i,j]);
        }
    }*/
        for (let i = 1; i < 101; i++){
                for(let j = 101; j < 201; j++){
                        values.push([i,j]);
        }
        }
    connection.query('INSERT INTO userfollowing (following, followed) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

function getuserfollowings2(){
    let values = [];
    /*for (let i = 1; i < 100001; i++) {
        for (let j = 1; j < 71; j++) {
                values.push([i,j]);
        }
    }*/
        for (let i = 101; i < 201; i++){
                for(let j = 1; j < 101; j++){
                        values.push([i,j]);
        }
        }
    connection.query('INSERT INTO userfollowing (following, followed) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

// Generate likes (100000 posts * 100000 users = 10000000000 likes/generate 100 distinct likers for 100 posts thus 10000 rows)
function getlikes(){
    let values = [];
        for (let i = 1; i < 101; i++){
                for(let j = 1; j < 101; j++){
                        values.push([i,j]);
        }
        }
    connection.query('INSERT INTO likes (likes, liked) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

//getupvotes();

function getmorepostsforuser(num){
	let values = [];
    	for (let i = 0; i < 300; i++) {
        	let randomName = faker.lorem.sentence();
        	let randomDescription = faker.lorem.paragraph();
        	let imageurl = 'https://s3.amazonaws.com/postappbucket/images/michael-baccin-1284971-unsplash.jpg';
        	let randomUserid = num;
        	let randomTopicid = 10;
        	values.push([randomName,randomDescription,imageurl,randomUserid,randomTopicid]);
    }
    connection.query('INSERT INTO post (name,description,imageurl,userid,topicid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

function getmorecommentsforuser(num){
        let values = [];
        for (let i = 0; i < 300; i++) {
                let randomDescription = faker.lorem.paragraph();
                let randomUserid = num;
                let randomPostid = 10;
                values.push([randomDescription,randomUserid,randomPostid]);
    }
    connection.query('INSERT INTO comment (description,userid,postid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

function getmorecommentsforpost(num){
        let values = [];
        for (let i = 0; i < 300; i++) {
                let randomDescription = faker.lorem.paragraph();
                let randomUserid = 10;
                let randomPostid = num;
                values.push([randomDescription,randomUserid,randomPostid]);
    }
    connection.query('INSERT INTO comment (description,userid,postid) VALUES ?', [values], function(error, results, fields) {
        if (error) throw error;
        console.log('saved');
        connection.end();
});
}

//getmorepostsforuser(81880)
//getmorecommentsforuser(14793);
//getmorecommentsforpost(100096)

//getusers();
//getpoststext();
//getpostsimage();
//getpostsvideo();
//getcomments();
//gettopicfollowings();
//getlikes();
//getuserfollowings();
getuserfollowings2();
