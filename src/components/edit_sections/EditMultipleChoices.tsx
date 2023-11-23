import React from 'react';
import type { Question } from '~/types/question';
import EditSectionDropdown from './EditSectionDropdown';

interface EditMultipleChoiceProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
    handleQuestionTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addOption: () => void;
    handleRemoveOption: (index: number) => void;
}

const EditMultipleChoice: React.FC<EditMultipleChoiceProps> = ({ question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange, addOption, handleRemoveOption }) => {
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
};

export default EditMultipleChoice;
