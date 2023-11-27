import React from 'react';
import type { Question } from '~/types/question';
import EditSectionDropdown from './EditSectionDropdown';

interface EditDropdownProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
    handleQuestionTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addOption: () => void;
    handleRemoveOption: (index: number) => void;
}

const EditDropdown: React.FC<EditDropdownProps> = ({ question, focused, handleQuestionTypeChange, handleTitleChange, addOption, handleRemoveOption }) => {
    return (
        <div className="">
            <div className="flex flex-row justify-between my-2">
                <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                {focused&&<EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
            </div>
            <div className="space-y-5">
                {question.options?.map((option, index) => {
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
                            {focused && question?.options?.length !== 1 &&
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
};

export default EditDropdown;
