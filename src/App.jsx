import React, { useState } from 'react';
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

const App = () => {
  const [leftval, setLeftVal] = useState("");
  const [leftTask, setLeftTask] = useState([]);
  const [rightval, setRightval] = useState("");
  const [rightTask, setRightTask] = useState([]);
  const [checkTasks, setCheckTasks] = useState({ leftTask: [], rightTask: [] });

  const leftAddTask = () => {
    if (leftval.trim()) {
      setLeftTask((prev) => [...prev, leftval]);
      setLeftVal("");
    }
  };

  const rightAddTask = () => {
    if (rightval.trim()) {
      setRightTask((prev) => [...prev, rightval]);
      setRightval("");
    }
  };

  const handleCheckBox = (index, listType) => {
    setCheckTasks((prev) => ({
      ...prev,
      [listType]: prev[listType].includes(index)
        ? prev[listType].filter((i) => i !== index)
        : [...prev[listType], index],
    }));
  };

  const leftMove = () => {
    const tasksToMove = rightTask.filter((_, index) => checkTasks.rightTask.includes(index));
    setRightTask(rightTask.filter((_, index) => !checkTasks.rightTask.includes(index)));
    setLeftTask([...leftTask, ...tasksToMove]);
    setCheckTasks({ leftTask: [], rightTask: [] });
  };

  const rightMove = () => {
    const tasksToMove = leftTask.filter((_, index) => checkTasks.leftTask.includes(index));
    setLeftTask(leftTask.filter((_, index) => !checkTasks.leftTask.includes(index)));
    setRightTask([...rightTask, ...tasksToMove]);
    setCheckTasks({ leftTask: [], rightTask: [] });
  };

  return (
    <div className='flex h-screen justify-center items-center gap-x-10 bg-slate-950 font-[Poppins]'>
      <div className='text-black flex flex-col justify-center rounded-2xl shadow-lg items-center min-h-80 w-80 bg-gray-500 gap-y-4 py-6 px-6 border-4 border-gray-700'>
        <input type='text' value={leftval} onChange={(e) => setLeftVal(e.target.value)} className='border-2 border-black py-2 px-4 w-full rounded-md text-lg' />
        <button onClick={leftAddTask} className='border-2 rounded-lg bg-cyan-500 py-2 px-6 text-xl font-semibold shadow-md hover:bg-cyan-600 transition'>Add</button>
        {leftTask.map((task, index) => (
          <div key={`left-${index}`} className='flex gap-x-2 items-center'>
            <input type='checkbox' checked={checkTasks.leftTask.includes(index)} onChange={() => handleCheckBox(index, 'leftTask')} className='w-5 h-5' />
            <p className='text-lg font-medium'>{task}</p>
          </div>
        ))}
        <span className='text-6xl cursor-pointer text-white hover:text-gray-300 transition' onClick={rightMove}><TiArrowRightOutline /></span>
      </div>

      <div className='text-black flex flex-col justify-center rounded-2xl shadow-lg items-center min-h-80 w-80 bg-gray-500 gap-y-4 py-6 px-6 border-4 border-gray-700'>
        <input type='text' value={rightval} onChange={(e) => setRightval(e.target.value)} className='border-2 border-black py-2 px-4 w-full rounded-md text-lg' />
        <button onClick={rightAddTask} className='border-2 rounded-lg bg-cyan-500 py-2 px-6 text-xl font-semibold shadow-md hover:bg-cyan-600 transition'>Add</button>
        {rightTask.map((task, index) => (
          <div key={`right-${index}`} className='flex gap-x-2 items-center'>
            <input type='checkbox' checked={checkTasks.rightTask.includes(index)} onChange={() => handleCheckBox(index, 'rightTask')} className='w-5 h-5' />
            <p className='text-lg font-medium'>{task}</p>
          </div>
        ))}
        <span className='text-6xl cursor-pointer text-white hover:text-gray-300 transition' onClick={leftMove}><TiArrowLeftOutline /></span>
      </div>
    </div>
  );
};

export default App;
