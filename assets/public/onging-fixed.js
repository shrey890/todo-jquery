// Load task
function loadTasks(callback) {
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

    // Execute the callback function after tasks are loaded
    if (callback && typeof callback === 'function') {
        callback();
    }
}

// Usage
$(function () {
    loadTasks(function () {
        // Show ongoing tasks after loading tasks is complete
        showOngoingTasks();
    });
});

// Function to show ongoing tasks
function showOngoingTasks() {
    $('li').hide();
    $('li[data-status="ongoing"]').show();

    if ($('li[data-status="ongoing"]').length === 0) {
        $('#message').text('There are no ongoing tasks.');
    } else {
        $('#message').text('');
    }
}

// You can also call showOngoingTasks() elsewhere in your code, as needed.
