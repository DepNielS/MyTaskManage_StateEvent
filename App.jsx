// ================================
// HEADER COMPONENT
// ================================

function Header() {
    return (
        <header className="hero">
            <div className="hero-main">

                <div className="app-icon">
                    ✓
                </div>

                <div className="hero-content">
                    <h1>
                        My <span>Task Manager</span>
                    </h1>

                    <p className="hero-subtitle">
                        Kelola tugasmu, capai tujuanmu 🚀
                    </p>
                </div>

            </div>

            <div className="hero-quote">
                <span>"Small steps</span>
                <span>make big progress"</span>
            </div>

            <div className="hero-decoration">
                📋
            </div>

            <p className="hero-description">
                Rencanakan, kerjakan, dan selesaikan tugas dengan lebih mudah dan efisien.
            </p>
        </header>
    );
}


// ================================
// TASK FORM COMPONENT
// ================================

function TaskForm({
    task,
    setTask,
    addTask,
    updateTask,
    editingId,
    cancelEdit
}) {

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {

            if (editingId === null) {
                addTask();
            } else {
                updateTask();
            }
        }

        if (e.key === "Escape") {

            if (editingId !== null) {
                cancelEdit();
            }
        }
    };

    return (
        <div className="task-form">

            <div className="plus-icon">
                +
            </div>

            <div className="task-input-wrapper">

                <input
                    type="text"
                    placeholder={
                        editingId === null
                            ? "Masukkan Tugas Baru..."
                            : "Edit tugas..."
                    }
                    value={task}
                    maxLength={100}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

            </div>

            <div className="task-form-info">
                <span>
                    {task.length}/100
                </span>
            </div>

            <div className="task-form-actions">

                <button
                    className="primary-button"
                    onClick={
                        editingId === null
                            ? addTask
                            : updateTask
                    }
                >
                    <span>
                        {editingId === null ? "➤" : "✓"}
                    </span>

                    {editingId === null
                        ? "Tambah Tugas"
                        : "Simpan Tugas"
                    }
                </button>

                {editingId !== null && (
                    <button
                        className="cancel-button"
                        onClick={cancelEdit}
                    >
                        Batal
                    </button>
                )}

            </div>

        </div>
    );
}


// ================================
// SEARCH COMPONENT
// ================================

function TaskSearch({
    search,
    setSearch
}) {
    return (
        <div className="task-search">

            <div className="search-icon">
                ⌕
            </div>

            <input
                type="text"
                placeholder="Cari tugas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="search-shortcut">
                Ctrl + K
            </div>

        </div>
    );
}


// ================================
// FILTER COMPONENT
// ================================

function TaskFilter({
    filter,
    setFilter,
    totalTasks,
    activeTasks,
    completedTasks
}) {

    return (
        <div className="task-filter">

            <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
            >
                <span className="filter-icon">
                    ▦
                </span>

                Semua ({totalTasks})
            </button>


            <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
            >
                <span className="filter-icon">
                    ◷
                </span>

                Aktif ({activeTasks})
            </button>


            <button
                className={
                    filter === "completed"
                        ? "active"
                        : ""
                }
                onClick={() => setFilter("completed")}
            >
                <span className="filter-icon">
                    ✓
                </span>

                Selesai ({completedTasks})
            </button>

        </div>
    );
}


// ================================
// TASK LIST COMPONENT
// ================================

function TaskList({
    tasks,
    deleteTask,
    toogleTask,
    startEdit
}) {

    return (
        <div className="task-list">

            <div className="task-list-header">

                <div className="task-title-wrapper">

                    <div className="task-title-line"></div>

                    <h2>
                        Daftar Tugas
                    </h2>

                </div>

                <button className="sort-button">
                    ⇅ &nbsp; Terbaru &nbsp;⌄
                </button>

            </div>


            {tasks.length === 0 ? (

                <div className="empty-task">

                    <div className="empty-icon">
                        ✓
                    </div>

                    <h3>
                        Tidak ada tugas
                    </h3>

                    <p>
                        Tambahkan tugas baru untuk memulai produktivitasmu.
                    </p>

                </div>

            ) : (

                <ul>

                    {tasks.map((task) => (

                        <li
                            className={
                                `task-item ${
                                    task.completed
                                        ? "completed"
                                        : ""
                                }`
                            }
                            key={task.id}
                        >

                            <div className="task-content">

                                <button
                                    className={
                                        `task-checkbox ${
                                            task.completed
                                                ? "checked"
                                                : ""
                                        }`
                                    }
                                    onClick={() =>
                                        toogleTask(task.id)
                                    }
                                    aria-label={
                                        task.completed
                                            ? "Tandai belum selesai"
                                            : "Tandai selesai"
                                    }
                                >
                                    {task.completed && "✓"}
                                </button>


                                <div className="task-information">

                                    <span className="task-name">
                                        {task.title}
                                    </span>

                                    <span className="task-date">
                                        📅 Ditambahkan baru saja
                                    </span>

                                </div>

                            </div>


                            <div className="task-actions">

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        startEdit(task)
                                    }
                                >
                                    ✎ &nbsp; Edit
                                </button>


                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                >
                                    🗑 &nbsp; Hapus
                                </button>

                            </div>

                        </li>

                    ))}

                </ul>

            )}

        </div>
    );
}


