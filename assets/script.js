$(document).ready(function () {
    $("#add-button").click(function () {
        var task = $("#new-task").val();
        if (task !== "") {
            addTask(task);
            $("#new-task").val("");
        }
    });
    $("#todo-list").on("change", ".checkbox", function () {
        $(this).parent().toggleClass("completed");
    });
    $("#todo-list").on("dblclick", "li label", function () {
        var label = $(this);
        var input = $("<input type='text' value='" + label.text() + "'>");
        label.replaceWith(input);
        input.focus();
        input.blur(function () {
            var text = $(this).val();
            if (text !== "") {
                label.text(text);
            }
            label.show();
            $(this).replaceWith(label);
        });
    });
    $("#todo-list").on("click", ".delete-button", function () {
        $(this).parent().remove();
    });
    $("#todo-list").on("click", ".edit-button", function () {
        var label = $(this).siblings("label");
        var input = $("<input type='text' value='" + label.text() + "'>");
        label.replaceWith(input);
        input.focus();
        input.blur(function () {
            var text = $(this).val();
            if (text !== "") {
                label.text(text);
            }
            label.show();
            $(this).replaceWith(label);
        });
    });
    function addTask(task) {
        var listItem = $("<li>").append(
            $("<input type='checkbox' class='checkbox'>"),
            $("<label>").text(task),
            $("<button class='edit-button'>Edit</button>"),
            $("<button class='delete-button'>Delete</button>")
        );
        $("#todo-list").append(listItem);
    }
});
