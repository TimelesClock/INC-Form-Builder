import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ControllerRenderProps } from 'react-hook-form';
import Section from './Section';

interface Question {
    id: number;
    text: string;
    type: string;
    options?: string[];
    required?: boolean;
}

interface DraggableQuestionsProps {
    initialQuestions: Question[];
}

interface SortableItemProps {
    question: Question;
    
}

const SortableItem: React.FC<SortableItemProps> = ({ question }) => {
    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id: question.id.toString() });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="border border-black p-4 my-2 grid">
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
            <Section question={question} />
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
