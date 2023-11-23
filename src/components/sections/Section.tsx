import React from 'react';
import Checkbox from './Checkbox';
import Dropdown from './Dropdown';
import FileUpload from './FileUpload';
import MultipleChoice from './MultipleChoice';
import Paragraph from './Paragraph';
import ShortAnswer from './ShortAnswer';
import type { Question } from '../StaticForm';

interface SectionProps {
    question: Question;
    answer?: string | string[];
    editMode?: boolean;
}

const Section: React.FC<SectionProps> = ({ question, answer, editMode }) => {
    switch (question.type) {
        case "SHORT_ANSWER":
            return <ShortAnswer question={question} answer={answer as string} editMode={editMode} />;
        case "PARAGRAPH":
            return <Paragraph question={question} answer={answer as string} editMode={editMode} />;
        case "CHECKBOXES":
            return <Checkbox question={question} answer={answer as string[]} editMode={editMode} />;
        case "DROPDOWN":
            return <Dropdown question={question} answer={answer as string} editMode={editMode} />;
        case "MULTIPLE_CHOICE":
            return <MultipleChoice question={question} answer={answer as string} editMode={editMode} />;
        case "FILE_UPLOAD":
            return <FileUpload question={question} answer={answer as string} editMode={editMode} />;
        default:
            return <div>Unsupported question type</div>;
    }
};

export default Section;
