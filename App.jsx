// Komponen untuk menampilkan header aplikasi
function Header() {
    return (
        <header>
            <h1>My Task Manager 🦑</h1>

            <p>Mengelola tugas-tugasmu dengan mudah dan efisien.</p>
        </header>
    );
}

// Komponen untuk menambahkan tugas baru
function TaskForm({task, setTask, addTask, updateTask, editingId}) {
    
    return (
        <div className="task-form">
            <input
            type ="text"
            placeholder="Masukkan Tugas Yang Baru" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={editingId === null ? addTask : updateTask}>
                {
                editingId === null ? "Tambah Tugas" : "Simpan Tugas"
                }
            </button>
        </div>
    );
}

// Komponen untuk mencari tugas berdasarkan kata kunci
function TaskSearch({search, setSearch}) {
    return (
        <div className="task-search">
            <input type="text" placeholder="Cari Tugas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    );
}

// Komponen untuk menampilkan daftar tugas
function TaskList({tasks, deleteTask, toogleTask, startEdit}) {

    return (
        <div className="task-list">

            <h2>Daftar Tugas</h2>

            {tasks.length === 0 ? (
                <p className="empty-task">Tidak ada tugas yang tersedia.</p>
            ) : (
                <ul>
                    {tasks.map((task)  => (
                        <li className={`task-item ${task.completed ? "completed" : "" }`} key={task.id}>

                            <div className="task-content">

                                <input 
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toogleTask(task.id)}
                                />
                                <span>{task.title}</span>
                            </div>
                            
                            <div className="task-actions">
                                <button className="edit-button" onClick={() => startEdit(task)}>Edit</button>

                                <button className="delete-button" onClick={() => deleteTask(task.id)}>Hapus</button>
                            </div>

                                

                        </li>
                    ))}
                </ul>
            )}
          
        </div>
    );
}

// Komponen untuk memfilter tugas berdasarkan status (semua, aktif, selesai)
function TaskFilter({filter, setFilter, totalTasks, activeTasks, completedTasks}) {
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

// Komponen untuk menampilkan ringkasan tugas (total tugas dan tugas selesai)
function TaskSummary({totalTasks, completedTasks}) {

    return (
        <div className="task-summary">
            <h2> 
                <p> Total Tugas: <strong>{""}{totalTasks}</strong> </p> 
                <p> Tugas Selesai: <strong>{""}{completedTasks}</strong> </p>
            </h2>
        </div>

    );
}



function App() {
    //State untuk menyimpan Input daftar tugas
    const [task, setTask] = React.useState("");

    //State untuk menyimpan semua tugas
    const [tasks, setTasks] = React.useState (() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [];
    });

    //Menyimpan daftar tugas ke localStorage setiap kali ada perubahan pada daftar tugas
    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    //State untuk menyimpan kata kunci pencarian
    const [search, setSearch] = React.useState("");

    //State untuk menyimpan filter tugas
    const [filter, setFilter] = React.useState("all");

    //Mengambil daftar tugas yang belum selesai dan yang sudah selesai
    const activeTasks = tasks.filter((task) => !task.completed);
    
    //Mengambil daftar tugas yang sudah selesai
    const completedTasks = tasks.filter((task) => task.completed);

    const [editingId, setEditingId] = React.useState(null);

    //Fungsi untuk menambahkan tugas baru ke daftar tugas
    const addTask = () => {
        if (task.trim() === "") {
            alert("Task Tidak Boleh Kosong!");
            return;
        }
        const newTask = {
            id: Date.now(),
            title: task,
            completed: false,
        };

        // Menambahkan tugas baru ke daftar tugas
        setTasks([...tasks, newTask ]);
        // Mengosongkan input setelah menambahkan tugas
        setTask("");
    };

    //Menghapus tugas dari daftar tugas berdasarkan index
    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };
    
    //Mengubah status tugas menjadi selesai atau belum selesai
    const toogleTask = (id) => { 
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, completed: !task.completed};
            }
            return task; 
        });
        setTasks(updatedTasks);
    };

    // Filter tugas berdasarkan status (semua, aktif, selesai)
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active" && task.completed) {
            return false;
        }
        if (filter === "completed" && !task.completed) {
            return false;
        }

    const searchedText = search.toLowerCase();
    const taskTitle = task.title.toLowerCase();
        if(!taskTitle.includes(searchedText)) {
            return false;
        }
            return true;
    });

    


    const startEdit = (task) => {
        // Set the task to be edited and its ID
        setEditingId(task.id);
        // Set the task title in the input field for editing
        setTask(task.title);
    };

    const updateTask = () => {
        if (task.trim() === "") {
            alert("Task Tidak Boleh Kosong!");
            return;
        }
    const updatedTasks = tasks.map((item) => {
        if (item.id === editingId) {
            return {...item, title: task};
        }
        return item;
    });
    setTasks(updatedTasks);
    setEditingId(null);
    setTask("");
};

    const clearCompletedTasks = () => {
        const activeOnly =tasks.filter((task) => !task.completed);
        setTasks(activeOnly);
    };

    const cancelEdit = () => {
        setTask("");
        setEditingId(null);
    };

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
            completedTasks={completedTasks.length}
            activeTasks={activeTasks.length}
            />

            {/* Render daftar tugas yang telah difilter berdasarkan status dan pencarian */}
            <TaskList 
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toogleTask={toogleTask}
            startEdit={startEdit}
            />
            
           
            {/* {
            completeTasks.length > 0 && (
                <button className="clear-completed" onClick={clearCompletedTasks}>
                    Hapus Semua Tugas Selesai
                </button>
            )} */}
            

            {/* Render ringkasan tugas */}
            <TaskSummary
             totalTasks={tasks.length}
             completedTasks={completedTasks.length}
            />

        </main>
        
        <footer>
            @2026 My Task Manager. All rights reserved.
        </footer>
        
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <App />
);