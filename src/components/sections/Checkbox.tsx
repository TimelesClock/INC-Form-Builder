import React, { useEffect, useState } from 'react';
import type { Question } from '~/types/question';

interface CheckboxProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ question, answer, editMode }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckBoxChange = () => {
        //loop through question.options, check if any of them are checked
        //if they are, set checked to true
        let flag = false
        const options = document.getElementById(question.id.toString())?.getElementsByTagName("input")
        if (!options) {
            return
        }
        for (const option of options) {
            if (option.checked) {
                flag = true
                break
            }
        }
        setChecked(flag)
    }

    useEffect(() => {
        if (answer?.length && answer?.length>0) {
            setChecked(true)
        }
    }, [answer?.length])

    return (
        <fieldset>
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-5">{question.text}</label>
            <legend className="sr-only">{question.text}</legend>
            <div className="relative space-y-5" id={question.id.toString()}>
                <input key={checked as unknown as React.Key} id={"checkbox" + question.id.toString()} name={"checkbox" + question.id.toString()} type="checkbox" checked={!question.required && checked} onChange={() => {
                    //placeholder
                }} className="opacity-0 absolute left-24 top-0" required={question.required && !checked} />
                {question.options?.map((option) => {
                    let props
                    if (editMode) {
                        props = {
                            disabled: editMode,
                            checked: answer?.includes(option.content) ?? false,
                        }
                    } else {
                        props = {
                            defaultChecked: answer?.includes(option.content) ?? false,
                        }
                    }
                    return (
                        <div key={option.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input id={option.id}
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
                    );
                })}
            </div>
        </fieldset>
    );
};

export default Checkbox;
