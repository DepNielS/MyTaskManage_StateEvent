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

function TaskForm() {
    const handleClick = () => {
        alert ('Tombol Tambah berhasil Di Klik!');
    };
    return (
        <div className="task-form">
            <input
            type ="text"
            placeholder="Masukkan Tugas Yang Baru"
            />
            <button onClick={handleClick}>Tambah Tugas</button>
        </div>
    );
}

function TaskList() {
    return (
        <div className="task-list">
            <h2>Daftar Tugas</h2>
            <ul>
                <li className="task-item">
                    <span>Belajar React</span>
                    <button onClick={() => alert('Tugas "Belajar React" telah dihapus!')}>
                        Hapus
                    </button>
                </li>
                <li className="task-item">
                    <span>Belajar JavaScript</span>
                    <button onClick={() => alert('Tugas "Belajar JavaScript" telah dihapus!')}>
                        Hapus
                    </button>
                </li>
                <li className="task-item">
                    <span>Membuat Portfolio</span>
                    <button onClick={() => alert('Tugas "Membuat Portfolio" telah dihapus!')}>
                        Hapus
                    </button>
                </li>
            </ul>
        </div>
    );
}

function TaskSummary() {
    return (
        <div className="task-summary">
            <h2>Ringkasan Tugas</h2>
            <p>
                Total Tugas: 3
            </p>
            <p>
                Tugas Selesai: 0
            </p>
        </div>
    );
}
function App() {
    return (
        <div className="container">
        <Header />
        <main>
            <TaskForm />

            <TaskList />

            <TaskSummary />

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