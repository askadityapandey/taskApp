// Card.js

import { useSelector } from 'react-redux';

const Card = ({ bgCol, Topic }) => {
    const tasks = useSelector(state => state.tasks);

    return (
        <div className='h-[40rem] w-72 border border-white rounded-md ml-7 my-3 bg-gray-100 overflow-y-auto hide-scrollbar'>
            {/* existing code */}
            <div className=''>
                {tasks.map((task) => {
                    if (task.status === Topic) {
                        return (
                            <Task
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                team={task.team}
                                asignee={task.asignee}
                                priority={task.priority}
                                status={task.status}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Card;
