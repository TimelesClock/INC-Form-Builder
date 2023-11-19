import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Section from './Section';
import type { JsonArray, JsonObject } from '@prisma/client/runtime/library';

import { createId } from '@paralleldrive/cuid2'

import { api } from '~/utils/api';

import { useRouter } from 'next/router';


export interface Question {
    id: string;
    text: string;
    type: string;
    options?: Option[];
    required?: boolean;
}

export interface Option {
    id: string;
    content: string;
}

export interface Answer {
    id: string;
    content: string | string[];
}

interface StaticFormProps {
    questions: Question[];
    answers?: Answer[];
}

const StaticForm: React.FC<StaticFormProps> = ({ questions, answers }) => {

    const router = useRouter()

    const { mutate: addAnswer } = api.answer.addAnswer.useMutation();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Initialize an object to hold the parsed form data
        let jsonData: JsonObject = {};

        // Process each form element
        for (let element of event.currentTarget.elements) {
            const input = element as HTMLInputElement;

            if (input.nodeName !== "INPUT" && input.nodeName !== "TEXTAREA" && input.nodeName !== "SELECT" ) {
                continue;
            }
            // Check if the element is a checkbox
            if (input.type === "checkbox") {
                if (!jsonData[input.name]) {
                    jsonData[input.name] = [] as JsonArray;
                }
                if (input.checked) {
                    let valueArr = jsonData[input.name] as JsonArray;
                    valueArr.push(input.value);
                    jsonData[input.name] = valueArr;
                }
            }
            // Check if the element is a radio button
            else if (input.type === "radio") {
                if (input.checked) {
                    jsonData[input.name] = input.value;
                }
            }
            // Handle other input types
            else {
                jsonData[input.name] = input.value;
            }
        }

        // Format the jsonData into {id:string, content:string | string[]}[]
        let answers = [];
        for (let key in jsonData) {
            answers.push({ id: key, content: jsonData[key] as string[] | string});
        }

        // Add the answers to the database
        let formId = router.query.formId as string;

        addAnswer({ id: formId, answer: answers }, {
            onSuccess: () => {
                console.log("success");
            }
        });
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="border border-black p-4 my-2 grid">
                    {questions.map((question, index) => {
                        let answer = answers?.find((answer) => answer.id === question.id);
                        let content 
                        if (answer && answer.content) {
                            content = answer.content
                        }

                        return (
                            <Section key={index} question={question as Question} answer={content} />
                        )
                    })}

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