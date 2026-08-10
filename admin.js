const SUPABASE_URL =
'https://hdjdzyegdfvddpjtxwim.supabase.co';

const SUPABASE_ANON_KEY =
'sb_publishable_uZxNS9gMcM95eZtKiPTH7Q_YW70SZLe';

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);


const ADMIN_EMAIL =
'naushad201010000@gmail.com';


async function login(){

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value;

const message =
document.getElementById("login-message");


if(!email || !password){

message.style.color="red";

message.innerText=
"Email aur password daliye.";

return;

}


message.style.color="#234f70";

message.innerText="Login ho raha hai...";


if(email.toLowerCase() !== ADMIN_EMAIL){

message.style.color="red";

message.innerText=
"Ye admin email nahi hai.";

return;

}


const {data,error} =
await supabaseClient.auth.signInWithPassword({

email:email,

password:password

});


if(error){

message.style.color="red";

message.innerText=
"Login failed: " + error.message;

return;

}


message.style.color="green";

message.innerText=
"Login successful!";


showAdminPanel();

}


function showAdminPanel(){

document.getElementById(
"login-box"
).style.display="none";

document.getElementById(
"admin-panel"
).style.display="block";

}


async function publishPost(){

const category =
document.getElementById("category").value;

const title =
document.getElementById("title").value.trim();

const content =
document.getElementById("content").value.trim();

const image =
document.getElementById("image").value.trim();

const message =
document.getElementById("post-message");


if(!title || !content){

message.style.color="red";

message.innerText=
"Title aur content zaroor bharein.";

return;

}


message.style.color="#234f70";

message.innerText=
"Publishing...";


const {data:{user}} =
await supabaseClient.auth.getUser();


if(!user){

message.style.color="red";

message.innerText=
"Session expire ho gaya. Dobara login karein.";

return;

}


const {error} =
await supabaseClient
.from("articles")
.insert({

title:title,

content:content,

category:category,

image_url:image || null

});


if(error){

message.style.color="red";

message.innerText=
"Error: " + error.message;

return;

}


message.style.color="green";

message.innerText=
"Post successfully publish ho gayi!";


document.getElementById("title").value="";

document.getElementById("content").value="";

document.getElementById("image").value="";

}


async function logout(){

await supabaseClient.auth.signOut();

location.reload();

}


async function checkSession(){

const {data} =
await supabaseClient.auth.getSession();

if(data.session &&
data.session.user.email.toLowerCase()
=== ADMIN_EMAIL){

showAdminPanel();

}

}


checkSession();
