import Input from "./Input";
import Dialog from "./Dialog";

import { createPortal } from "react-dom"; 
import {useState, useRef} from "react";

export default function NewProject ({onDectivateNewProjectWindow, onAddProject}) {
    const dialogRef = useRef();
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        dueDate: '',
    });
    
    function handleInputChange(e) {
        const {name, value} = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSave() {
        if (!projectData.name || !projectData.description || !projectData.dueDate) {
            dialogRef.current.open();
            return;
        }
        onAddProject(projectData);
        setProjectData({ name: '', description: '', dueDate: '' }); 
        onDectivateNewProjectWindow();
    }

    return (
       <>
        {createPortal(<Dialog ref={dialogRef} />, 
            document.getElementById('modal-root')
        )}
        <div className=" w-2/3 mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <button onClick={onDectivateNewProjectWindow} className="text-stone-800 hover:text-stone-950">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
            </menu>
            <Input name="name" onChange={handleInputChange} value={projectData.name} type="text" label="Title" />
            <Input name="description" onChange={handleInputChange} value={projectData.description} type="text" label="Description" textarea="textarea"/>
            <Input name="dueDate" onChange={handleInputChange} value={projectData.dueDate} type="date" label="Due Date" />
        </div>
        </>
    )
}