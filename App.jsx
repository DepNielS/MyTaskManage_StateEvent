// Komponen untuk menampilkan header aplikasi
function Header() {
    return (
        <header>
            <h1>My Task Manager 🦑</h1>
            <br></br>

            <p>Mengelola tugas-tugasmu dengan mudah dan efisien.</p>
            <br></br>
        </header>
    );
}


// Komponen untuk menambahkan tugas baru
function TaskForm({
    task,
    setTask,
    addTask,
    updateTask,
    editingId,
    cancelEdit
}) {
    // Fungsi untuk menangani penekanan tombol Enter pada input
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
            <input
                type="text"
                placeholder="Masukkan Tugas Yang Baru"
                value={task}
                maxLength={100}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            <div className="task-form-info">
                <span>{task.length}/100</span>
            </div>

            <div className="task-form-actions">
                <button onClick={editingId === null ? addTask : updateTask}>
                    {editingId === null ? "Tambah Tugas" : "Simpan Tugas"}
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


// Komponen untuk mencari tugas berdasarkan kata kunci
function TaskSearch({ search, setSearch }) {
    return (
        <div className="task-search">
            <input
                type="text"
                placeholder="Cari Tugas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

// Komponen untuk memfilter tugas berdasarkan status (semua, aktif, selesai)
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
                Semua ({totalTasks})
            </button>

            <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
            >
                Aktif ({activeTasks})
            </button>

            <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
            >
                Selesai ({completedTasks})
            </button>
        </div>
    );
}

// Komponen untuk menampilkan daftar tugas
function TaskList({
    tasks,
    deleteTask,
    toogleTask,
    startEdit
}) {
    return (
        <div className="task-list">
            <h2>Daftar Tugas</h2>

            {tasks.length === 0 ? (
                <p className="empty-task">
                    Tidak ada tugas yang tersedia.
                </p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li
                            className={`task-item ${
                                task.completed ? "completed" : ""
                            }`}
                            key={task.id}
                        >
                            <div className="task-content">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toogleTask(task.id)}
                                />

                                <span>{task.title}</span>
                            </div>

                            <div className="task-actions">
                                <button
                                    className="edit-button"
                                    onClick={() => startEdit(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


// Komponen untuk menampilkan ringkasan tugas (total tugas dan tugas selesai)
function TaskSummary({
    totalTasks,
    activeTasks,
    completedTasks
}) {
    return (
        <div className="task-summary">
            <h2>
                <p>
                    Total Tugas: <strong>{""}{totalTasks}</strong>
                </p>
                <p>
                    Tugas Aktif: <strong>{""}{activeTasks}</strong></p>
                <p>
                    Tugas Selesai: <strong>{""}{completedTasks}</strong>
                </p>
            </h2>
        </div>
    );
}


function App() {
    // State untuk menyimpan Input daftar tugas
    const [task, setTask] = React.useState("");

    // State untuk menyimpan semua tugas
    const [tasks, setTasks] = React.useState(() => {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [];
    });

    // State untuk menyimpan filter tugas
    const [filter, setFilter] = React.useState("all");
    
    // State untuk menyimpan ID tugas yang sedang diedit
    const [editingId, setEditingId] = React.useState(null);

    // State untuk menyimpan kata kunci pencarian tugas
    const [search, setSearch] = React.useState("");
    
    // Menyimpan daftar tugas ke localStorage setiap kali ada perubahan pada daftar tugas
    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Mengambil daftar tugas yang belum selesai dan yang sudah selesai
    const activeTasks = tasks.filter((task) => !task.completed);

    // Mengambil daftar tugas yang sudah selesai
    const completedTasks = tasks.filter((task) => task.completed);

       // Filter tugas berdasarkan status (semua, aktif, selesai)
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active" && task.completed) {
            return false;
        }

        if (filter === "completed" && !task.completed) {
            return false;
        }

        const searchedText = search.toLowerCase().trim();
        const taskTitle = task.title.toLowerCase();

        if (!taskTitle.includes(searchedText)) {
            return false;
        }

        return true;
    });

    // Fungsi untuk menambahkan tugas baru ke daftar tugas
    const addTask = () => {
        const cleanedTask = task.trim();

        if (cleanedTask === "") {
            alert("Task Tidak Boleh Kosong!");
            return;
        }
        
        if (cleanedTask.length < 3) {
            alert("Task Minimal 3 Karakter!");
            return;
        }

        if (cleanedTask.length > 100) {
            alert("Task Maksimal 100 Karakter!");
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


    const cancelEdit = () => {
        setTask("");
        setEditingId(null);
    };


    // Menghapus tugas dari daftar tugas berdasarkan index
    const deleteTask = (id) => {
        const taskToDelete = tasks.find((task) => task.id == id);

        if(!taskToDelete){
            return;
        }
        
        const confirmDelete = window.confirm(`Hapus Task "${taskToDelete.title}"?`);

        if(!confirmDelete){
            return;
        }

        const updatedTasks = task.filter((task) => task.id !== id);

        setTasks(updatedTasks);

        if(editingId === id){
            setTask("");
            setEditingId(null);
        }
        
    };


    // Mengubah status tugas menjadi selesai atau belum selesai
    const toogleTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;
        });
        setTasks(updatedTasks);
    };


 


    const startEdit = (task) => {
        // Set the task to be edited and its ID
        setEditingId(task.id);

        // Set the task title in the input field for editing
        setTask(task.title);
    };


    const updateTask = () => {
       const cleanedTask = task.trim();

            if(cleanedTask === ""){
                alert("Task Tidak Boleh Kosong!");
                return;
            }

            if(cleanedTask.length < 3){
                alert("Task Minimal 3 Karakter!");
                return;
            }

            if(cleanedTask.length > 100){
                alert("Task Maksimal 100 Karakter!");
                return;
       }
       const updatedTasks = tasks.map((item) => {
            if(item.id === editingId) {
                return{...item, title: cleanedTask
                };
            }
            return item;
       });

        setTasks(updatedTasks);
        setTask("");
        setEditingId(null);

    };

    const clearCompletedTasks = () => {
            if(completedTasks.length === 0){
                return;
            }
        const confirmClear = window.confirm(`Hapus ${completedTasks.length} task yang sudah selesai?`);
        
            if(!confirmClear){
                return;
            }

        const activeOnly = tasks.filter((task) => !task.completed);

        setTasks(activeOnly);
    };

    const editingTask = tasks.find((task) => task.id === editingId);


            if(editingTask && editingTask.completed){
                setTask("");
                setEditingId(null);
            }


    // Render komponen utama aplikasi
    return (
        <div className="container">

            <Header />

            <main>
                {/* Form untuk menambahkan tugas baru */}
                <TaskForm
                    task={task}
                    setTask={setTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    editingId={editingId}
                    cancelEdit={cancelEdit}
                />

                <TaskSearch
                    search={search}
                    setSearch={setSearch}
                />

                {/* Render komponen filter tugas dan ringkasan tugas */}
                <TaskFilter
                    filter={filter}
                    setFilter={setFilter}
                    totalTasks={tasks.length}
                    activeTasks={activeTasks.length}
                    completedTasks={completedTasks.length}
                    
                />

                {/* Render daftar tugas yang telah difilter berdasarkan status dan pencarian */}
                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    toogleTask={toogleTask}
                    startEdit={startEdit}
                />

                {completedTasks.length > 0 && (
                    <button
                        className="clear-completed"
                        onClick={clearCompletedTasks}
                    >
                        Hapus Semua Tugas Selesai
                    </button>
                )}

                {/* Render ringkasan tugas */}
                <TaskSummary
                    activeTasks={activeTasks.length}
                    completedTasks={completedTasks.length}
                    totalTasks={tasks.length}
                />
            </main>

            <footer>
                @2026 My Task Manager. All rights reserved.
            </footer>

        </div>
    );
}


const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(
    <App />
);