import NewTask from "./NewTask";

export default function Tasks({ tasks, onAddTask, onRemoveTask }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAdd={onAddTask} />
            {tasks.length === 0 && (
                <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>
            )}
            {tasks.length > 0 && (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex justify-between my-4">
                            <span>{task}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => onRemoveTask(index)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}