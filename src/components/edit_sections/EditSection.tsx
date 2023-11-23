import React from 'react';


import type { Question } from '~/types/question';;

import useStore from '~/store/useFormStore';
import { createId } from '@paralleldrive/cuid2'

import EditShortAnswer from './EditShortAnswer';
import EditParagraph from './EditParagraph';
import EditCheckboxes from './EditCheckboxes';
import EditDropdown from './EditDropdown';
import EditMultipleChoice from './EditMultipleChoices';
import EditFileUpload from './EditFileUpload';

interface SectionProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
    focused?: boolean;
}

const EditSection: React.FC<SectionProps> = ({ question, answer, editMode, focused }) => {
    //prob not the best coding practice
    const [questions, setQuestions] = useStore((state) => [state.questions, state.setQuestions])
    
    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            const newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's type
                questionToUpdate.type = event.target.value;
                //Remove the content of the question unless its changing from CHECKBOXES, MULTIPLE_CHOICE, or DROPDOWN and to one of those
                const specialCase = ["CHECKBOXES", "MULTIPLE_CHOICE", "DROPDOWN"]
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
            const newQuestions = [...questions];

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
            const newQuestions = [...questions];

            // Check if the question object exists at the found index
            const questionToUpdate = newQuestions[questionIndex];
            if (questionToUpdate) {
                // Update the question's text
                questionToUpdate.options?.push({ content: "New Option", id: createId() });

                // Update the questions array
                setQuestions(newQuestions);
            }
        }else{
            //add new option
            const newOption = { content: "New Option", id: createId() }
            const newQuestion = {...question, options: [newOption]}
            setQuestions([...questions, newQuestion])
        }
    }

    const handleRemoveOption = (index: number) => {
        const questionIndex = questions.findIndex((q) => q.id === question.id);

        if (questionIndex >= 0) { // Ensure the index is found
            // Make a copy of the questions array
            const newQuestions = [...questions];

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



    switch (question.type) {
        case "SHORT_ANSWER":
            return <EditShortAnswer {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange}} />;
        case "PARAGRAPH":
            return <EditParagraph {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange}} />;
        case "CHECKBOXES":
            return <EditCheckboxes {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange, addOption, handleRemoveOption}} />;
        case "DROPDOWN":
            return <EditDropdown {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange, addOption, handleRemoveOption}} />;
        case "MULTIPLE_CHOICE":
            return <EditMultipleChoice {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange, addOption, handleRemoveOption}} />;
        case "FILE_UPLOAD":
            return <EditFileUpload {...{question, answer, editMode, focused, handleQuestionTypeChange, handleTitleChange}} />;
        default:
            return <div>Unsupported question type</div>;
    }

}


export default EditSection