import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js"
import { getDatabase, ref, onValue, push} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-champions-fd673-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const publishBtnEl = document.getElementById("publishBtn")
const inputFieldFromEl = document.getElementById("inputFromEl")
const inputFieldToEl = document.getElementById("inputToEl")
const textareaFieldEl = document.getElementById("textarea-field")
const listEl = document.getElementById("ulEl")




publishBtnEl.addEventListener( "click", function(){
    let data = {
        textEl : textareaFieldEl.value,
        fromEl : inputFieldFromEl.value,
        toEl : inputFieldToEl.value
    }
    
push(endorsementListInDB,data)
// appendTextareaValue() 
 
})


onValue(endorsementListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let commentArray = Object.entries(snapshot.val())
    clearListEl()

    for (let index = 0; index < commentArray.length; index++) {
      let currentItem = commentArray[index]
      let currentItemID = currentItem[0]
      let currentItemValues = currentItem[1]

      appendTextareaValue(currentItem) 
    }
  } else {
    listEl.innerHTML = "nothing is found...";
  }
})

function clearListEl() {
 listEl.innerHTML = ""
}

    function appendTextareaValue() {
    let textareaValue = textareaFieldEl.value
    let fromValue = inputFieldFromEl.value
    let toValue = inputFieldToEl.value

    let newEl = document.createElement("li")
    newEl.innerHTML = `
        <h3>To ${toValue}</h3>
        <p>${textareaValue}</p>
        <h3>From ${fromValue }</h3>`
    ulEl.append(newEl)
    clearValue()
}

function clearValue(){
    textareaFieldEl.value = ""
    inputFieldToEl.value =""
    inputFieldFromEl.value =""

}