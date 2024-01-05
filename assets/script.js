
$(function () {
    loadTasks();
});
// For Adding a new Task
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        let todo = $(this).val().trim();
        if (todo !== '') {
            $('ul').append("<li><span class='delete'>❌</span><span class='task-text'>" + todo + "</span><span class='edit'>✏️</span> </li>");
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
            saveTasks();
        }
    });
    $editInput.blur(function () {
        let newText = $editInput.val();
        $taskText.text(newText);
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
        let str = "<li" + (completed ? " class='completed'" : "") + "><span class='delete'>❌</span><span class='task-text'>" + task.text + "</span><span class='edit'>✏️</span></li>";
        $('ul').append(str);
    });
}
// Save Task
function saveTasks() {
    let tasks = [];
    $('ul li').each(function () {
        let taskText = $(this).find('.task-text').text();
        let completed = $(this).hasClass('completed');

        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// ! Filter Btn
$('#show-all').click(function () {
    $('li').show();
    if ($('li').length === 0) {
        $('#message').text('Please add a task ')
    } else {
        $('#message').text('')
    }
})
$('#show-completed').click(function () {
    $('li').hide()
    $('.completed').show()
    if ($('.completed').length === 0) {
        $('#message').text('All Task are Pending')
    } else {
        $('#message').text('')
    }
})
$('#show-pending').click(function () {
    $('li').hide()
    $('li:not(.completed)').show()
    if ($('li:not(.completed)').length === 0) {
        $('#message').text('All tasks are completed.')
    } else {
        $('#message').text('')
    }
})
