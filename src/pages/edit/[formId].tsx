// pages/forms/[formId].tsx
import DraggableQuestions from '../../components/DraggableQuestions';
import { useEffect } from "react"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import useStore from "~/store/useFormStore"

const FormPage = () => {
    // Replace with actual data fetching logic
    const formQuestions = [{ "id": "1", "text": "What is your favorite color?", "type": "SHORT_ANSWER" }, { "id": "2", "text": "Describe your first memory.", "type": "PARAGRAPH" }, { "id": "3", "options": [{ "content": "Apples", "id": "SC4vm5iUUWRqSkbt" }, { "content": "Oranges", "id": "RzMnpwyYX4B8b7R5" }, { "content": "Bananas", "id": "bX2nWPPkpVusUMrq" }, { "content": "Pears", "id": "PQxLP0MrOXvjvcl2" }, { "content": "Grapes", "id": "m8PrzaueiP3jUnjl" }], "text": "Which of the following fruits do you like? (Select all that apply)", "type": "CHECKBOXES" }, { "id": "4", "options": [{ "content": "Car", "id": "kJGRjGjPC7vNF8eX" }, { "content": "Bus", "id": "hRboui1raA9JIkbk" }, { "content": "Train", "id": "2IyYhJfiGr9ZHeoA" }, { "content": "Plane", "id": "uPnUiR2ZqlQdJewR" }, { "content": "Boat", "id": "NpYVjMuDCOM0k4k9" }], "text": "What is your preferred mode of transportation?", "type": "DROPDOWN" }, { "id": "5", "options": [{ "content": "Yes", "id": "ATg3LX0wfpQY4FSQ" }, { "content": "No", "id": "EeEiIaL3FyyhZ9Id" }, { "content": "Maybe", "id": "Sia3t99HOMqSdjcQ" }], "text": "Do you enjoy coding?", "type": "MULTIPLE_CHOICE" }, { "id": "6", "options": [{ "content": "Car", "id": "l9ipxPP5j8hD4OF6" }, { "content": "Bus", "id": "Usx7kYQFNB9TvXpP" }, { "content": "Train", "id": "j8yEcXY25WkJuXEQ" }, { "content": "Plane", "id": "YeUkt7j6m20Dtlcp" }, { "content": "Boat", "id": "EqEJjzInaWUP9AsA" }], "text": "What is your preferred mode of transportation?", "type": "DROPDOWN" }]
    
    const [questions, setQuestions] = useStore((state) => [state.questions, state.setQuestions])
    
    useEffect(() => {
        setQuestions(formQuestions)
    }, [])

    useEffect(() => {
        console.log(questions)
    }, [questions])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Form Questions</h1>
            <DraggableQuestions />

        </div>
    );
};

export default FormPage;
