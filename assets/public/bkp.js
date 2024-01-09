$(function () {
    loadTasks();
});
//! For Adding a new Task
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        let todo = $(this).val().trim();
        if (todo !== '') {
            if (todo.length > 20) {
                alert(`only 20 characters are allowed`)
                return
            }
            let status = 'pending';
            $('ul').append(`<li data-status='${status}'>
            <span class='delete' >❌</span>
            <span class='task-text'>${todo}</span>
            <span class='edit'>✏️</span> 
            <label><button class="status-btn" data-value="ongoing">Ongoing</button></label>
            <label><button class="status-btn" data-value="pending">Pending</button></label>
            <label><button class="status-btn" data-value="completed">Completed</button></label>
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
$('ul').on('click', '.status-btn', function () {
    const $task = $(this).closest('li');
    const status = $(this).data('value');

    $task.removeClass('completed ongoing pending'); // Clear all statuses
    $task.addClass(status); // Set the clicked status

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
        <label><button class="status-btn" data-value="ongoing">Ongoing</button></label>
        <label><button class="status-btn" data-value="pending">Pending</button></label>
        <label><button class="status-btn" data-value="completed">Completed</button></label>
          </li>`;
        $('ul').append(str);
    });
}
//! Save Task
function saveTasks() {
    let tasks = [];
    $('ul li').each(function () {
        let taskText = $(this).find('.task-text').text();
        let completed = $(this).hasClass('completed');
        let ongoing = $(this).hasClass('ongoing');
        let pending = $(this).hasClass('pending');
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
    $('li[data-status="pending"]').show()
    if ($('li[data=status="pending"]').length === 0) {
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
// !Footer Time
async function updateTime() {
    let date = new Date();
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    h = h % 12
    h = h ? h : 12
    let amPm = h >= 12 ? 'AM' : 'PM'
    document.getElementById("footer").innerHTML = h + ":" + m + ":" + s + " " + amPm

    await new Promise(resolve => setTimeout(resolve, 1000));
    updateTime();
}
updateTime()

