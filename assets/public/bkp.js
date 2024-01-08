$(function () {
    loadTasks();
});
//! For Adding a new Task
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        let todo = $(this).val().trim();
        if (todo !== '') {
            let status = 'pending';
            $('ul').append(`<li data-status='${status}'>
            <span class='delete' >❌</span>
            <span class='task-text'>${todo}</span>
            <span class='edit'>✏️</span>
            <label><input type='checkbox' name='status' value='ongoing' ${status === 'ongoing' ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Ongoing</label>
            <label><input type='checkbox' name='status' value='pending' ${status === 'pending' ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Pending</label>
            <label><input type='checkbox' name='status' value='completed' ${status === 'completed' ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Completed</label>
        </li>`);
            $('ul li:last-child input[type="checkbox"]').bootstrapSwitch();

            saveTasks();
            $(this).val('');
        } else {
            alert('Please enter a valid task');
        }
    }
});
// !Changing task status
$('ul').on('switchChange.bootstrapSwitch', 'input[type="checkbox"]', function (event, state) {
    const $task = $(this).closest('li');
    const $completedCheckbox = $task.find('input[value="completed"]');
    const $ongoingCheckbox = $task.find('input[value="ongoing"]');
    const $pendingCheckbox = $task.find('input[value="pending"]');
    const status = state ? $(this).val() : 'pending';
    // Toggle class and line-through style based on the state of the "Completed" checkbox
    if (status === 'completed') {
        $task.addClass('completed');
        $task.find('.task-text').css('text-decoration', 'line-through');
    } else {
        $task.removeClass('completed');
        $task.find('.task-text').css('text-decoration', 'none');
    }
    // Disable other checkboxes in the same task
    if (status !== 'completed') {
        $completedCheckbox.bootstrapSwitch('state', false, true);
    }
    if (status !== 'ongoing') {
        $ongoingCheckbox.bootstrapSwitch('state', false, true);
    }
    if (status !== 'pending') {
        $pendingCheckbox.bootstrapSwitch('state', false, true);
    }
    saveTasks();
});
//! For Delete
$('ul').on('click', '.delete', function (e) {
    let conf = confirm('Are you sure you want to delete this task?');
    if (conf) {
        let deleteTask = $(this).parent().remove();
        saveTasks();
    }
    e.stopPropagation();
});
//! For Completed
$('ul').on('dblclick', 'li', function () {
    $(this).toggleClass('completed');
    saveTasks();
});
//! for edit
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
//! Clear completed button click event
$("#clear-button").click(function () {
    showClearConfirmation();
});
//! Function to Clear Completed tasks
function clearCompletedTasks() {
    $('ul .completed').remove();
    saveTasks();
}
//! Confirmation window
function showClearConfirmation() {
    let confirmation = confirm("Are you sure you want to clear completed tasks?");
    if (confirmation) {
        clearCompletedTasks();
    }
}
//! Load task
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        let status = task.completed ? 'completed' : (task.ongoing ? 'ongoing' : 'pending');
        let str = `<li data-status='${status}' class='${status}'>
        <span class='delete'>❌</span>
        <span class='task-text'>${task.text}</span>
        <span class='edit'>✏️</span>
        <label><input type='checkbox' name='status' value='ongoing' ${task.ongoing ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Ongoing</label>
        <label><input type='checkbox' name='status' value='pending' ${task.pending ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Pending</label>
        <label><input type='checkbox' name='status' value='completed' ${task.completed ? 'checked' : ''} data-toggle='switch' data-on-text="On" data-off-text="Off"> Completed</label>
    </li>`;
        $('ul').append(str);
        $('ul li:last-child input[type="checkbox"]').bootstrapSwitch();
    });
}
//! Save Task
function saveTasks() {
    let tasks = [];
    $('ul li').each(function () {
        let taskText = $(this).find('.task-text').text();
        let completed = $(this).hasClass('completed');
        let ongoing = $(this).find('input[value="ongoing"]').prop('checked');
        let pending = $(this).find('input[value="pending"]').prop('checked');
        tasks.push({
            text: taskText,
            completed: completed,
            ongoing: ongoing,
            pending: pending
        });
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
$('#show-ongoing').click(function () {
    $('li').hide();
    $('li[data-status="ongoing"]').show();

    if ($('li[data-status="ongoing"]').length === 0) {
        $('#message').text('There are no ongoing tasks.');
    } else {
        $('#message').text('');
    }
});

//? Clear All Tasks button click event
// $("#clear-all-button").click(function () {
//     $("#clear-all-confirmation").show();
// });
//? Function to clear all tasks
// function clearAllTasks() {
//     $('ul li').remove();
//     localStorage.removeItem('tasks');
//     $("#clear-all-confirmation").hide();
// }
//? Handle confirmation input
// $("#clear-all-confirmation input").keypress(function (e) {
//     if (e.which === 13) {
//         let confirmationText = $(this).val().trim();
//         if (confirmationText === "delete all") {
//             clearAllTasks();
//         } else {
//             alert("Please type 'delete all' to confirm.");
//         }
//     }
// });
function updateMessage(selector) {
    if ($(selector).length === 0) {
        $('#message').text('No tasks to display.');
    } else {
        $('#message').text('');
    }
}