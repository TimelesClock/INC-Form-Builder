// pages/forms/[formId].tsx
import DraggableQuestions from '../../components/DraggableQuestions';

import { useForm } from "react-hook-form"
import * as z from "zod"


const FormPage = () => {
    // Replace with actual data fetching logic
    const formQuestions = [
        {
            "id": 1,
            "text": "What is your favorite color?",
            "type": "SHORT_ANSWER"
        },
        {
            "id": 2,
            "text": "Describe your first memory.",
            "type": "PARAGRAPH"
        },
        {
            "id": 3,
            "text": "Which of the following fruits do you like? (Select all that apply)",
            "type": "CHECKBOXES",
            "options": [
                "Apples",
                "Oranges",
                "Bananas",
                "Pears",
                "Grapes"
            ]
        },
        {
            "id": 4,
            "text": "What is your preferred mode of transportation?",
            "type": "DROPDOWN",
            "options": [
                "Car",
                "Bus",
                "Train",
                "Plane",
                "Boat"
            ]
        },
        {
            "id": 5,
            "text": "Do you enjoy coding?",
            "type": "MULTIPLE_CHOICE",
            "options": [
                "Yes",
                "No",
                "Maybe"
            ]
        }
    ]


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Form Questions</h1>
            <DraggableQuestions initialQuestions={formQuestions} />

        </div>
    );
};

export default FormPage;
