import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import type { Question, Option } from './StaticForm';




interface SectionProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
}

const Section: React.FC<SectionProps> = ({ question, answer, editMode }) => {
    //prob not the best coding practice
    let content = null
    


    if (question.type === "SHORT_ANSWER") {
        return (
            <div>
                <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900">
                    {question.text}
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name={question.id.toString()}
                        id={question.id.toString()}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        defaultValue={answer || ""}
                        disabled={editMode}
                    />
                </div>
            </div>
        )
    } else if (question.type === "PARAGRAPH") {
        return (
            <div>
                <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900">
                    {question.text}
                </label>
                <div className="mt-2">
                    <textarea
                        rows={4}
                        name={question.id.toString()}
                        id={question.id.toString()}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={answer || ""}
                        disabled={editMode}
                    />
                </div>
            </div>
        )
    } else if (question.type == "CHECKBOXES") {
        return (
            <fieldset>
                <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">{question.text}</label>
                <legend className="sr-only">{question.text}</legend>
                <div className="space-y-5">
                    {question.options?.map((option, index) => {
                        let props
                        if (editMode) {
                            props = { disabled: editMode }
                        } else {
                            props = {}
                        }
                        return (
                            <div key={option.id} className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                    <input
                                        id={option.id}
                                        aria-describedby={option.id}
                                        name={question.id.toString()}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value={option.content}
                                        defaultChecked={answer?.includes(option.content) || false}
                                        {...props}
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <label htmlFor={option.id} className="font-medium text-gray-900">
                                        {option.content}
                                    </label>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </fieldset>
        )
    } else if (question.type == "DROPDOWN") {

        return (
            <div className="w-1/3">
                <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                    {question.text}
                </label>
                <select
                    id={question.id.toString()}
                    name={question.id.toString()}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-md"
                    defaultValue={answer || ""}
                    disabled={editMode}
                >
                    <option disabled>Select an option</option>
                    {question.options?.map((option, index) => (
                        <option key={option.id} disabled={editMode}>{option.content}</option>
                    ))}
                </select>
            </div>
        )
    } else if (question.type == "MULTIPLE_CHOICE") {
        return (
            <fieldset>
                <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">{question.text}</label>
                <legend className="sr-only">{question.text}</legend>
                <div className="space-y-5">
                    {question.options?.map((option, index) => {
                        //show defaultChecked attribute if editMode isnt true
                        let props
                        if (editMode) {
                            props = { disabled: editMode }
                        } else {
                            props = { defaultChecked: answer === option.content }
                        }
                        return (
                            <div key={option.id} className="relative flex items-start">
                                <div className="flex h-6 items-center">
                                    <input
                                        id={option.id}
                                        aria-describedby={option.id}
                                        name={question.id.toString()}
                                        type="radio"
                                        value={option.content}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        {...props}
                                    />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                    <label htmlFor={option.id} className="font-medium text-gray-900">
                                        {option.content}
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </fieldset>
        )
    }

}


export default Section