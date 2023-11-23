import React from 'react';
import type { Question } from '~/types/question';

interface MultipleChoiceProps {
    question: Question;
    answer?: string;
    editMode?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ question, answer, editMode }) => {
    return (
        <fieldset>
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">{question.text}</label>
            <legend className="sr-only">{question.text}</legend>
            <div className="space-y-5">
                {question.options?.map((option) => {
                    //show defaultChecked attribute if editMode isnt true
                    let props
                    if (editMode) {
                        props = {
                            disabled: editMode,
                            checked: answer === option.content,
                            onChange: () => {
                                //placeholder
                            }
                        }
                    } else {
                        props = { defaultChecked: answer === option.content }
                    }
                    return (
                        <div key={option.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input id={option.id}
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
                    );
                })}
            </div>
        </fieldset>
    );
};

export default MultipleChoice;
