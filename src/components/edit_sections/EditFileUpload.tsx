import React from 'react';
import type { Question } from '~/types/question';
import EditSectionDropdown from './EditSectionDropdown';

interface EditFileUploadProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
    handleQuestionTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



const EditFileUpload: React.FC<EditFileUploadProps> = ({ question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange }) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        //if answer is not a s3 link return
        if (answer && !answer.includes("s3")) {
            return
        }
        

        window.open(answer as string, "_blank");
    }


    return (
        <div className="my-5">
            <div className="flex flex-row justify-between my-2">
                <input type="text" onChange={handleTitleChange} defaultValue={question.text} className=" block w-1/2 text-sm font-medium leading-6 text-gray-900 border-none" />
                {focused && <EditSectionDropdown type={question.type} handleChange={handleQuestionTypeChange} />}
            </div>
            <div className="mt-2">
                <input
                    type="file"
                    name={question.id.toString()}
                    id={question.id.toString()}
                    className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
                    required={!answer && question.required}
                    disabled={editMode}
                />
                {answer && answer.includes("s3") && (
                    <div className="mt-5 space-y-5">
                        <div className="mb-3">Current uploaded file</div>
                        <button
                            onClick={handleClick}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {
                                decodeURIComponent(answer as string).split('/').pop()

                            }
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditFileUpload;
