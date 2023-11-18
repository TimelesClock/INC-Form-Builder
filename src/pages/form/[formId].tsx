// pages/forms/[formId].tsx
import DraggableQuestions from '../../components/DraggableQuestions';

import { useForm } from "react-hook-form"
import * as z from "zod"

import StaticForm from '~/components/StaticForm';

interface QuestionProps {
    type: string;
    text: string;
    required?: boolean;
    options?: string[];
}

const FormPage = () => {
    // Replace with actual data fetching logic


    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Form Questions</h1>
                <StaticForm />

            </div>

        </>
    );
};

export default FormPage;