// ================================
// TASK SUMMARY COMPONENT
// ================================

function TaskSummary({
    totalTasks,
    activeTasks,
    completedTasks
}) {

    return (
        <div className="task-summary">

            {/* TOTAL */}
            <div className="summary-card summary-total">

                <div className="summary-icon">
                    📄
                </div>

                <div className="summary-content">

                    <p>
                        Total Tugas
                    </p>

                    <strong>
                        {totalTasks}
                    </strong>

                    <span>
                        Semua tugas
                    </span>

                </div>

            </div>


            {/* ACTIVE */}
            <div className="summary-card summary-active">

                <div className="summary-icon">
                    ◷
                </div>

                <div className="summary-content">

                    <p>
                        Tugas Aktif
                    </p>

                    <strong>
                        {activeTasks}
                    </strong>

                    <span>
                        Sedang dikerjakan
                    </span>

                </div>

            </div>


            {/* COMPLETED */}
            <div className="summary-card summary-completed">

                <div className="summary-icon">
                    ✓
                </div>

                <div className="summary-content">

                    <p>
                        Tugas Selesai
                    </p>

                    <strong>
                        {completedTasks}
                    </strong>

                    <span>
                        Sudah diselesaikan
                    </span>

                </div>

            </div>

        </div>
    );
}


// ================================
// MAIN APP
// ================================

