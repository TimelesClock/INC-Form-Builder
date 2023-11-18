import React, { useState, Fragment } from 'react';
import type { Question } from './StaticForm';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


interface SectionProps {
    question: Question;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Section: React.FC<SectionProps> = ({ question }) => {

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
                        defaultValue={''}
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
                    {question.options?.map((option) => (
                        <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id={question.id.toString()}
                                    aria-describedby="comments-description"
                                    name={question.id.toString()}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor={question.id.toString()} className="font-medium text-gray-900">
                                    {option}
                                </label>
                            </div>
                        </div>
                    ))}

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
                    defaultValue="Select an option"
                >
                    <option disabled>Select an option</option>
                    {question.options?.map((option) => (
                        <option key={option}>{option}</option>
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
                    {question.options?.map((option) => (
                        <div key={option} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id={question.id.toString()}
                                    aria-describedby={`${option}-description`}
                                    name={question.id.toString()}
                                    type="radio"
                                    defaultChecked={option === 'small'}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor={option} className="font-medium text-gray-900">
                                    {option}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        )
    }

}


export default Section