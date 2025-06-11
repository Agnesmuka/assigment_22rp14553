let editingId = null;

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const regno = document.getElementById("regno").value.trim();
  const name = document.getElementById("name").value.trim();
  const level = document.getElementById("level").value.trim();
  const marks = document.getElementById("marks").value.trim();
 

  if (!regno ||!name || !marks || !level) {
    return alert("Please fill all fields");
  }

  let students = getStudents();

  if (editingId) {
    students = students.map((student) =>
      student.id === editingId
        ? { id: editingId,regno, name,marks, level }
        : student
    );
    editingId = null;
    document.querySelector("button[type='submit']").textContent = "Add Student";
  } else {
    const newStudent = {
      id: Date.now(),
      regno,
      name,
      level,
      marks,
    
    };
    students.push(newStudent);
  }

  saveStudents(students);
  e.target.reset();
  displayStudents();
});

function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(data) {
  localStorage.setItem("students", JSON.stringify(data));
}

function deleteStudent(id) {
  const students = getStudents().filter((s) => s.id !== id);
  saveStudents(students);
  displayStudents();
}

function editStudent(id) {
  const student = getStudents().find((s) => s.id === id);
  document.getElementById("regno").value = student.regno;
  document.getElementById("name").value = student.name;
  document.getElementById("level").value = student.level;
  document.getElementById("marks").value = student.marks;
 
  editingId = id;
  document.querySelector("button[type='submit']").textContent = "Update Student";
}

function displayStudents() {
  const students = getStudents();
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.regno}</td>
      <td>${student.name}</td>
      <td>${student.level}</td>
      <td>${student.marks}</td>
     
      <td>
        <button onclick="editStudent(${student.id})">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

displayStudents();
