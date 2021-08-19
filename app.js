console.log(firebase)

firebase.database().ref('Todos').on('child_added', function (data) {
  var inputValue = document.getElementById("myInput").value;
  var myli = document.getElementById("MYLI");
  var li = document.createElement("li");
  var t = document.createTextNode(data.val().value);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("MYLI").appendChild(li);
  }

  // EDIT BUTTON
  var editBtn = document.createElement('button');
  var txt = document.createTextNode("Edit");

  editBtn.appendChild(txt);
  editBtn.className = "edit";
  editBtn.setAttribute('id', data.val().key)
  editBtn.setAttribute("onclick", "editButn(this)")
  li.appendChild(editBtn);
  document.getElementById("MYLI").appendChild(li);

  // // delete button
  var dltbtn = document.createElement('button');
  var btntxt = document.createTextNode("\u00D7");
  dltbtn.appendChild(btntxt);
  dltbtn.className = "close";
  dltbtn.setAttribute('id', data.val().key)
  dltbtn.setAttribute("onclick", "dltbutton(this)")
  li.appendChild(dltbtn);
  document.getElementById("MYLI").append(li);

})

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function getUserInput() {
  var inputValue = document.getElementById("myInput").value;
  var database = firebase.database().ref('Todos');
  var key = database.push().key;
  var todo = {
    value: inputValue,
    key: key
  }
  database.child(key).set(todo)
  document.getElementById("myInput").value = "";


}
delete all
function clearResult() {
  list = document.getElementById("MYLI");
  list.innerHTML = " "
}
// edit button 
function editButn(e) {
  console.log(e.id)
  var val = e.parentNode.firstChild.nodeValue;
  var editVaalue = prompt("Enter edit value", val);
  var editTodo = {
    value: editVaalue,
    key: e.id
  }
  firebase.database().ref('Todos').child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = editVaalue
  // console.log(editTodo)
}
// delete button
function dltbutton(e) {
  firebase.database().ref('Todos').child(e.id).remove()
  e.parentNode.remove();
  // console.log(e.id)
}
// // No of task
//   var a =document.getElementById("taksks");
//   var myNodelist = document.getElementsByTagName("LI");
//   var pendingList =  myNodelist.length;    
//   a.innerHTML= " You have "  + pendingList + " Pending task" ;

  // function my(){
  //   var a =document.getElementById("taksks");
  // var myNodelist = document.getElementsByTagName("LI");
  // var pendingList =  myNodelist.length;
  // var penlist = " You have "  +  pendingList + " Pending task" ;
  // alert(penlist);
  // }  

