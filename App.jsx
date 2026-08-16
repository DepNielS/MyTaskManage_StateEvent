function Header() {
    return (
        <header>
            <h1>My Task Manager 🦑</h1>
            <p>
                Mengelola tugas-tugasmu dengan mudah dan efisien. 
            </p>
        </header>
    );
}

function TaskForm({task, setTask, addTask}) {
    return (
        <div className="task-form">
            <input
            type ="text"
            placeholder="Masukkan Tugas Yang Baru" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Tambah Tugas</button>
        </div>
    );
}

function TaskList({tasks, deleteTask}) {
    return (
        <div className="task-list">
            <h2>Daftar Tugas</h2>
            {tasks.length === 0 ? (
                <p className="empty-task">Tidak ada tugas yang tersedia.</p>
            ) : (
                <ul>
                    {tasks.map((task, index) => (
                        <li  
                        className="task-item" 
                        key={index}>
                            <div className="task-content">
                                <input type="checkbox" />
                                <span>{task}</span>
                            </div>
                            <button onClick={() => deleteTask(index)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
          
        </div>
    );
}

function TaskSummary({tasks}) {
    return (
        <div className="task-summary">
            <h2>
            <p >
                Total Tugas: <strong>{tasks.length}</strong>
            </p>
            </h2>
            {/* <p>
                Tugas Selesai: <strong>{tasks.filter(task => task.completed).length}</strong>
            </p> */}
        </div>
    );
}
function App() {
    //State untuk menyimpan Input daftar tugas
    const [task, setTask] = React.useState('');
    //State untuk menyimpan semua tugas
    const [tasks, setTasks] = React.useState([]);

    //Fungsi untuk menambahkan tugas baru ke daftar tugas
    const addTask = () => {
        if (task.trim() === '') {
            alert("Task Tidak Boleh Kosong!");
            return;
        }
        // Menambahkan tugas baru ke daftar tugas
        setTasks([...tasks, task ]);
        // Mengosongkan input setelah menambahkan tugas
        setTask('');
    };
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index
    );
    
        setTasks(updatedTasks);
};
    return (
        <div className="container">
        <Header />

        <main>
            <TaskForm
            task={task}
            setTask={setTask}
            addTask={addTask}
            />

            <TaskList 
            tasks={tasks}
            deleteTask={deleteTask}
            />

            <TaskSummary
             tasks={tasks}
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