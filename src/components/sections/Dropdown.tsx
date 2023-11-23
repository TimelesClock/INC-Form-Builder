import React from 'react';
import type { Question } from '~/types/question'

interface DropdownProps {
    question: Question;
    answer?: string;
    editMode?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ question, answer, editMode }) => {
    let props
    if (editMode) {
        props = {
            required: false,
            disabled: true,
            value: answer,
            onChange: () => {
                //placeholder
            }
        }
    }else{
        props = {
            required: question.required,
            disabled: editMode,
            defaultValue: answer
        }
    }
    return (
        <div className="w-1/3">
            <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                {question.text}
            </label>
            <select id={question.id.toString()}
                    name={question.id.toString()}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm rounded-md"
                    {...props}
            >
                <option value="" disabled>Select an option</option>
                {question.options?.map((option) => {
                    return (
                        <option key={option.id} value={option.content}>
                            {option.content}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Dropdown;
