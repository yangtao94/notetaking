const lebron = [];
let current = 0;
let active = 0;
class Note {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setId(id) {
        this.id = id;
    }

}

let note_list = document.getElementById('noteList');
let bt = document.getElementById('saveBtn');
let d_bt = document.getElementById('delBtn');
let s_bt = document.getElementById('Search');


function newLi(title) {
    let li = document.createElement('p');
    li.innerHTML = title;
    li.id = current;
    li.className = "selected";
    current++;
    li.onclick = function() {
        let name = lebron.map(value => value.id);
        let pos = name.indexOf(li.id);
        active = li.id;
        console.log(active);
        //change the value of the title and textbox
        document.getElementById('title').value = lebron[pos].name;
        document.getElementById('description').value = lebron[pos].description;

        return false;



    }
    
    return li;
}








bt.addEventListener('click',function () {
    //create a Note object
    let title = document.getElementById('title').value;
    let text = document.getElementById('description').value;
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    
    
    
    let hi = newLi(title);
    
    let newNote = new Note(title,text);
    newNote.setId(hi.id);
    lebron.push(newNote);



    note_list.appendChild(hi);
    
    
    

})



d_bt.addEventListener('click',function() {
    //remove
   /* let title = document.getElementById('title').value;
    let ok = note_list.childNodes;

    let pos = lebron.map(value => value.name).indexOf(title);
*/
    if (active === -1) return;
    let c_id = active;
    let ok = note_list.childNodes;
    let pos = lebron.findIndex(value => value.id === c_id);
    note_list.removeChild(ok[pos]);
    lebron.splice(pos,1);
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    active = -1;
    return;
    

})

s_bt.addEventListener('click',function() {
        let query = document.getElementById('searchInput').value;
        searchButton(query,lebron);
        return;


})





class NoteComponent{
    constructor() {}

    filterList(noteList, query) {
            //search filter function. Return the list 
            console.log(noteList);
            let insensitive = query.toLowerCase();
            let newNoteList = noteList.filter(value => value.name.toLowerCase().includes(insensitive));
            console.log(newNoteList);
            return newNoteList;    
    
    }

}


function searchButton(query,noteList) {
    let f = new NoteComponent();
    let newNoteList = f.filterList(noteList,query);
    let name = newNoteList.map(value => value.name);
    let entries = note_list.getElementsByTagName("p");
    
    for (i = 0; i < entries.length;i++) {
        let potentialResult = entries[i];
        console.log(potentialResult.innerHTML);
        let pos = name.indexOf(potentialResult.innerHTML);

        if (pos > -1) potentialResult.style.display = "";
        else potentialResult.style.display = "none";



    }
    return false;


}
