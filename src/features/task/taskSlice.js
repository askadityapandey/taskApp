// taskSlice.js

import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: 1,
            title: "Hello world",
            description: "This is a description",
            team: "Team1",
            asignee: "User1",
            priority: "P0",
            status: "Progress"
        },
      
    ],
    filteredTasks: [] // New field to store filtered tasks
}

export const AllTasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                team: action.payload.team,
                asignee: action.payload.asignee,
                priority: action.payload.priority,
                status: action.payload.status
            }
            state.tasks.push(task);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        changeStatus: (state, action) => {
            const { id, status, priority } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.status = status;
                task.priority = priority;
            }
        },
        changeInitialState: (state, action) => {
            state.tasks = action.payload;
        },
        filterTasks: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredTasks = state.tasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm) ||
                task.team.toLowerCase().includes(searchTerm) ||
                task.asignee.toLowerCase().includes(searchTerm) ||
                task.priority.toLowerCase().includes(searchTerm) ||
                task.status.toLowerCase().includes(searchTerm)
            );
        },
        resetFilter: (state) => {
            state.filteredTasks = [];
        }
    }
});

export const { addTask, removeTask, changeStatus, changeInitialState, filterTasks, resetFilter } = AllTasks.actions;
export default AllTasks.reducer;
