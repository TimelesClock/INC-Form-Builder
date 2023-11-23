import React from 'react';
import type { Question } from '~/types/question';
import EditSectionDropdown from './EditSectionDropdown';

interface EditShortAnswerProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
    handleQuestionTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditShortAnswer: React.FC<EditShortAnswerProps> = ({ question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange }) => {
    return (
        <div>
            <div className="flex flex-row justify-between my-2">
                <input type="text" onChange={handleTitleChange} defaultValue={question.text} className="block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                {focused && <EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
            </div>
            <div className="mt-2">
                <input
                    type="text"
                    name={question.id.toString()}
                    id={question.id.toString()}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder=""
                    defaultValue={answer ?? ""}
                    disabled={editMode}
                />
            </div>
        </div>
    );
};

export default EditShortAnswer;
