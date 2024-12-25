const taskElement = document.getElementById('tasksCarousel');
const carouselIndicators = document.getElementById('carouselIndicators');
const userId = localStorage.getItem('userId');

async function createTask() {
    const title = document.getElementById('taskNameInput').value;
    const description = document.getElementById('taskDescriptionInput').value;
    if (!title || !description) {
        alert('Por favor complete los campos');
        return;
    }
    try {
        const response = await fetch('http://127.0.0.1:3000/createTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                userId
            })
        });
        const responseText = await response.text();
        console.log(responseText);
        if (response.ok) {
            alert('Tarea creada exitosamente');
            document.getElementById('createTaskForm').reset();
            taskElement.innerHTML = '';
            carouselIndicators.innerHTML = '';
            getTasks();
        } else {
            alert('Error al crear la tarea: ' + responseText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear la tarea');
    }
}

document.getElementById('createTaskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    createTask();
});

async function getTasks() {
    const response = await fetch('http://127.0.0.1:3000/listTasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId
        })
    });
    const tasks = await response.json();
    for (let task = 0; task < tasks.length; task++) {
        const newIndicator = `
            <li data-target="#tasksCarousel" data-slide-to="${task}" class="${task === 0 ? 'active' : ''}"></li>
        `;
        carouselIndicators.innerHTML += newIndicator;
        const newTaskDiv = `
            <div class="carousel-item${task === 0 ? ' active' : ''}">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h1 id="taskId${task}" style="display: none;">${tasks[task]._id}</h1>
                        <h3>Tarea ${tasks[task].status ? 'completa' : 'incompleta'}</h3>
                        <input id="taskState${task}" type="checkbox" style="display: none;" ${tasks[task].status ? 'checked' : ''}>
                        <input id="taskName${task}" type="text" class="card-title" value="${tasks[task].title}">
                        <textarea id="taskDescription${task}" class="card-text auto-resize" style="width= 90%;">${tasks[task].description}</textarea>
                        <br/>
                        <button type="button" class="btn btn-primary" style="margin-top: 1vh;" onclick="editTask(${task}, true)">${tasks[task].status ? 'no terminada' : 'terminar'}</button>
                        <br/>
                        <button type="button" class="btn btn-success" style="margin-top: 1vh;" onclick="editTask(${task}, false)">editar</button>
                        <button type="button" class="btn btn-danger" style="margin-top: 1vh;" onclick="deleteTask(${task})">eliminar</button>
                    </div>
                </div>
            </div>
        `;
        taskElement.innerHTML += newTaskDiv;
    }
}
getTasks();

async function editTask(taskNumber, changeStatus) {
    const taskId = document.getElementById(`taskId${taskNumber}`).innerText;
    const title = document.getElementById(`taskName${taskNumber}`).value;
    const description = document.getElementById(`taskDescription${taskNumber}`).value;
    var status = document.getElementById(`taskState${taskNumber}`).checked;
    if (changeStatus) {
        status = !status;
    }
    const response = await fetch('http://127.0.0.1:3000/editTask', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            taskId,
            title,
            description,
            status
        })
    });

    const responseText = await response.text();

    if(responseText === 'tarea editada correctamente'){
        alert('Tarea editada correctamente');
        taskElement.innerHTML = '';
        carouselIndicators.innerHTML = '';
        getTasks();
    }else{
        alert('Error al editar la tarea');
    }
}

async function deleteTask(taskNumber){
    const taskId = document.getElementById(`taskId${taskNumber}`).innerText;
    const response = await fetch('http://127.0.0.1:3000/deleteTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            taskId
        })
    });
    const responseText = await response.text();
    if(responseText === 'tarea eliminada correctamente'){
        alert('Tarea eliminada correctamente');
        taskElement.innerHTML = '';
        carouselIndicators.innerHTML = '';
        getTasks();
    }else{
        alert('Error al eliminar la tarea');
    };
};