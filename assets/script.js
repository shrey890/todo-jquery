function getISTDate() {
    let date = new Date()
    let offsetIST = date.getTimezoneOffset() + 330
    date.setMinutes(date.getMinutes() + offsetIST)
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return day + "-" + month + "-" + year + " ";
}
$(function () {
    loadTasks();
});
// For Adding a new Task
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        let todo = $(this).val().trim();
        if (todo !== '') {
            let dateIST = getISTDate()
            $('ul').append("<li><span class='delete'>❌</span><span class='task-text'>" + todo + "</span><span class='edit'>✏️</span> <span class='date-time'>" + dateIST + " </span> </li>");
            saveTasks();
            $(this).val('');
        } else {
            alert('Please enter a valid task');
        }
    }
});
// For Delete
$('ul').on('click', '.delete', function (e) {
    let conf = confirm('Are you sure you want to delete this task?');
    if (conf) {
        let deleteTask = $(this).parent().remove();
        saveTasks();
    }
    e.stopPropagation();
});
// For Completed
$('ul').on('dblclick', 'li', function () {
    $(this).toggleClass('completed');
    saveTasks();
});
// for edit
$('ul').on('click', '.edit', function (e) {
    e.stopPropagation();
    let $taskText = $(this).prev('.task-text');
    let currentText = $taskText.text();
    let $editInput = $('<input type="text" class="edit-input">').val(currentText);
    $taskText.html($editInput);
    $editInput.keypress(function (e) {
        if (e.which === 13) {
            let newText = $editInput.val();
            $taskText.text(newText);
            let dateIST = getISTDate()
            $(this).next('.date-time').text(dateIST)
            saveTasks();
        }
    });
    $editInput.blur(function () {
        let newText = $editInput.val();
        $taskText.text(newText);
        let dateIST = getISTDate()
        $(this).next('.date-time').text(dateIST);
        saveTasks();
    });
    $editInput.focus();
});
// Clear completed button click event
$("#clear-button").click(function () {
    showClearConfirmation();
});
// Function to Clear Completed tasks
function clearCompletedTasks() {
    $('ul .completed').remove();
    saveTasks();
}
// Confirmation window
function showClearConfirmation() {
    let confirmation = confirm("Are you sure you want to clear completed tasks?");
    if (confirmation) {
        clearCompletedTasks();
    }
}
// Load task
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        let completed = task.completed || false;
        let str = "<li" + (completed ? " class='completed'" : "") + "><span class='delete'>❌</span><span class='task-text'>" + task.text + "</span><span class='edit'>✏️</span><span class='date-time'>" + task.dateTime + "</span></li>";
        $('ul').append(str);
    });
}
// Save Task
function saveTasks() {
    let tasks = [];
    $('ul li').each(function () {
        let taskText = $(this).find('.task-text').text();
        let completed = $(this).hasClass('completed');
        let dateTime = $(this).find('.date-time').text();

        tasks.push({ text: taskText, completed: completed, dateTime: dateTime });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ! Filter Btn
$('#show-all').click(function () {
    $('li').show();
})
$('#show-completed').click(function () {
    $('li').hide()
    $('.completed').show()
})
$('#show-pending').click(function () {
    $('li').hide()
    $('li:not(.completed)').show()
})