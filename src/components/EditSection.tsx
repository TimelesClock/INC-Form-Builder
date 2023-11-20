import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import type { Question, Option } from './StaticForm';

import useStore from '~/store/useFormStore';
import { createId } from '@paralleldrive/cuid2'
import EditSectionDropdown from './EditSectionDropdown';

interface SectionProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
}

const EditSection: React.FC<SectionProps> = ({ question, answer, editMode, focused }) => {
    //prob not the best coding practice
    let content = null
    const [questions, setQuestions] = useStore((state) => [state.questions, state.setQuestions])
    
    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            let newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's type
                questionToUpdate.type = event.target.value;
                //Remove the content of the question unless its changing from CHECKBOXES, MULTIPLE_CHOICE, or DROPDOWN and to one of those
                let specialCase = ["CHECKBOXES", "MULTIPLE_CHOICE", "DROPDOWN"]
                if (!specialCase.includes(event.target.value) && specialCase.includes(questionToUpdate.type)) {
                    questionToUpdate.options = []
                }

                // Update the questions array
                setQuestions(newQuestions);
            }
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            let newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's text
                questionToUpdate.text = event.target.value;

                // Update the questions array
                setQuestions(newQuestions);
            }
        }
    }

    const addOption = () => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            let newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's text
                questionToUpdate.options?.push({ content: "New Option", id: createId() });

                // Update the questions array
                setQuestions(newQuestions);
            }
        }
    }

    const handleRemoveOption = (index: number) => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            let newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's text
                questionToUpdate.options?.splice(index, 1);

                // Update the questions array
                setQuestions(newQuestions);
            }
        }
    }



    if (question.type === "SHORT_ANSWER") {

        return (
            <div>
                <div className="flex flex-row justify-between my-2">
                    <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                    {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
                </div>

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
                <div className="flex flex-row justify-between my-2">
                    <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                    {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
                </div>
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
                <div className="flex flex-row justify-between my-2">
                    <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                    {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
                </div>                <legend className="sr-only">{question.text}</legend>
                <div className="space-y-5">
                    {question.options?.map((option, index) => {
                        let props
                        if (editMode) {
                            props = { disabled: editMode }
                        } else {
                            props = { defaultChecked: answer === option.content }
                        }
                        return (
                            <div key={option.id} className="relative flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id={option.id}
                                        aria-describedby={option.id}
                                        name={question.id.toString()}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        value={option.content}
                                        {...props}
                                    />
                                    <div className="ml-3 text-sm leading-6">
                                        <label htmlFor={option.id} className="font-medium text-gray-900">
                                            <input className="block text-sm font-medium leading-6 text-gray-900 border-none w-full" type="text" defaultValue={option.content} />
                                        </label>
                                    </div>
                                </div>
                                {focused &&
                                    <svg onClick={() => handleRemoveOption(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer hover:bg-slate-100  rounded-3xl ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>}
                            </div>
                        )
                    })}

                    {focused && (question?.options?.length !== 1) && (
                        <div className="relative flex items-start" style={{ opacity: '0.5' }} >
                            <div className="flex h-6 items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    disabled={true}
                                />
                            </div>
                            <div className="ml-6 text-sm leading-6" onClick={addOption}>
                                <label className="font-medium text-gray-900">
                                    Add option
                                </label>
                            </div>
                        </div>
                    )}

                </div>
            </fieldset>
        )
    } else if (question.type == "DROPDOWN") {

        return (
            <div className="">
                <div className="flex flex-row justify-between my-2">
                    <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                    {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
                </div>
                <div className="space-y-5">
                    {question.options?.map((option, index) => {
                        let props
                        if (editMode) {
                            props = { disabled: editMode }
                        } else {
                            props = { defaultChecked: answer === option.content }
                        }
                        return (
                            <div key={option.id} className="relative flex items-center justify-between">
                                <div className="flex items-center">
                                    <div id={option.id}>
                                        {index + 1}.
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                        <label htmlFor={option.id} className="font-medium text-gray-900">
                                            <input className="block text-sm font-medium leading-6 text-gray-900 border-none w-full" type="text" defaultValue={option.content} />
                                        </label>
                                    </div>
                                </div>
                                {focused &&
                                    <svg onClick={() => handleRemoveOption(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer hover:bg-slate-100  rounded-3xl ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>}
                            </div>
                        )
                    })}

                    {focused && (question?.options?.length !== 1) && (
                        <div className="relative flex items-start" style={{ opacity: '0.5' }} >
                            <div className="flex h-6 items-center">

                            </div>
                            <div className="ml-8 text-sm leading-6" onClick={addOption}>
                                <label className="font-medium text-gray-900">
                                    Add option
                                </label>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        )
    } else if (question.type == "MULTIPLE_CHOICE") {
        return (
            <fieldset>
                <div className="flex flex-row justify-between my-2">
                    <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                    {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
                </div>
                <legend className="sr-only">{question.text}</legend>
                <div className="mt-5 space-y-5">
                    {question.options?.map((option, index) => {
                        //show defaultChecked attribute if editMode isnt true
                        let props
                        if (editMode) {
                            props = { disabled: editMode }
                        } else {
                            props = { defaultChecked: answer === option.content }
                        }
                        return (
                            <div key={option.id} className="relative flex items-start justify-between">
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
                                    <div className="ml-6 text-sm leading-6">
                                        <label htmlFor={option.id} className="font-medium text-gray-900">
                                            <input className="block text-sm font-medium leading-6 text-gray-900 border-none w-full" type="text" defaultValue={option.content} />
                                        </label>
                                    </div>
                                </div>

                                {focused &&
                                    <svg onClick={() => handleRemoveOption(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-6 h-6 cursor-pointer hover:bg-slate-100  rounded-3xl ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>}
                            </div>
                        )
                    })}
                    {focused && (question?.options?.length !== 1) && (
                        <div className="relative flex items-start" style={{ opacity: '0.5' }} >
                            <div className="flex h-6 items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    disabled={true}
                                />
                            </div>
                            <div className="ml-9 text-sm leading-6" onClick={addOption}>
                                <label className="font-medium text-gray-900">
                                    Add option
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </fieldset>
        )
    }

}


export default EditSection