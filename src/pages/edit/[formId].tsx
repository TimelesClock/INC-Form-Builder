// pages/forms/[formId].tsx
import { useEffect } from "react"
import { set, useForm } from "react-hook-form"
import { useRouter } from 'next/router';
import { api } from "~/utils/api"
import * as z from "zod"

import DraggableQuestions from '../../components/DraggableQuestions';
import useStore from "~/store/useFormStore"

import type { Question } from '~/components/StaticForm';

const FormPage = () => {
    const router = useRouter()

    const [questions, setQuestions] = useStore((state) => [state.questions, state.setQuestions])

    const { data: form } = api.form.getForm.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });
    const { mutate: updateForm } = api.form.updateQuestions.useMutation();


    const handleClick = () => {
        updateForm({ id: router.query.formId as string, questions: questions as Question[] }, {
            onSuccess: () => {
                router.push(`/`)
            }
        })
    }

    useEffect(() => {
        if (form) {
            setQuestions(form.question as unknown as Question[])
        }
    }, [form])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Form Questions</h1>
            <DraggableQuestions />
            <button
                onClick={handleClick}
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        </div>
    );
};

export default FormPage;
