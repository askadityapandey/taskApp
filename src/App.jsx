// App.js

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import ModalComponent from './components/Modal';
import { changeInitialState, filterTasks, resetFilter } from './features/task/taskSlice';

const PriorityList = [
    { label: "P0" },
    { label: "P1" },
    { label: "P2" },
];

const SortList = [
    { label: "Priority" },
    { label: "Asignee" },
    { label: "Team" },
];

function App() {
    const [openModal, setOpenModal] = useState(false);
    const [assigneeFilter, setAssigneeFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const tasks = useSelector(state => state.tasks.filteredTasks.length > 0 ? state.tasks.filteredTasks : state.tasks.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeInitialState()); // Load initial tasks
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        if (searchTerm.trim() === '') {
            dispatch(resetFilter());
        } else {
            dispatch(filterTasks(searchTerm));
        }
    };

    return (
        <>
            {/* Existing JSX */}
            <input
                className="p-2 rounded-md"
                placeholder="Search tasks..."
                value={assigneeFilter}
                onChange={handleSearch}
            />
            {/* Existing JSX */}
            <Card bgCol={"bg-gray-500"} Topic={"Pending"} tasks={tasks} />
            <Card bgCol={"bg-yellow-500"} Topic={"Inprogress"} tasks={tasks} />
            <Card bgCol={"bg-green-500"} Topic={"Progress"} tasks={tasks} />
            <Card bgCol={"bg-indigo-500"} Topic={"Deployed"} tasks={tasks} />
            <Card bgCol={"bg-orange-500"} Topic={"Differed"} tasks={tasks} />
            {/* Existing JSX */}
            <ModalComponent
                Type={"Create"}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}

export default App;
