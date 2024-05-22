document.addEventListener('DOMContentLoaded', (event) => {
  loadNotes();
});

function addNote() {
  const noteTitle = document.getElementById('note-title').value;
  const noteText = document.getElementById('note-text').value;
  const noteColor = document.getElementById('colorPicker').value;
  const noteMakerContainer =
    document.getElementById('noteMakerContainer').value;
  if (noteText.trim() !== '') {
    const noteList = document.getElementById('note-list');
    const li = document.createElement('li');
    li.draggable = true;
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    li.innerHTML = `
      <div class="note-header">
          <div class="note-options">
              <svg id="edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <svg id="trash" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
          </div>
          <strong class="note-title">${noteTitle}</strong>
      </div> <br/> 
      <span class="date">${dateString}</span><br/>
      <p class="note-text">${noteText}</p>
    `;
    const deleteButton = li.querySelector('#trash');
    deleteButton.addEventListener('click', function () {
      li.remove();
      saveNotes();
    });

    const editButton = li.querySelector('#edit');
    editButton.addEventListener('click', function () {
      editNote(li);
      saveNotes();
    });

    li.style.backgroundColor = noteColor;
    const brightness = getBrightness(noteColor);
    li.style.color = brightness > 130 ? '#000' : '#fff';
    li.style.borderColor = li.style.color;
    noteList.appendChild(li);
    document.getElementById('note-title').value = '';
    document.getElementById('note-text').value = '';
    closeButton();
    saveNotes();
  } else {
    alert('Please enter a note.');
  }
}

function saveNotes() {
  const noteList = document.getElementById('note-list').innerHTML;
  localStorage.setItem('notes', noteList);
}

function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    document.getElementById('note-list').innerHTML = savedNotes;
    const noteList = document
      .getElementById('note-list')
      .querySelectorAll('li');
    noteList.forEach((note) => {
      const deleteButton = note.querySelector('#trash');
      deleteButton.addEventListener('click', function () {
        note.remove();
        saveNotes();
      });

      const editButton = note.querySelector('#edit');
      editButton.addEventListener('click', function () {
        editNote(note);
        saveNotes();
      });
    });
  }
}

// Function to calculate brightness based on color
function getBrightness(color) {
  const hexColor = color.substring(1); // Remove #
  const r = parseInt(hexColor.substring(0, 2), 16); // Red value
  const g = parseInt(hexColor.substring(2, 4), 16); // Green value
  const b = parseInt(hexColor.substring(4, 6), 16); // Blue value
  return (r * 299 + g * 587 + b * 114) / 1000; // Formula for calculating brightness
}

function noteMaker() {
  noteMakerContainer.style.display = 'flex';
}

function closeButton() {
  noteMakerContainer.style.display = 'none';
}

function editNote(note) {
  const noteTitle = note.querySelector('.note-title').textContent;
  const noteText = note.querySelector('.note-text').textContent;

  const newTitle = prompt('Edit Title:', noteTitle);
  const newText = prompt('Edit Text:', noteText);

  if (newText !== null) {
    note.querySelector('.note-title').textContent = newTitle || '';
    note.querySelector('.note-text').textContent = newText;
  }
}
