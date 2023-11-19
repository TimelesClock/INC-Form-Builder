import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from '@headlessui/react'


import EditSection from './EditSection';
import type { Question } from './StaticForm';

interface DraggableQuestionsProps {
    initialQuestions: Question[];
}

interface SortableItemProps {
    question: Question;

}

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

const SortableItem: React.FC<SortableItemProps> = ({ question }) => {
    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id: question.id.toString() });
    const [focused, setFocused] = useState<boolean>(false);
    const [enabled, setEnabled] = useState<boolean>(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleSetFocus = () => {
        setFocused(true);
    }

    return (
        <div tabIndex={0} ref={setNodeRef} style={style} className={`relative border border-1 p-4 my-2 grid ${focused ? 'border-rose-500' : 'border-black'}`} onFocus={handleSetFocus} onBlur={() => setFocused(false)}>
            <div ref={setActivatorNodeRef} {...listeners} className="cursor-move self-center w-5 justify-self-center">
                {/* Drag handle, style as needed */}
                <div className="">
                    <div className="w-5 flex justify-between">
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                    </div>
                    <div className="w-5 flex justify-between mt-1">
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                        <span className="block h-1 w-1 rounded-full bg-black"></span>
                    </div>
                </div>
            </div>
            <EditSection question={question} editMode={true} focused={true} />
            <div className={`${focused ? "animate-fadeIn" : "hidden"} self-end justify-self-end mt-5 flex`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <div
                    className="inline-block h-[25px] me-5 w-0.5 self-stretch bg-neutral-400 opacity-100 dark:opacity-50"></div>

                <div className="me-5">
                    Required
                </div>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={classNames(
                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                    )}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        className={classNames(
                            enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    >
                        <span
                            className={classNames(
                                enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                        >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                <path
                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span
                            className={classNames(
                                enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                            )}
                            aria-hidden="true"
                        >
                            <svg className="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                            </svg>
                        </span>
                    </span>
                </Switch>
            </div>
        </div>
    );
};


const DraggableQuestions: React.FC<DraggableQuestionsProps> = ({ initialQuestions }) => {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setQuestions((items) => {
                const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
                const newIndex = items.findIndex((item) => item.id.toString() === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={questions.map((question) => question.id.toString())} strategy={verticalListSortingStrategy}>
                {questions.map((question) => (
                    <SortableItem key={question.id} question={question} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default DraggableQuestions;

// Utility function to move array elements
function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const newArray = array.slice();
    const [movedItem] = newArray.splice(from, 1);
    if (movedItem) {
        newArray.splice(to, 0, movedItem);
    }

    return newArray;
}
