
    $("#addTaskForm").on("submit", function (e) {
    e.preventDefault();

    $.post("/tasks", $(this).serialize(), function () {
        location.reload();
    });
    });


    $(".toggle-btn").on("click", function () {
    const id = $(this).data("id");

    $.post(`/tasks/${id}/toggle`, function () {
        location.reload();
    });
    });

    $(".delete-btn").on("click", function () {
    const id = $(this).data("id");

    $.ajax({
        url: `/tasks/${id}`,
        type: "DELETE",
        success: function () {
        location.reload();
        },
    });
    });


    $(".edit-btn").on("click", function () {
    const id = $(this).data("id");
    const currentName = $(this)
        .closest("li")
        .find("span")
        .text()
        .trim()
        .replace("✅", "")
        .trim();

    $(this).closest("li").find("span").html(`
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
        location.reload();
            },
        });
        }
    });
    });

    $('.filter-btn').on('click', function () {
    const filter = $(this).data('filter');
    window.location.href = `/?filter=${filter}`;
    });
