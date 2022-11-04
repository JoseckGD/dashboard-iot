const http = new XMLHttpRequest();
const url = 'http://localhost:5051/updatedevice/1';
http.open("PUT", url)
http.send();

http.onreadystatechange=(e)=>{
    console.log(http.responseText)
}