function App() {

    // State input task
    const [task, setTask] = React.useState("");


    // State daftar tasks
    const [tasks, setTasks] = React.useState(() => {

        const savedTasks =
            localStorage.getItem("tasks");

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [];
    });


    // State filter
    const [filter, setFilter] =
        React.useState("all");


    // State editing
    const [editingId, setEditingId] =
        React.useState(null);


    // State search
    const [search, setSearch] =
        React.useState("");


    // Simpan tasks ke localStorage
    React.useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);


    // ================================
    // TASK COUNTS
    // ================================

    const activeTasks =
        tasks.filter(
            (task) => !task.completed
        );

    const completedTasks =
        tasks.filter(
            (task) => task.completed
        );


    // ================================
    // FILTER + SEARCH
    // ================================

    const filteredTasks =
        tasks.filter((task) => {

            // Filter status
            if (
                filter === "active" &&
                task.completed
            ) {
                return false;
            }

            if (
                filter === "completed" &&
                !task.completed
            ) {
                return false;
            }


            // Search
            const searchedText =
                search.toLowerCase().trim();

            const taskTitle =
                task.title.toLowerCase();


            if (
                !taskTitle.includes(searchedText)
            ) {
                return false;
            }


            return true;
        });


    // ================================
    // ADD TASK
    // ================================

    const addTask = () => {

        const cleanedTask =
            task.trim();


        if (cleanedTask === "") {

            alert(
                "Task Tidak Boleh Kosong!"
            );

            return;
        }


        if (cleanedTask.length < 3) {

            alert(
                "Task Minimal 3 Karakter!"
            );

            return;
        }


        if (cleanedTask.length > 100) {

            alert(
                "Task Maksimal 100 Karakter!"
            );

            return;
        }


        const newTask = {

            id: Date.now(),

            title: cleanedTask,

            completed: false
        };


        setTasks([
            ...tasks,
            newTask
        ]);


        setTask("");
    };


    // ================================
    // CANCEL EDIT
    // ================================

    const cancelEdit = () => {

        setTask("");

        setEditingId(null);
    };


    // ================================
    // DELETE TASK
    // ================================

    const deleteTask = (id) => {

        const taskToDelete =
            tasks.find(
                (task) => task.id === id
            );


        if (!taskToDelete) {
            return;
        }


        const confirmDelete =
            window.confirm(
                `Hapus Task "${taskToDelete.title}"?`
            );


        if (!confirmDelete) {
            return;
        }


        // BUG DARI CODE LAMA DIPERBAIKI
        // sebelumnya menggunakan task.filter()
        const updatedTasks =
            tasks.filter(
                (task) => task.id !== id
            );


        setTasks(updatedTasks);


        if (editingId === id) {

            setTask("");

            setEditingId(null);
        }
    };


    // ================================
    // TOGGLE TASK
    // ================================

    const toogleTask = (id) => {

        const updatedTasks =
            tasks.map((task) => {

                if (task.id === id) {

                    return {
                        ...task,
                        completed:
                            !task.completed
                    };
                }

                return task;
            });


        setTasks(updatedTasks);
    };


    // ================================
    // START EDIT
    // ================================

    const startEdit = (task) => {

        // Task selesai tidak diedit
        if (task.completed) {
            return;
        }


        setEditingId(task.id);

        setTask(task.title);
    };


    // ================================
    // UPDATE TASK
    // ================================

    const updateTask = () => {

        const cleanedTask =
            task.trim();


        if (cleanedTask === "") {

            alert(
                "Task Tidak Boleh Kosong!"
            );

            return;
        }


        if (cleanedTask.length < 3) {

            alert(
                "Task Minimal 3 Karakter!"
            );

            return;
        }


        if (cleanedTask.length > 100) {

            alert(
                "Task Maksimal 100 Karakter!"
            );

            return;
        }


        const updatedTasks =
            tasks.map((item) => {

                if (
                    item.id === editingId
                ) {

                    return {
                        ...item,
                        title: cleanedTask
                    };
                }

                return item;
            });


        setTasks(updatedTasks);

        setTask("");

        setEditingId(null);
    };


    // ================================
    // CLEAR COMPLETED
    // ================================

    const clearCompletedTasks = () => {

        if (
            completedTasks.length === 0
        ) {
            return;
        }


        const confirmClear =
            window.confirm(
                `Hapus ${completedTasks.length} task yang sudah selesai?`
            );


        if (!confirmClear) {
            return;
        }


        const activeOnly =
            tasks.filter(
                (task) => !task.completed
            );


        setTasks(activeOnly);
    };


    // ================================
    // RENDER
    // ================================

    return (

        <div className="container">

            <Header />


            <main>

                {/* FORM */}
                <TaskForm
                    task={task}
                    setTask={setTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    editingId={editingId}
                    cancelEdit={cancelEdit}
                />


                {/* SEARCH */}
                <TaskSearch
                    search={search}
                    setSearch={setSearch}
                />


                {/* FILTER */}
                <TaskFilter
                    filter={filter}
                    setFilter={setFilter}
                    totalTasks={tasks.length}
                    activeTasks={activeTasks.length}
                    completedTasks={completedTasks.length}
                />


                {/* TASK LIST */}
                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    toogleTask={toogleTask}
                    startEdit={startEdit}
                />


                {/* DELETE COMPLETED */}
                {completedTasks.length > 0 && (

                    <div className="clear-completed-wrapper">

                        <button
                            className="clear-completed"
                            onClick={
                                clearCompletedTasks
                            }
                        >
                            🗑 &nbsp;
                            Hapus Semua Tugas Selesai
                        </button>

                    </div>

                )}


                {/* SUMMARY */}
                <TaskSummary
                    activeTasks={
                        activeTasks.length
                    }
                    completedTasks={
                        completedTasks.length
                    }
                    totalTasks={
                        tasks.length
                    }
                />

            </main>


            {/* FOOTER */}
            <footer>

                <p>
                    ❤️ &nbsp;
                    Tetap produktif, hari ini lebih baik dari kemarin!
                </p>

                <span>
                    ©2026 My Task Manager. All rights reserved.
                </span>

            </footer>

        </div>
    );
}


// ================================
// REACT ROOT
// ================================

const container =
    document.getElementById("root");


const root =
    ReactDOM.createRoot(container);


root.render(
    <App />
);