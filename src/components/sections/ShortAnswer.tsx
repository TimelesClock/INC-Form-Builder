import React from 'react';
import type { Question } from '~/types/question';

interface ShortAnswerProps {
    question: Question;
    answer?: string;
    editMode?: boolean;
}

const ShortAnswer: React.FC<ShortAnswerProps> = ({ question, answer, editMode }) => {
    return (
        <div>
            <label htmlFor={question.id.toString()} className="block text-sm font-medium leading-6 text-gray-900">
                {question.text}
            </label>
            <div className="mt-2">
                <input type="text"
                       name={question.id.toString()}
                       id={question.id.toString()}
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       required={question.required}
                       disabled={editMode}
                       defaultValue={answer ?? ""}
                />
            </div>
        </div>
    );
};

export default ShortAnswer;
