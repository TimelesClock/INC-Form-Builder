// pages/forms/[formId].tsx
import { useEffect, useState } from "react"
import { set, useForm } from "react-hook-form"
import { useRouter } from 'next/router';
import { api } from "~/utils/api"
import toast from "react-hot-toast";

import DraggableQuestions from '../../components/DraggableQuestions';
import useStore from "~/store/useFormStore"

import type { Question } from '~/components/StaticForm';
import InviteModal from "~/components/InviteModal";

const FormPage = () => {
    const router = useRouter()

    const [questions, setQuestions] = useStore((state) => [state.questions, state.setQuestions])
    
    const [open , setOpen] = useState(false)

    const { data: form } = api.form.getForm.useQuery({ id: router.query.formId as string }, { enabled: !!router.query.formId });
    const { mutate: updateQuestions } = api.form.updateQuestions.useMutation();
    const { mutate: updateForm } = api.form.updateForm.useMutation()
    const { mutate: createTemplate } = api.template.createTemplate.useMutation()


    const handleClick = () => {
        updateQuestions({ id: router.query.formId as string, questions: questions as Question[] }, {
            onSuccess: () => {
                let title = document.getElementById("title") as HTMLInputElement
                let description = document.getElementById("description") as HTMLInputElement
                updateForm({
                    id: router.query.formId as string,
                    name: title.value,
                    description: description.value as string
                }, {
                    onSuccess: () => {
                        toast.success("Form saved!")
                        router.push("/")
                    }
                })
            }
        })
    }

    const handleCreateTemplate = () => {
        createTemplate({
            name: form?.title as string,
            description: form?.description as string,
            content: questions as Question[]
        }, {
            onSuccess: () => {
                toast.success("Template created!")
            }
        })
    }

    useEffect(() => {
        if (form) {
            setQuestions(form.question as unknown as Question[])
        }
    }, [form])

    return (
        <>
            <button onClick={() => { router.push("/") }} className="bg-blue-500 text-white p-2 rounded">Back</button>
            <InviteModal open={open} setOpen={setOpen} />
            <nav className="flex justify-center space-x-5 p-4 bg-gray-200">

                <div>
                    <button onClick={handleCreateTemplate} className="bg-green-500 text-white p-2 rounded">Create Template</button>
                </div>
                <div>
                    <button onClick={() => { router.push("/responses/" + form?.id) }} className="bg-blue-500 text-white p-2 rounded">Responses</button>
                </div>
                <div>
                    <button onClick={()=>{setOpen(true)}} className="bg-blue-500 text-white p-2 rounded">Invite people</button>
                </div>
            </nav>
            <div className="container p-4 ">
                <div className="bg-white px-6 py-12 sm:py-16 lg:px-8 flex justify-center">
                    <div className="justify-center align-center flex flex-col max-w-2xl text-center">
                        <input id="title" name="title" type="text" defaultValue={form?.title} className="mt-2 text-2xl font-bold tracking-tight text-center border-none text-gray-900 sm:text-6xl" />
                        <input id="description" name="description" type="text" defaultValue={form?.description as string} className="mt-6 text-lg text-center border-none leading-8 text-gray-600" />
                    </div>
                </div>
                <DraggableQuestions />
                <button
                    onClick={handleClick}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default FormPage;
