import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Section from './Section';


export interface Question {
    id: number;
    text: string;
    type: string;
    options?: string[];
    required?: boolean;
}

interface StaticFormProps {
    initialQuestions: Question[];
}

const StaticForm: React.FC = () => {
    const question = [
        {
            "id": 1,
            "text": "What is your favorite color?",
            "type": "SHORT_ANSWER"
        },
        {
            "id": 2,
            "text": "Describe your first memory.",
            "type": "PARAGRAPH"
        },
        {
            "id": 3,
            "text": "Which of the following fruits do you like? (Select all that apply)",
            "type": "CHECKBOXES",
            "options": [
                "Apples",
                "Oranges",
                "Bananas",
                "Pears",
                "Grapes"
            ]
        },
        {
            "id": 4,
            "text": "What is your preferred mode of transportation?",
            "type": "DROPDOWN",
            "options": [
                "Car",
                "Bus",
                "Train",
                "Plane",
                "Boat"
            ]
        },
        {
            "id": 5,
            "text": "Do you enjoy coding?",
            "type": "MULTIPLE_CHOICE",
            "options": [
                "Yes",
                "No",
                "Maybe"
            ]
        },
        {
            "id": 6,
            "text": "What is your preferred mode of transportation?",
            "type": "DROPDOWN",
            "options": [
                "Car",
                "Bus",
                "Train",
                "Plane",
                "Boat"
            ]
        },
    ]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //print out all data submitted data in json
        const data = new FormData(event.currentTarget);
        const entries = [...data.entries()];
        const jsonData = Object.fromEntries(entries);
        console.log(jsonData);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="border border-black p-4 my-2 grid">
                    {question.map((question, index) => (
                        <Section key={index} question={question as Question} />
                    ))}

                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default StaticForm;