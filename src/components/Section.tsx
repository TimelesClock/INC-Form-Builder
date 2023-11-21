import React, { useState, Fragment, useEffect } from 'react';
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
    const [checked, setChecked] = useState(false)


    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //loop through question.options, check if any of them are checked
        //if they are, set checked to true
        let flag = false
        let options = document.getElementById(question.id.toString())?.getElementsByTagName("input")
        if (!options) {
            return
        }
        for (let option of options) {
            if (option.checked) {
                flag = true
                break
            }
        }
        console.log(flag)
        setChecked(flag)
    }

    const checkbox: HTMLInputElement = document.getElementById("checkbox" + question.id.toString()) as HTMLInputElement

    checkbox?.addEventListener("invalid", function (event) {
        checkbox.setCustomValidity("Please select at least one checkbox")
    })

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
                        required={question.required}
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
                        required={question.required}
                    />
                </div>
            </div>
        )
    } else if (question.type == "CHECKBOXES") {
        return (
            <fieldset>
                <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">{question.text}</label>
                <legend className="sr-only">{question.text}</legend>
                <div className="relative space-y-5" id={question.id}>
                    <input key={checked as unknown as React.Key} id={"checkbox" + question.id.toString()} name={"checkbox" + question.id.toString()} type="checkbox" checked={!question.required && checked} onChange={()=>{}} className="opacity-0 absolute left-24 top-0" required={question.required && !checked} />
                    {question.options?.map((option, index) => {
                        let props
                        if (editMode) {
                            props = {
                                disabled: editMode,
                                checked: answer?.includes(option.content) || false,
                            }
                        } else {
                            props = {
                                defaultChecked: answer?.includes(option.content) || false,
                            }
                        }
                        useEffect(() => {
                            if (answer?.includes(option.content)) {
                                setChecked(true)
                            }
                        }
                            , [answer])
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
                                        onChange={handleCheckBoxChange}
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
        let props
        if (editMode) {
            props = {
                disabled: editMode,
                value: answer || "",
                onChange: () => { }
            }
        } else {
            props = {
                defaultValue: answer || "",
            }
        }

        return (
            <div className="w-1/3">
                <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                    {question.text}
                </label>
                <select
                    id={question.id.toString()}
                    name={question.id.toString()}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-md"
                    required={question.required}
                    {...props}
                >
                    <option value="" disabled>Select an option</option>
                    {question.options?.map((option, index) => {


                        return (
                            <option key={option.id} disabled={editMode} value={option.content}>{option.content}</option>
                        )
                    })}
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
                            props = {
                                disabled: editMode,
                                checked: answer === option.content,
                                onChange: () => { }
                            }
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
                                        required={question.required}
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
    }else if (question.type === "FILE_UPLOAD") {
        return (
            <div>
                <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900">
                    {question.text}
                </label>
                <div className="mt-2">
                    <input
                        type="file"
                        name={question.id.toString()}
                        id={question.id.toString()}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        defaultValue={answer || ""}
                        disabled={editMode}
                        required={question.required}
                    />
                </div>
            </div>
        )
    }

}


export default Section