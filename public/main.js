
    // Add new task
    $("#addTaskForm").on("submit", function (e) {
    e.preventDefault();

    const form = $(this);
    const taskName = form.find("input[name='name']").val();

    $.post("/tasks", $(this).serialize(), function (newTask) {
        const completed = newTask.completed ? "✅" : "";

        const newItem = 
    `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${newTask.name} ${completed}</span>
    <div>
        <button class="btn btn-sm btn-secondary edit-btn" data-id="${newTask.id}">✏️</button>
    <button class="btn btn-sm btn-success toggle-btn" 
    data-id="${newTask.id}" 
    data-completed="${newTask.completed}">
✔️</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${newTask.id}">🗑️</button>
        </div>
    </li>`;

    $(".list-group").prepend(newItem);
    form.trigger("reset");
    });
    });

    //toggle

    $(document).on("click", ".toggle-btn", function () {
const button = $(this);
const id = button.data("id");
const completed = button.data("completed"); 
const row = button.closest("li");
const nameSpan = row.find("span");

$.post(`/tasks/${id}/toggle`, function () {

    if (completed) {
    nameSpan.text(nameSpan.text().replace("✅", "").trim());
    button.data("completed", false); 
    } else {
    nameSpan.text(nameSpan.text().trim() + " ✅");
    button.data("completed", true);
    }
});
});
    
    //delete

    $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    const li = $(this).closest("li");

    $.ajax({
        url: `/tasks/${id}`,
        type: "DELETE",
        success: function () {
        li.remove();
        },
    });
    });
//edit

$(document).on("click", ".edit-btn", function () {
    const button = $(this);
    const id = button.data("id");

    const li = button.closest("li");
    const span = li.find("span");

    const completed = span.text().includes("✅");
    const currentName = span.text().replace("✅", "").trim();


span.html(`
    <input type="text" class="form-control edit-input" value="${currentName}" />
`);
$(".edit-input").on("keypress", function (e) {
    if (e.which === 13) {
    const newName = $(this).val();

    $.ajax({
        url: `/tasks/${id}`,
        type: "PUT",
        data: { name: newName },
        success: function () {
        span.text(newName + (completed ? " ✅" : ""));
        }
    });
    }
});
});

    //filter

    $('.filter-btn').on('click', function () {
    const filter = $(this).data('filter');
    window.location.href = `/?filter=${filter}`;
    });
